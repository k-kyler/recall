import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { RHFTextInput } from "../../../components/RHF";
import { options } from "./inputOptions";
import { generateRules } from "../../../utils/rulesGeneration";
import { forgotPasswordInputRules } from "./forgotPasswordRules";

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
    fontSize: 20,
    marginBottom: 35,
    textAlign: "center",
  },
  sendButton: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#ff6e69",
  },
});

const ForgotPassword = () => {
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

  const forgotPasswordHandler: SubmitHandler<FormInputType> = (data) =>
    console.log(data);

  const rules = generateRules(
    Object.keys(defaultValues),
    forgotPasswordInputRules
  );

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <Text style={styles.title}>
          Enter your email and we'll send you a recovery link
        </Text>

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
