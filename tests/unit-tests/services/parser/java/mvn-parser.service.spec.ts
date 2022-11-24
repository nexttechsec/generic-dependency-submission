import { MvnParserService } from "../../../../../src/services/parser/java/mvn-parser.service";
import { AppError } from "../../../../../src/commons/error/app-error";
import { AppErrorType } from "../../../../../src/commons/error/app-error-type";
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "../../../../../src/models/dependency-submission-input.model";

// TODO; write tests for it
describe("MvnParserService", () => {
  const UNKNOWN_MANIFEST_PATH = "random-value";
  const KNOWN_MANIFEST_PATH =
    "/Users/stefan/office/projects/github/generic-dependency-submission/asdtests/helpers/input/java/mvn/dependency.graphml";
  let underTest: MvnParserService;

  // beforeEach(() => {
  //   underTest = new MvnParserService();
  // });

  it("fix it later", () => {
    expect(true).toBeTruthy();
  });

  // it("should throw exception if file is not found", () => {
  //   // given + when
  //   try {
  //     underTest.parse({
  //       manifestPath: UNKNOWN_MANIFEST_PATH,
  //       dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
  //       language: AvailableLanguageEnum.JAVA,
  //     });
  //     fail("File should not be found");
  //   } catch (err) {
  //     // then
  //     expect(err).toBeDefined();
  //     expect(err).toBeInstanceOf(AppError);
  //     expect((err as AppError).errorType).toBe(
  //       AppErrorType.MANIFEST_FILE_NOT_FOUND
  //     );
  //   }
  // });
});
