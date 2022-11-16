import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";

export class SchemaMappingService {
  constructor() {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }
}
