import { ParserOutputItemModel } from "./parser-output-item.model";
import { TreeModel } from "../../tree/tree.model";
import { DependencySubmissionInputItemModel } from "../../dependency-submission/dependency-submission-input-item.model";

export interface ParserOutputModel {
  input: DependencySubmissionInputItemModel;
  output: TreeModel<string, ParserOutputItemModel>;
}
