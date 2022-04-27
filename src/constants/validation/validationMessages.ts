import { UseControllerProps } from "react-hook-form";

type Message = Partial<Record<keyof UseControllerProps["rules"], string>>;

type Messages = Partial<Record<string, Message>>;

const messages: Messages = {
  email: {
    required: "Email is required",
    pattern: "Invalid email address",
  },
  password: {
    required: "Password is required",
    pattern:
      "At least 8 characters. Including 1 letter, 1 number and 1 special character",
  },
  confirmPassword: {
    validate: "Passwords do not match",
  },
};

export default messages;
