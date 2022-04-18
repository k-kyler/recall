import { LoginInputNames } from ".";
import { RulesType } from "../../../typings/utils";
import { messages, patterns } from "../../../constants/validation";

export const loginInputRules: RulesType<LoginInputNames> = {
  email: {
    required: {
      value: true,
      message: messages["email"]["required"],
    },
    pattern: {
      value: patterns["emailPattern"],
      message: messages["email"]["pattern"],
    },
  },
  password: {
    required: {
      value: true,
      message: messages["password"]["required"],
    },
    pattern: {
      value: patterns["passwordPattern"],
      message: messages["password"]["pattern"],
    },
  },
};
