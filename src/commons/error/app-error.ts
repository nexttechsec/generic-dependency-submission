import { AppErrorType } from "./app-error-type";

export class AppError extends Error {
  private readonly _errorType: AppErrorType;

  constructor(errorType: AppErrorType) {
    super(errorType.message);
    this._errorType = errorType;
  }

  get errorType(): AppErrorType {
    return this._errorType;
  }
}
