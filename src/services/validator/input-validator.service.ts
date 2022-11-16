import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
  DependencySubmissionInputModel,
  InputKeysConstants,
} from "../../models/dependency-submission-input.model";
import { ActionWrapperService } from "../action-wrapper/action-wrapper.service";
import { EnumUtil } from "../../commons/util/enum-util";
import * as fs from "fs";
import * as path from "path";

export class InputValidatorService {
  constructor(private actionWrapperService: ActionWrapperService) {}

  /**
   * Extract input and validate it. If it available, return an instance of {@link DependencySubmissionInputModel}
   */
  getAndValidateInput(): DependencySubmissionInputModel {
    const languageRawValue = this.actionWrapperService.getRawValue(
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

    const dependencyManagementRawValue = this.actionWrapperService.getRawValue(
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

    const manifestFiles = this.actionWrapperService.getListValue(
      InputKeysConstants.MANIFEST_FILES_KEY
    );
    if (!manifestFiles?.length) {
      console.error(`Invalid provided manifest files: ${manifestFiles}`);
      throw new AppError(AppErrorType.INVALID_INPUT);
    }

    for (const manifestFilePath of manifestFiles) {
      if (
        !fs.existsSync(
          path.join(
            this.actionWrapperService.getProjectBasePath(),
            manifestFilePath
          )
        )
      ) {
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
