export class AppErrorType {
  public static INVALID_INPUT = new AppErrorType("E1000", "Invalid input");
  public static NOT_IMPLEMENTED = new AppErrorType("E1001", "Not implemented");
  public static MANIFEST_FILE_NOT_FOUND = new AppErrorType(
    "E1002",
    "File not found"
  );
  public static PARSER_SERVICE_NOT_FOUND = new AppErrorType(
    "E1003",
    "No parser found"
  );
  public static NODE_NOT_FOUND = new AppErrorType("E1003", "Node not found");

  private readonly _errorCode: string;
  private readonly _message: string;

  private constructor(errorCode: string, message: string) {
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
