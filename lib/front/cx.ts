import ClassNames from "classnames";

export function cx(...classNames: ClassNames.ArgumentArray): string {
  return ClassNames(...classNames);
}
