import { UseControllerProps } from "react-hook-form";

export type RulesType<T extends string> = Partial<
  Record<T, UseControllerProps["rules"]>
>;
