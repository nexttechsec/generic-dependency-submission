export class InputConstants {
  public static readonly LANGUAGE = "language";
  public static readonly DEPENDENCY_MANAGEMENT_TOOL = "dependency-management";
  public static readonly MANIFEST_FILES = "manifest-files";

  private constructor() {
    // cannot be instantiated
  }
}

export enum AvailableLanguageEnum {
  JAVA = "java",
  JAVASCRIPT = "javascript",
  PYTHON = "python",
}

export enum AvailableDependencyManagementToolsEnum {
  // java
  GRADLE = "gradle",
  MAVEN = "maven",

  // javascript
  NPM = "npm",
  YARN = "yarn",

  // python
  PIP = "pip",
  POETRY = "poetry",
}

export interface DependencySubmissionInputModel {
  language: AvailableLanguageEnum;
  dependencyManagement: AvailableDependencyManagementToolsEnum;
  manifestFiles: string[];
}
