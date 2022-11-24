import { DependencySubmissionInputItemModel } from "../../models/dependency-submission-input-item.model";
import { ParserOutputModel } from "../../models/parser/output/parser-output.model";

export interface ParserService {
  /**
   * Parse a particular manifest file to a TreeModel
   */
  parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel;
}
