import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "./dependency-submission-input.model";

export interface DependencySubmissionInputItemModel {
  language: AvailableLanguageEnum;
  dependencyManagement: AvailableDependencyManagementEnum;
  manifestPath: string;
}
