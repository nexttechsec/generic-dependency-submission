import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
  DependencySubmissionInputModel,
  InputKeysConstants,
} from "../../models/dependency-submission-input.model";
import { InputExtractorService } from "../input-extractor/input-extractor.service";
import { EnumUtil } from "../../commons/util/enum-util";
import * as fs from "fs";

export class InputValidatorService {
  constructor(private inputExtractorService: InputExtractorService) {}

  /**
   * Extract input and validate it. If it available, return an instance of {@link DependencySubmissionInputModel}
   */
  getAndValidateInput(): DependencySubmissionInputModel {
    const languageRawValue = this.inputExtractorService.getRawValue(
      InputKeysConstants.LANGUAGE_KEY
    );
    const language = EnumUtil.getEnumKeyByEnumValue(
      AvailableLanguageEnum,
      languageRawValue
    ) as AvailableLanguageEnum;

    if (!language) {
      console.error(`Invalid provided language: '${languageRawValue}'`);
      throw new AppError(AppErrorType.INVALID_INPUT);
    }

    const dependencyManagementRawValue = this.inputExtractorService.getRawValue(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
    const dependencyManagement: AvailableDependencyManagementEnum =
      EnumUtil.getEnumKeyByEnumValue(
        AvailableDependencyManagementEnum,
        dependencyManagementRawValue
      ) as AvailableDependencyManagementEnum;

    if (!dependencyManagement) {
      console.error(
        `Invalid provided dependencyManagement: '${dependencyManagementRawValue}'`
      );
      throw new AppError(AppErrorType.INVALID_INPUT);
    }

    const manifestFiles = this.inputExtractorService.getListValue(
      InputKeysConstants.MANIFEST_FILES_KEY
    );
    if (!manifestFiles?.length) {
      console.error(`Invalid provided manifest files: ${manifestFiles}`);
      throw new AppError(AppErrorType.INVALID_INPUT);
    }

    for (const manifestFilePath of manifestFiles) {
      if (!fs.existsSync(manifestFilePath)) {
        console.error(`Manifest file: '${manifestFilePath}' does not exist.`);
        throw new AppError(AppErrorType.INVALID_INPUT);
      }
    }

    return {
      language,
      dependencyManagement,
      manifestFiles,
    };
  }
}
