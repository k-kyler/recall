import { RulesType } from "../typings/utils";

export function generateRules<T extends string>(
  names: string[],
  initRules: RulesType<T>
) {
  return names.reduce((obj, key) => {
    obj[key] = initRules[key];
    return obj;
  }, {});
}
