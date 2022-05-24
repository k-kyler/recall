import React from "react";
import { View } from "react-native";
import { TextInput as PaperTextInput, HelperText } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type Props = {
  label?: string;
  error?: boolean;
  helperText?: string;
} & Omit<TextInputProps, "label" | "error" | "theme">;

const TextInput: React.FC<Props> = ({ label, error, helperText, ...rest }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <PaperTextInput
        autoComplete="true"
        label={label}
        error={error}
        {...rest}
      />

      {/* {error && (
        <HelperText type="error" visible={error}>
          {helperText}
        </HelperText>
      )} */}
    </View>
  );
};

export default TextInput;
