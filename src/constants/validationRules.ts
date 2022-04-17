import { OptionalRecord } from "../typings/OptionalRecord";
import { UseControllerProps } from "react-hook-form";

import { InputName } from "./inputName";
import { messages } from "./validationMessages";
import { emailPattern, passwordPattern } from "./validationPatterns";

type RulesType = OptionalRecord<InputName, UseControllerProps["rules"]>;

const initRules: RulesType = {
  email: {
    required: {
      value: true,
      message: messages["email"]["required"],
    },
    pattern: {
      value: emailPattern,
      message: messages["email"]["pattern"],
    },
  },
  password: {
    required: {
      value: true,
      message: messages["password"]["required"],
    },
    pattern: {
      value: passwordPattern,
      message: messages["password"]["pattern"],
    },
  },
};

export const makeRules = (name: string[]) => {
  return name.reduce((obj, key) => {
    obj[key] = initRules[key];
    return obj;
  }, {});
};
