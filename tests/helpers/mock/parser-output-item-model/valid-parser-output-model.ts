import { AvailableDependencyManagementEnum } from "../../../../src/models/dependency-submission/dependency-submission-input.model";

export const VALID_PARSER_OUTPUT_MODEL = {
  type: AvailableDependencyManagementEnum.NPM,
  namespace: "@stdlib",
  name: "namespace",
  version: "0.0.12",
};

export const PACKAGE_URL_BY_VALID_PARSER_UTIL =
  "pkg:npm/%40stdlib/namespace@0.0.12";

export const TEST_DEVELOPMENT_SCOPE = "test";
export const RUNTIME_DEVELOPMENT_SCOPE = "runtime";
