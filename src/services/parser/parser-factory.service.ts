import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "../../models/dependency-submission-input.model";
import { ParserService } from "./parser.service";
import { MvnParserService } from "./java/mvn-parser.service";
import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";
import { ActionWrapperService } from "../action-wrapper/action-wrapper.service";

/**
 * Factory used for picking the right parser instance based on language and dependency management
 */
export class ParserFactoryService {
  private readonly _parsers: Map<string, ParserService>;

  constructor(actionWrapperService: ActionWrapperService) {
    this._parsers = new Map<string, ParserService>();
    // JAVA
    this._parsers.set(
      this.getKey(
        AvailableLanguageEnum.JAVA,
        AvailableDependencyManagementEnum.MAVEN
      ),
      new MvnParserService(actionWrapperService)
    );
  }

  /**
   * Get instance of {@ling ParserService} by language and dependencyManagement
   * @param language
   * @param dependencyManagement
   */
  public getParserByCondition(
    language: AvailableLanguageEnum,
    dependencyManagement: AvailableDependencyManagementEnum
  ): ParserService {
    const key: string = this.getKey(language, dependencyManagement);

    console.log(`Get parser for key: ${key}`);
    const parser: ParserService | undefined = this._parsers.get(key);

    if (!parser) {
      console.error(`Parser not found for key: ${key}`);
      throw new AppError(AppErrorType.PARSER_SERVICE_NOT_FOUND);
    }

    return parser;
  }

  /**
   * Get key by language and dependency management
   * @param language
   * @param dependencyManagement
   * @private
   */
  private getKey(
    language: AvailableLanguageEnum,
    dependencyManagement: AvailableDependencyManagementEnum
  ): string {
    return JSON.stringify({
      language,
      dependencyManagement,
    });
  }
}
