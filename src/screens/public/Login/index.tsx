import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Image, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Headline, Text } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RHFTextInput } from "../../../components/RHF";
import { options } from "./inputOptions";
import { generateRules } from "../../../utils/rulesGeneration";
import { loginInputRules } from "./loginRules";
import { useAuth } from "../../../contexts/AuthContext";

type StackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  TodoList: undefined;
};

type Props = NativeStackScreenProps<StackParamList>;

export type LoginInputNames = "email" | "password";

type FormInputType = Partial<Record<LoginInputNames, string>>;

const INPUT_NAMES: Readonly<LoginInputNames[]> = ["email", "password"];

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
  loginButton: {
    marginTop: 10,
    padding: 8,
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
  const { isLoading, signInHandler } = useAuth();

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

  const logInHandler: SubmitHandler<FormInputType> = ({ email, password }) =>
    signInHandler(email, password);

  const rules = generateRules(Object.keys(defaultValues), loginInputRules);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FormProvider {...methods}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/favicon.png")}
              style={styles.logoImage}
            />
            <Headline>Recall</Headline>
          </View>

          <View>
            {INPUT_NAMES.map((inputName: LoginInputNames) => (
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
      )}
    </View>
  );
};

export default Login;
