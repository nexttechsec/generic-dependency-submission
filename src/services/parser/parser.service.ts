import { ParserOutputModel } from "../../models/parser/output/parser-output.model";
import { DependencySubmissionInputItemModel } from "../../models/dependency-submission/dependency-submission-input-item.model";

export interface ParserService {
  /**
   * Parse a particular manifest file to a TreeModel
   */
  parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel;
}
