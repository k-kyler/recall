import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";
import { RHFTextInput } from "../../../components/RHF";
import { options } from "./inputOptions";
import { generateRules } from "../../../utils/rulesGeneration";
import { forgotPasswordInputRules } from "./forgotPasswordRules";
import { useAuth } from "../../../contexts/AuthContext";

export type forgotPasswordInputNames = "email";

type FormInputType = Partial<Record<forgotPasswordInputNames, string>>;

const INPUT_NAMES: Readonly<forgotPasswordInputNames[]> = ["email"];

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
  sendButton: {
    marginTop: 10,
    padding: 8,
    color: "white",
    backgroundColor: "#ff6e69",
  },
});

const ForgotPassword = () => {
  const { resetPasswordHandler } = useAuth();

  const defaultValues: FormInputType = {
    email: "",
  };

  const methods = useForm<FormInputType>({
    defaultValues,
    mode: "onSubmit",
  });

  const {
    formState: { errors },
  } = methods;

  const forgotPasswordHandler: SubmitHandler<FormInputType> = ({ email }) =>
    resetPasswordHandler(email);

  const rules = generateRules(
    Object.keys(defaultValues),
    forgotPasswordInputRules
  );

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <Title style={styles.title}>
          Enter your email and we'll send you a recovery link
        </Title>

        <View>
          {INPUT_NAMES.map((inputName: forgotPasswordInputNames) => (
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
          style={styles.sendButton}
          uppercase={false}
          mode="contained"
          onPress={methods.handleSubmit(forgotPasswordHandler)}
        >
          Send
        </Button>
      </FormProvider>
    </View>
  );
};

export default ForgotPassword;
