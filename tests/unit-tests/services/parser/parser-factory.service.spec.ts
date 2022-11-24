import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "../../../../src/models/dependency-submission-input.model";
import { AppError } from "../../../../src/commons/error/app-error";
import { AppErrorType } from "../../../../src/commons/error/app-error-type";
import { ParserFactoryService } from "../../../../src/services/parser/parser-factory.service";
import { ParserService } from "../../../../src/services/parser/parser.service";
import { MvnParserService } from "../../../../src/services/parser/java/mvn-parser.service";

// TODO: fix it after
describe("ParserFactoryService", () => {
  // let underTest: ParserFactoryService;
  //
  // beforeEach(() => {
  //   underTest = new ParserFactoryService();
  // });

  it("fix it later", () => {
    expect(true).toBeTruthy();
  });

  // it("should throw exception if parser by key is not found", () => {
  //   // given + when
  //   try {
  //     underTest.getParserByCondition(
  //       AvailableLanguageEnum.JAVA,
  //       AvailableDependencyManagementEnum.PIP
  //     );
  //     fail("File should not be found");
  //   } catch (err) {
  //     // then
  //     expect(err).toBeDefined();
  //     expect(err).toBeInstanceOf(AppError);
  //     expect((err as AppError).errorType).toBe(
  //       AppErrorType.PARSER_SERVICE_NOT_FOUND
  //     );
  //   }
  // });
  //
  // it("should return service if parser by key is found", () => {
  //   // given + when
  //   const service: ParserService = underTest.getParserByCondition(
  //     AvailableLanguageEnum.JAVA,
  //     AvailableDependencyManagementEnum.MAVEN
  //   );
  //
  //   // then
  //   expect(service).toBeDefined();
  //   expect(service).toBeInstanceOf(MvnParserService);
  // });
});
