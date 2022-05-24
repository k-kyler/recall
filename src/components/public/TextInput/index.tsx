import React from "react";
import {
  View,
  TextInput as ReactNativeTextInput,
  TextInputProps,
} from "react-native";
import { HelperText } from "react-native-paper";

export type Props = {
  error?: boolean;
  helperText?: string;
} & TextInputProps;

const TextInput: React.FC<Props> = ({ error, helperText, ...rest }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <ReactNativeTextInput {...rest} />

      {error && (
        <HelperText type="error" visible={error}>
          {helperText}
        </HelperText>
      )}
    </View>
  );
};

export default TextInput;
