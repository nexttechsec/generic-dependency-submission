export class AppErrorType {
  public static INVALID_INPUT = new AppErrorType("E1000", "Invalid input");
  public static NOT_IMPLEMENTED = new AppErrorType("E1001", "Not implemented");

  private readonly _errorCode: string;
  private readonly _message: string;

  constructor(errorCode: string, message: string) {
    this._errorCode = errorCode;
    this._message = message;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get message(): string {
    return this._message;
  }
}
