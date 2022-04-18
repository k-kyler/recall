import { LoginInputNames } from ".";
import { Props as TextInputProps } from "../../../components/public/TextInput";

type PropsType = Record<LoginInputNames, TextInputProps>;

export const options: PropsType = {
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
};
