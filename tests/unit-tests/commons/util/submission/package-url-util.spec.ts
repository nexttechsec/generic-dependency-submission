import "jest";
import { PackageURL } from "packageurl-js";
import { DependencyScope } from "@github/dependency-submission-toolkit/dist/manifest";
import { PackageUrlUtil } from "../../../../../src/commons/util/submission/package-url-util";
import {
  PACKAGE_URL_BY_VALID_PARSER_UTIL,
  RUNTIME_DEVELOPMENT_SCOPE,
  TEST_DEVELOPMENT_SCOPE,
  VALID_PARSER_OUTPUT_MODEL,
} from "../../../../helpers/mock/parser-output-item-model/valid-parser-output-model";

describe("PackageUrlUtil", () => {
  it("should create an instance of PackageURL", () => {
    // given + when
    const packageUrl: PackageURL = PackageUrlUtil.createPackageURL(
      VALID_PARSER_OUTPUT_MODEL
    );

    // then
    expect(packageUrl.toString()).toBe(PACKAGE_URL_BY_VALID_PARSER_UTIL);
  });

  it("should parse the ParserOutputModel to String", () => {
    // given + when
    const packageUrl: string = PackageUrlUtil.parseParserOutputModelToString(
      VALID_PARSER_OUTPUT_MODEL
    );

    // then
    expect(packageUrl).toBe(PACKAGE_URL_BY_VALID_PARSER_UTIL);
  });

  it("should parse the ParserOutputModel to String", () => {
    // given + when
    const packageUrl: string = PackageUrlUtil.parsePackageURLToString(
      PackageUrlUtil.createPackageURL(VALID_PARSER_OUTPUT_MODEL)
    );

    // then
    expect(packageUrl).toBe(PACKAGE_URL_BY_VALID_PARSER_UTIL);
  });

  [
    {
      input: TEST_DEVELOPMENT_SCOPE,
      expected: "development",
    },
    {
      input: RUNTIME_DEVELOPMENT_SCOPE,
      expected: "runtime",
    },
  ].forEach((data) => {
    it("should parse the DependencyScope", () => {
      // given + when
      const dependencyScope: DependencyScope =
        PackageUrlUtil.parseDependencyScope(data.input);

      // then
      expect(dependencyScope).toBe(data.expected);
    });
  });
});
