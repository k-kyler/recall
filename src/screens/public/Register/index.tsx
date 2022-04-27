import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, Headline } from "react-native-paper";
import { RHFTextInput } from "../../../components/RHF";
import { options } from "./inputOptions";
import { generateRules } from "../../../utils/rulesGeneration";
import { registerInputRules } from "./registerRules";
import { messages } from "../../../constants/validation";
import { auth } from "../../../../firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RegisterInputNames = "email" | "password" | "confirmPassword";

type FormInputType = Partial<Record<RegisterInputNames, string>>;

const INPUT_NAMES: Readonly<RegisterInputNames[]> = [
  "email",
  "password",
  "confirmPassword",
];

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginBottom: 35,
    textAlign: "center",
  },
  registerButton: {
    marginTop: 10,
    padding: 8,
    color: "white",
    backgroundColor: "#ff6e69",
  },
});

const Register = () => {
  const defaultValues: FormInputType = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm<FormInputType>({
    defaultValues,
    mode: "onSubmit",
  });

  const {
    formState: { errors },
  } = methods;

  const passwordsValidation = (confirmPassword: string) => {
    const password = methods.getValues("password");
    return (
      password === confirmPassword || messages["confirmPassword"]["validate"]
    );
  };

  const registerHandler: SubmitHandler<FormInputType> = ({
    email,
    password,
  }) => {
    auth
      .createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then((userCredential) => {
        // Toast message
      })
      .catch((error) => alert(error));
  };

  const rules = generateRules(Object.keys(defaultValues), registerInputRules);

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <Headline style={styles.title}>
          Please enter your email and password
        </Headline>

        <View>
          {INPUT_NAMES.map((inputName: RegisterInputNames) => (
            <RHFTextInput
              key={inputName}
              inputName={inputName}
              inputError={errors[inputName]}
              rules={{
                ...rules[inputName],
                validate:
                  inputName === "confirmPassword"
                    ? passwordsValidation
                    : undefined,
              }}
              {...options[inputName]}
            />
          ))}
        </View>

        <Button
          style={styles.registerButton}
          uppercase={false}
          mode="contained"
          onPress={methods.handleSubmit(registerHandler)}
        >
          Register
        </Button>
      </FormProvider>
    </View>
  );
};

export default Register;
