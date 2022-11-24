import { AppError } from "../../error/app-error";
import { AppErrorType } from "../../error/app-error-type";
import { PackageURL } from "packageurl-js";
import { ParserOutputItemModel } from "../../../models/parser/output/parser-output-item.model";
import { DependencyScope } from "@github/dependency-submission-toolkit/dist/manifest";

// TODO: write tests for it
export class PackageUrlUtil {
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
      parserOutputModel.type,
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
}
