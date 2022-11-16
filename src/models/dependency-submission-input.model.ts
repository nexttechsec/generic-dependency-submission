export class InputKeysConstants {
  public static readonly LANGUAGE_KEY = "language";
  public static readonly DEPENDENCY_MANAGEMENT_KEY = "dependency-management";
  public static readonly MANIFEST_FILES_KEY = "manifest-files";

  private constructor() {
    // cannot be instantiated
  }
}

export enum AvailableLanguageEnum {
  JAVA = "java",
  JAVASCRIPT = "javascript",
  PYTHON = "python",
}

export enum AvailableDependencyManagementEnum {
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
  dependencyManagement: AvailableDependencyManagementEnum;
  manifestFiles: string[];
}
