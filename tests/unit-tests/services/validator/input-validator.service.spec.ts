import { InputValidatorService } from "../../../../src/services/validator/input-validator.service";
import { InputExtractorService } from "../../../../src/services/input-extractor/input-extractor.service";
import { AppError } from "../../../../src/commons/error/app-error";
import { AppErrorType } from "../../../../src/commons/error/app-error-type";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
  DependencySubmissionInputModel,
  InputKeysConstants,
} from "../../../../src/models/dependency-submission-input.model";

describe("InputValidatorService", () => {
  let underTest: InputValidatorService;
  let inputExtractorServiceMock: InputExtractorService;

  beforeEach(() => {
    inputExtractorServiceMock = new InputExtractorService();
    underTest = new InputValidatorService(inputExtractorServiceMock);
  });

  it("should throw exception if language is not valid", () => {
    // given
    const inputExtractorServiceMockSpy = jest.spyOn(
      inputExtractorServiceMock,
      "getRawValue"
    );
    inputExtractorServiceMockSpy.mockReturnValue("");

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
    expect(inputExtractorServiceMockSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
  });

  it("should throw exception if dependency-management is not valid", () => {
    // given
    const inputExtractorServiceMockSpy = jest.spyOn(
      inputExtractorServiceMock,
      "getRawValue"
    );
    inputExtractorServiceMockSpy
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
    expect(inputExtractorServiceMockSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
    expect(inputExtractorServiceMockSpy).toHaveBeenCalledWith(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
  });

  it("should throw exception if manifest-files is not defined", () => {
    // given
    const inputExtractorServiceMockGetRawValueSpy = jest.spyOn(
      inputExtractorServiceMock,
      "getRawValue"
    );
    inputExtractorServiceMockGetRawValueSpy
      .mockReturnValueOnce(AvailableLanguageEnum.JAVA)
      .mockReturnValueOnce(AvailableDependencyManagementEnum.MAVEN);

    const inputExtractorServiceMockGetListValue = jest.spyOn(
      inputExtractorServiceMock,
      "getListValue"
    );
    inputExtractorServiceMockGetListValue.mockReturnValueOnce(
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
    expect(inputExtractorServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
    expect(inputExtractorServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
    expect(inputExtractorServiceMockGetListValue).toHaveBeenCalledWith(
      InputKeysConstants.MANIFEST_FILES_KEY
    );
  });

  it("should return instance of DependencySubmissionInputModel with the right data", () => {
    // given
    const inputExtractorServiceMockGetRawValueSpy = jest.spyOn(
      inputExtractorServiceMock,
      "getRawValue"
    );
    inputExtractorServiceMockGetRawValueSpy
      .mockReturnValueOnce(AvailableLanguageEnum.JAVA)
      .mockReturnValueOnce(AvailableDependencyManagementEnum.MAVEN);

    const inputExtractorServiceMockGetListValue = jest.spyOn(
      inputExtractorServiceMock,
      "getListValue"
    );
    inputExtractorServiceMockGetListValue.mockReturnValueOnce([
      "tests/helpers/input/java/mvn/simple-proj.out",
    ]);

    // when
    const result: DependencySubmissionInputModel =
      underTest.getAndValidateInput();

    // then
    expect(result).toEqual({
      language: AvailableLanguageEnum.JAVA,
      dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
      manifestFiles: ["tests/helpers/input/java/mvn/simple-proj.out"],
    });
    expect(inputExtractorServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.LANGUAGE_KEY
    );
    expect(inputExtractorServiceMockGetRawValueSpy).toHaveBeenCalledWith(
      InputKeysConstants.DEPENDENCY_MANAGEMENT_KEY
    );
    expect(inputExtractorServiceMockGetListValue).toHaveBeenCalledWith(
      InputKeysConstants.MANIFEST_FILES_KEY
    );
  });
});
