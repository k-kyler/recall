import React from "react";
import {
  Controller,
  FieldError,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import isObject from "lodash/isObject";
import TextInput, {
  Props as TextInputProps,
} from "../components/public/TextInput";

type Props = {
  inputName: string;
  inputError: FieldError;
  rules?: UseControllerProps["rules"];
} & TextInputProps;

const RHFTextInput: React.FC<Props> = ({
  inputName,
  inputError,
  rules,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={inputName}
      control={control}
      rules={rules}
      render={({ field: { ref: _, ...fieldRest } }) => (
        <TextInput
          {...rest}
          {...fieldRest}
          error={isObject(inputError)}
          helperText={isObject(inputError) ? inputError?.message : undefined}
        />
      )}
    />
  );
};

export default RHFTextInput;
