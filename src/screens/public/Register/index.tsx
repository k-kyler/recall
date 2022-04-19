import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { RHFTextInput } from "../../../components/RHF";
import { options } from "./inputOptions";
import { generateRules } from "../../../utils/rulesGeneration";
import { registerInputRules } from "./registerRules";

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
    fontSize: 20,
    marginBottom: 35,
    textAlign: "center",
  },
  registerButton: {
    marginTop: 10,
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

  const registerHandler: SubmitHandler<FormInputType> = ({
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      // Show password not match alert...
    }

    // Register process...
  };

  const rules = generateRules(Object.keys(defaultValues), registerInputRules);

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <Text style={styles.title}>
          Glad to see you here! We'll help you keep everything
        </Text>

        <View>
          {INPUT_NAMES.map((inputName: RegisterInputNames) => (
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
