import { ParserService } from "./parser.service";
import { ParserOutputModel } from "../../models/parser/output/parser-output.model";
import { ActionWrapperService } from "../action-wrapper/action-wrapper.service";
import fs from "fs";
import path from "path";
import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";
import { DependencySubmissionInputItemModel } from "../../models/dependency-submission/dependency-submission-input-item.model";
import * as buffer from "buffer";

export abstract class AbstractParserService implements ParserService {
  public constructor(protected actionWrapperService: ActionWrapperService) {}

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

  /**
   * Get file name (without extension)
   * @param filename
   * @protected
   */
  protected getFileName(filename: string): string {
    const fullPath: string = path.join(
      this.actionWrapperService.getProjectBasePath(),
      filename
    );

    return path.basename(fullPath, path.extname(fullPath));
  }
}
