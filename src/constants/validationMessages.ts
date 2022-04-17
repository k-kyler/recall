import { OptionalRecord } from "../typings/OptionalRecord";
import { UseControllerProps } from "react-hook-form";

import { InputName } from "./inputName";

type Message = OptionalRecord<keyof UseControllerProps["rules"], string>;

type Messages = OptionalRecord<InputName, Message>;

export const messages: Messages = {
  email: {
    required: "Email is required",
    pattern: "Invalid email address",
  },
  password: {
    required: "Password is required",
    pattern:
      "At least 8 characters. Including 1 letter, 1 number and 1 special character",
  },
};
