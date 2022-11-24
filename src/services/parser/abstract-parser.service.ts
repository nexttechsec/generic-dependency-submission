import { ParserService } from "./parser.service";
import { ParserOutputModel } from "../../models/parser/output/parser-output.model";
import { DependencySubmissionInputItemModel } from "../../models/dependency-submission-input-item.model";
import { ActionWrapperService } from "../action-wrapper/action-wrapper.service";
import fs from "fs";
import path from "path";
import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";

export abstract class AbstractParserService implements ParserService {
  protected constructor(protected actionWrapperService: ActionWrapperService) {}

  abstract parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel;

  /**
   * Get file to read
   * @param filename
   * @protected
   */
  protected getFile(filename: string): Buffer | string {
    try {
      return fs.readFileSync(
        path.join(this.actionWrapperService.getProjectBasePath(), filename)
      );
    } catch (err) {
      console.error(err);
      throw new AppError(AppErrorType.MANIFEST_FILE_NOT_FOUND);
    }
  }
}
