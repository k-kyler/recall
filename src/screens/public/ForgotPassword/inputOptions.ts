import { forgotPasswordInputNames } from ".";
import { Props as TextInputProps } from "../../../components/public/TextInput";

type PropsType = Record<forgotPasswordInputNames, TextInputProps>;

export const options: PropsType = {
  email: {
    // dynamic
    label: "Email",
    placeholder: "Enter your email",
    // static
    mode: "outlined",
  },
};
