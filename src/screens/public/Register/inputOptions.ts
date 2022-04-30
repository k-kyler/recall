import { RegisterInputNames } from ".";
import { Props as TextInputProps } from "../../../components/public/TextInput";

type PropsType = Record<RegisterInputNames, TextInputProps>;

export const options: PropsType = {
  username: {
    // dynamic
    label: "Username",
    placeholder: "Enter your username",
    // static
    mode: "outlined",
  },
  email: {
    // dynamic
    label: "Email",
    placeholder: "Enter your email",
    // static
    mode: "outlined",
  },
  password: {
    // dynamic
    label: "Password",
    placeholder: "Enter your password",
    // static
    mode: "outlined",
    secureTextEntry: true,
  },
  confirmPassword: {
    // dynamic
    label: "Confirm password",
    placeholder: "Enter your password again",
    // static
    mode: "outlined",
    secureTextEntry: true,
  },
};
