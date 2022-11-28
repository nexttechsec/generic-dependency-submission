import { InputValidatorService } from "../../../../src/services/validator/input-validator.service";
import { ActionWrapperService } from "../../../../src/services/action-wrapper/action-wrapper.service";
import { AppError } from "../../../../src/commons/error/app-error";
import { AppErrorType } from "../../../../src/commons/error/app-error-type";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
  DependencySubmissionInputModel,
  InputKeysConstants,
} from "../../../../src/models/dependency-submission/dependency-submission-input.model";

describe("InputValidatorService", () => {
  let underTest: InputValidatorService;
  let inputWrapperServiceMock: ActionWrapperService;

  beforeEach(() => {
    inputWrapperServiceMock = new ActionWrapperService();
    underTest = new InputValidatorService(inputWrapperServiceMock);
  });

  it("should throw exception if language is not valid", () => {
    // given
    const actionWrapperServiceMockSpy = jest.spyOn(
      inputWrapperServiceMock,
      "getRawValue"
    );
    actionWrapperServiceMockSpy.mockReturnValue("");

    // when
    try {
      underTest.getAndValidateInput();
      fail("An exception should be thrown");
    } catch (err) {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(AppError);
      expect((err as AppError).errorType).toBe(AppErrorType.INVALID_INPUT);
    }

    // then
    expect(actionWrapperServiceMockSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
  });

  it("should throw exception if dependency-management is not valid", () => {
    // given
    const actionWrapperServiceMockSpy = jest.spyOn(
      inputWrapperServiceMock,
      "getRawValue"
    );
    actionWrapperServiceMockSpy
      .mockReturnValueOnce(AvailableLanguageEnum.JAVA)
      .mockReturnValueOnce("");

    // when
    try {
      underTest.getAndValidateInput();
      fail("An exception should be thrown");
    } catch (err) {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(AppError);
      expect((err as AppError).errorType).toBe(AppErrorType.INVALID_INPUT);
    }

    // then
    expect(actionWrapperServiceMockSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
    expect(actionWrapperServiceMockSpy).toHaveBeenCalledWith(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
  });

  it("should throw exception if manifest-files is not defined", () => {
    // given
    const actionWrapperServiceMockGetRawValueSpy = jest.spyOn(
      inputWrapperServiceMock,
      "getRawValue"
    );
    actionWrapperServiceMockGetRawValueSpy
      .mockReturnValueOnce(AvailableLanguageEnum.JAVA)
      .mockReturnValueOnce(AvailableDependencyManagementEnum.MAVEN);

    const actionWrapperServiceMockGetListValue = jest.spyOn(
      inputWrapperServiceMock,
      "getListValue"
    );
    actionWrapperServiceMockGetListValue.mockReturnValueOnce(
      undefined as any as string[]
    );

    // when
    try {
      underTest.getAndValidateInput();
      fail("An exception should be thrown");
    } catch (err) {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(AppError);
      expect((err as AppError).errorType).toBe(AppErrorType.INVALID_INPUT);
    }

    // then
    expect(actionWrapperServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
    expect(actionWrapperServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
    expect(actionWrapperServiceMockGetListValue).toHaveBeenCalledWith(
      InputKeysConstants.MANIFEST_FILES_KEY
    );
  });

  it("should return instance of DependencySubmissionInputModel with the right data", () => {
    // given
    const actionWrapperServiceMockGetRawValueSpy = jest.spyOn(
      inputWrapperServiceMock,
      "getRawValue"
    );
    actionWrapperServiceMockGetRawValueSpy
      .mockReturnValueOnce(AvailableLanguageEnum.JAVA)
      .mockReturnValueOnce(AvailableDependencyManagementEnum.MAVEN);

    const actionWrapperServiceMockGetListValue = jest.spyOn(
      inputWrapperServiceMock,
      "getListValue"
    );
    actionWrapperServiceMockGetListValue.mockReturnValueOnce([
      "tests/helpers/mock/java/mvn/dependency.graphml",
    ]);

    const actionWrapperGetProjectBasePathSpy = jest.spyOn(
      inputWrapperServiceMock,
      "getProjectBasePath"
    );
    actionWrapperGetProjectBasePathSpy.mockReturnValueOnce("");

    // when
    const result: DependencySubmissionInputModel =
      underTest.getAndValidateInput();

    // then
    expect(result).toEqual({
      language: AvailableLanguageEnum.JAVA,
      dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
      manifestFiles: ["tests/helpers/mock/java/mvn/dependency.graphml"],
    });
    expect(actionWrapperServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
    expect(actionWrapperServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
    expect(actionWrapperServiceMockGetListValue).toHaveBeenCalledWith(
      InputKeysConstants.MANIFEST_FILES_KEY
    );
    expect(actionWrapperGetProjectBasePathSpy).toHaveBeenCalled();
  });
});
