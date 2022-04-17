import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeRules } from "../../../constants/validationRules";
import { RHFTextInput } from "../../../components/RHF";
import { options } from "./inputOptions";

type StackParamList = {
  Register: undefined;
  ForgotPassword: undefined;
};

type Props = NativeStackScreenProps<StackParamList>;

type FormInputType = Record<"email" | "password", string>;

const INPUT_NAMES: Readonly<string[]> = ["email", "password"];

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  title: {
    fontSize: 30,
  },
  loginButton: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#ff6e69",
  },
  registerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  forgotPasswordButton: {
    alignSelf: "center",
  },
});

const Login: React.FC<Props> = ({ navigation }) => {
  const defaultValues: FormInputType = {
    email: "",
    password: "",
  };

  const methods = useForm<FormInputType>({
    defaultValues,
    mode: "onSubmit",
  });

  const {
    formState: { errors },
  } = methods;

  const logInHandler: SubmitHandler<FormInputType> = (data) =>
    console.log(data);

  const rules = makeRules(Object.keys(defaultValues));

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/favicon.png")}
            style={styles.logoImage}
          />
          <Text style={styles.title}>Recall</Text>
        </View>

        <View>
          {INPUT_NAMES.map((inputName) => (
            <RHFTextInput
              key={inputName}
              inputName={inputName}
              inputError={errors[inputName]}
              rules={rules[inputName]}
              {...options[inputName]}
            />
          ))}
        </View>

        <Button
          style={styles.loginButton}
          uppercase={false}
          mode="contained"
          onPress={methods.handleSubmit(logInHandler)}
        >
          Login
        </Button>

        <View style={styles.registerContainer}>
          <Text>New to Recall?</Text>
          <Button
            uppercase={false}
            compact
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>

        <Button
          style={styles.forgotPasswordButton}
          uppercase={false}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot password?
        </Button>
      </FormProvider>
    </View>
  );
};

export default Login;
