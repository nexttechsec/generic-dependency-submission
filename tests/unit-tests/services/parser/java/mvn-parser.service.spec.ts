import { MvnParserService } from "../../../../../src/services/parser/java/mvn-parser.service";
import { AppError } from "../../../../../src/commons/error/app-error";
import { AppErrorType } from "../../../../../src/commons/error/app-error-type";
import { ActionWrapperService } from "../../../../../src/services/action-wrapper/action-wrapper.service";
import { ParserOutputModel } from "../../../../../src/models/parser/output/parser-output.model";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "../../../../../src/models/dependency-submission/dependency-submission-input.model";

jest.mock("../../../../../src/services/action-wrapper/action-wrapper.service"); // mock module

describe("MvnParserService", () => {
  const UNKNOWN_MANIFEST_PATH = "dependencies/test";
  const KNOWN_MANIFEST_PATH = "tests/helpers/mock/java/mvn/dependency.graphml";
  let underTest: MvnParserService;
  let actionWrapperServiceMock:
    | ActionWrapperService
    | jest.Mocked<ActionWrapperService>;

  beforeEach(() => {
    jest.clearAllMocks(); // clear all mocks before
    actionWrapperServiceMock = new ActionWrapperService();
    underTest = new MvnParserService(actionWrapperServiceMock);
  });

  it("should throw exception if file is not found", () => {
    // given + when
    try {
      (
        actionWrapperServiceMock as jest.Mocked<ActionWrapperService>
      ).getProjectBasePath.mockReturnValueOnce("");
      underTest.parse({
        manifestPath: UNKNOWN_MANIFEST_PATH,
        dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
        language: AvailableLanguageEnum.JAVA,
      });
      fail("File should not be found");
    } catch (err) {
      // then
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(AppError);
      expect((err as AppError).errorType).toBe(
        AppErrorType.MANIFEST_FILE_NOT_FOUND
      );

      expect(
        (actionWrapperServiceMock as jest.Mocked<ActionWrapperService>)
          .getProjectBasePath
      ).toHaveBeenCalledTimes(1);
    }
  });

  it("should parse dependency file if manifest path is valid", () => {
    // given
    (
      actionWrapperServiceMock as jest.Mocked<ActionWrapperService>
    ).getProjectBasePath.mockReturnValueOnce("");

    // when
    const result: ParserOutputModel = underTest.parse({
      manifestPath: KNOWN_MANIFEST_PATH,
      dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
      language: AvailableLanguageEnum.JAVA,
    });

    // then
    expect(result).toBeDefined();
    expect(result.input).toEqual({
      manifestPath: KNOWN_MANIFEST_PATH,
      dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
      language: AvailableLanguageEnum.JAVA,
    });

    // TODO: assert also output

    expect(
      (actionWrapperServiceMock as jest.Mocked<ActionWrapperService>)
        .getProjectBasePath
    ).toHaveBeenCalledTimes(1);
  });
});
