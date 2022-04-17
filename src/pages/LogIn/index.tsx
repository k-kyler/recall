import { makeRules } from "../../constants/validationRules";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View, Image, StyleSheet } from "react-native";
import { RHFTextInput } from "../../RHF";
import { options } from "./inputOptions";
import { Button } from "react-native-paper";

type FormInputType = Record<"email" | "password", string>;

const INPUT_NAMES: Readonly<string[]> = ["email", "password"];

const styles = StyleSheet.create({
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
  button: {
    marginTop: 10,
  },
});

const LogIn = () => {
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
    <View>
      <FormProvider {...methods}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/favicon.png")}
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
          style={styles.button}
          uppercase={false}
          mode="contained"
          onPress={methods.handleSubmit(logInHandler)}
        >
          Log in
        </Button>
      </FormProvider>
    </View>
  );
};

export default LogIn;
