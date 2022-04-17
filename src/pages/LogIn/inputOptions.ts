import { Props as TextInputProps } from "../../components/TextInput";
import { InputName } from "../../constants/inputName";

type PropsType = Record<InputName, TextInputProps>;

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
