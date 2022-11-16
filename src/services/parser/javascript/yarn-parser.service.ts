import { ParserService } from "../parser.service";
import { AppError } from "../../../commons/error/app-error";
import { AppErrorType } from "../../../commons/error/app-error-type";

export class YarnParserService implements ParserService {
  constructor() {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }

  parse(): any {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }
}
