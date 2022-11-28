import { AppError } from "../../../../src/commons/error/app-error";
import { AppErrorType } from "../../../../src/commons/error/app-error-type";
import { ParserFactoryService } from "../../../../src/services/parser/parser-factory.service";
import { ParserService } from "../../../../src/services/parser/parser.service";
import { MvnParserService } from "../../../../src/services/parser/java/mvn-parser.service";
import { ActionWrapperService } from "../../../../src/services/action-wrapper/action-wrapper.service";
import { NpmParserService } from "../../../../src/services/parser/javascript/npm-parser.service";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "../../../../src/models/dependency-submission/dependency-submission-input.model";
import { PipParserService } from "../../../../src/services/parser/python/pip-parser.service";

jest.mock("../../../../src/services/action-wrapper/action-wrapper.service"); // mock module

describe("ParserFactoryService", () => {
  let underTest: ParserFactoryService;
  let actionWrapperServiceMock: ActionWrapperService;

  beforeEach(() => {
    jest.clearAllMocks(); // clear all mocks before
    actionWrapperServiceMock = new ActionWrapperService();
    underTest = new ParserFactoryService(actionWrapperServiceMock);
  });

  it("should throw exception if parser by key is not found", () => {
    // given + when
    try {
      underTest.getParserByCondition(
        AvailableLanguageEnum.JAVA,
        AvailableDependencyManagementEnum.PIP
      );
      fail("File should not be found");
    } catch (err) {
      // then
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(AppError);
      expect((err as AppError).errorType).toBe(
        AppErrorType.PARSER_SERVICE_NOT_FOUND
      );
    }
  });

  [
    // Java
    {
      language: AvailableLanguageEnum.JAVA,
      dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
      expectedInstance: MvnParserService,
    },
    {
      language: AvailableLanguageEnum.JAVA,
      dependencyManagement: AvailableDependencyManagementEnum.GRADLE,
      expectedInstance: undefined,
    },

    // Javascript
    {
      language: AvailableLanguageEnum.JAVASCRIPT,
      dependencyManagement: AvailableDependencyManagementEnum.NPM,
      expectedInstance: NpmParserService,
    },
    {
      language: AvailableLanguageEnum.JAVASCRIPT,
      dependencyManagement: AvailableDependencyManagementEnum.YARN,
      expectedInstance: undefined,
    },

    // Python
    {
      language: AvailableLanguageEnum.PYTHON,
      dependencyManagement: AvailableDependencyManagementEnum.PIP,
      expectedInstance: PipParserService,
    },
    {
      language: AvailableLanguageEnum.PYTHON,
      dependencyManagement: AvailableDependencyManagementEnum.POETRY,
      expectedInstance: undefined,
    },
  ].forEach((input) =>
    it(`should return ${
      input.expectedInstance ? "undefined" : input.expectedInstance
    } if parser by key is language: ${
      input.language
    } and dependencyManagement: ${input.dependencyManagement}`, () => {
      // given + when

      try {
        const service: ParserService = underTest.getParserByCondition(
          input.language,
          input.dependencyManagement
        );

        // then
        if (input.expectedInstance) {
          expect(service).toBeDefined();
          expect(service).toBeInstanceOf(input.expectedInstance);
        } else {
          fail("No instance if expected");
        }
      } catch (err) {
        // then
        if (input.expectedInstance) {
          fail("An instance is expected");
        } else {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(AppError);
          expect((err as AppError).errorType).toBe(
            AppErrorType.PARSER_SERVICE_NOT_FOUND
          );
        }
      }
    })
  );
});
