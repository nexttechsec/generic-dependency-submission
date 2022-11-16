import { AppError } from "../error/app-error";
import { AppErrorType } from "../error/app-error-type";

export class EnumUtil {
  private constructor() {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }

  static getEnumKeyByEnumValue<T>(
    enm: { [s: string]: T },
    value: string
  ): T | undefined {
    return (Object.values(enm) as unknown as string[]).includes(value)
      ? (value as unknown as T)
      : undefined;
  }
}
