import { AppError } from "../../error/app-error";
import { AppErrorType } from "../../error/app-error-type";
import { PackageURL } from "packageurl-js";
import { ParserOutputItemModel } from "../../../models/parser/output/parser-output-item.model";
import { DependencyScope } from "@github/dependency-submission-toolkit/dist/manifest";
import { AvailableDependencyManagementEnum } from "../../../models/dependency-submission/dependency-submission-input.model";

export class PackageUrlUtil {
  private static readonly TYPE_BY_AVAILABLE_DEPENDENCY_MANAGEMENT = {
    [AvailableDependencyManagementEnum.MAVEN]: "maven",
    [AvailableDependencyManagementEnum.GRADLE]: "maven",
    [AvailableDependencyManagementEnum.NPM]: "npm",
    [AvailableDependencyManagementEnum.YARN]: "npm", // TODO: check if this is the mapping
    [AvailableDependencyManagementEnum.PIP]: "pypi",
    [AvailableDependencyManagementEnum.POETRY]: "pypi", // TODO: check if this is the mapping
  };

  private constructor() {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }

  /**
   * Create instance of {@link PackageURL} based in {@link ParserOutputItemModel}
   * @param parserOutputModel
   */
  public static createPackageURL(
    parserOutputModel: ParserOutputItemModel
  ): PackageURL {
    return new PackageURL(
      PackageUrlUtil.parseTypeByAvailableDependencyManagement(
        parserOutputModel.type
      ),
      parserOutputModel.namespace,
      parserOutputModel.name,
      parserOutputModel.version,
      parserOutputModel.qualifiers,
      parserOutputModel.subpath
    );
  }

  /**
   * Get full identifier based on {@link ParserOutputItemModel}
   * @param parserOutputModel
   */
  public static parseParserOutputModelToString(
    parserOutputModel: ParserOutputItemModel
  ): string {
    return PackageUrlUtil.createPackageURL(parserOutputModel).toString();
  }

  /**
   * Get full identifier based on {@link PackageURL}
   * @param parserOutputModel
   */
  public static parsePackageURLToString(packageURL: PackageURL): string {
    return packageURL.toString();
  }

  /**
   * Parse dependency scope
   * @param scope scope to be parsed to {@link DependencyScope}
   */
  public static parseDependencyScope(scope: string): DependencyScope {
    if (scope === "test") {
      return "development";
    }

    return "runtime";
  }

  /**
   * Parse desired {@link PackageURL#type} based on the {@link AvailableDependencyManagementEnum}
   * @param value
   * @private
   */
  private static parseTypeByAvailableDependencyManagement(
    value: AvailableDependencyManagementEnum
  ): string {
    const type: string =
      PackageUrlUtil.TYPE_BY_AVAILABLE_DEPENDENCY_MANAGEMENT[value];

    if (!type) {
      console.error(
        `Type ${value} cannot be parsed to specific PackageURL type`
      );
      throw new AppError(AppErrorType.INVALID_INPUT);
    }

    return type;
  }
}
