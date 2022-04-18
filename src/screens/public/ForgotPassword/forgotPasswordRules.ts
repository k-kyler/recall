import { forgotPasswordInputNames } from ".";
import { RulesType } from "../../../typings/utils";
import { messages, patterns } from "../../../constants/validation";

export const forgotPasswordInputRules: RulesType<forgotPasswordInputNames> = {
  email: {
    required: {
      value: true,
      message: messages["email"]["required"],
    },
    pattern: {
      value: patterns["email"],
      message: messages["email"]["pattern"],
    },
  },
};
