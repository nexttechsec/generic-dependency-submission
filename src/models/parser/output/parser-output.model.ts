import { ParserOutputItemModel } from "./parser-output-item.model";
import { DependencySubmissionInputItemModel } from "../../dependency-submission-input-item.model";
import { TreeModel } from "../../tree/tree.model";

export interface ParserOutputModel {
  input: DependencySubmissionInputItemModel;
  output: TreeModel<string, ParserOutputItemModel>;
}
