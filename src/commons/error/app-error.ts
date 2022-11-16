import { AppErrorType } from "./app-error-type";

export class AppError extends Error {
  constructor(appErrorType: AppErrorType) {
    super(appErrorType.message);
  }
}
