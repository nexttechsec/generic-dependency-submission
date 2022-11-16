import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";
import { DependencySubmissionInputModel } from "../../models/dependency-submission-input.model";
import { InputExtractorService } from "../input-extractor/input-extractor.service";

export class InputValidatorService {
  constructor(private inputExtractorService: InputExtractorService) {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }

  checkInputValidity(): void {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }
}
