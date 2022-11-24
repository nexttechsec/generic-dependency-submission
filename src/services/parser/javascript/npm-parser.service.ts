import { ParserService } from "../parser.service";
import { AppError } from "../../../commons/error/app-error";
import { AppErrorType } from "../../../commons/error/app-error-type";
import { DependencySubmissionInputItemModel } from "../../../models/dependency-submission-input-item.model";
import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";

export class NpmParserService implements ParserService {
  constructor() {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }

  parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }
}
