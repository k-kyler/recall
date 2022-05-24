import React from "react";
import {
  View,
  TextInput as ReactNativeTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { HelperText } from "react-native-paper";

export type Props = {
  error?: boolean;
  helperText?: string;
} & TextInputProps;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const TextInput: React.FC<Props> = ({ error, helperText, ...rest }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <ReactNativeTextInput style={styles.input} {...rest} />

      {/* {error && (
        <HelperText type="error" visible={error}>
          {helperText}
        </HelperText>
      )} */}
    </View>
  );
};

export default TextInput;
