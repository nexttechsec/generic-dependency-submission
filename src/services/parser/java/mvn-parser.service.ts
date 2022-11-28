import { XMLParser } from "fast-xml-parser";
import { TreeUtil } from "../../../commons/util/tree-util";
import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";
import { ParserOutputItemModel } from "../../../models/parser/output/parser-output-item.model";
import { ActionWrapperService } from "../../action-wrapper/action-wrapper.service";
import { AbstractParserService } from "../abstract-parser.service";
import { DependencySubmissionInputItemModel } from "../../../models/dependency-submission/dependency-submission-input-item.model";
import {
  DependencyMetadataByEdgeId,
  SourceEdgeToTargetEdges,
} from "../../../models/tree/graph-dep.model";
import { AvailableDependencyManagementEnum } from "../../../models/dependency-submission/dependency-submission-input.model";

export class MvnParserService extends AbstractParserService {
  private readonly _parser: XMLParser;

  constructor(actionWrapperService: ActionWrapperService) {
    super(actionWrapperService);
    this._parser = new XMLParser({ ignoreAttributes: false });
  }

  parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel {
    const fileContent = this.getFile(
      dependencySubmissionInputItemModel.manifestPath
    );
    const result = this._parser.parse(fileContent);

    const graphObject = result.graphml.graph;
    const dependencyNameByEdgeId: DependencyMetadataByEdgeId<ParserOutputItemModel> =
      this.extractDependencyNameByEdgeId(
        graphObject,
        dependencySubmissionInputItemModel.dependencyManagement
      );
    const sourceEdgeToTargetEdges: SourceEdgeToTargetEdges =
      this.extractSourceEdgeToTargetEdges(graphObject);
    const rootEdgeId: string | undefined = this.extractRootEdgeId(
      dependencyNameByEdgeId,
      sourceEdgeToTargetEdges
    );

    return {
      input: dependencySubmissionInputItemModel,
      output: TreeUtil.createTreeFromDependencyPairs(
        dependencyNameByEdgeId,
        sourceEdgeToTargetEdges,
        rootEdgeId,
        null
      ),
    };
  }

  /**
   * Create a dictionary where the key is the edgeId unique identifier(sourceId from the edges array)
   * and the value is the full name of the library (e.g: org.playground:Log4jVulnerabilityAppMvn:jar:1.0-SNAPSHOT)
   * @param graphObject extracted graph object
   * @private
   */
  private extractDependencyNameByEdgeId(
    graphObject: any,
    dependencyManagementEnum: AvailableDependencyManagementEnum
  ): DependencyMetadataByEdgeId<ParserOutputItemModel> {
    const dependencyNameByEdgeId: DependencyMetadataByEdgeId<ParserOutputItemModel> =
      {};
    for (const info of graphObject.node) {
      const data = info?.data?.["y:ShapeNode"]?.["y:NodeLabel"]?.split(":");

      dependencyNameByEdgeId[info?.["@_id"]] = {
        type: dependencyManagementEnum,
        namespace: data?.[0],
        name: data?.[1],
        version: data?.[3],
        qualifiers: undefined, // TODO: check if qualifiers or subpath are needed
        subpath: undefined,
        scope: data?.[4], // check if scope is needed
      };
    }

    return dependencyNameByEdgeId;
  }

  /**
   * Create a dictionary where the key is the edge source (parent dependency) and the value
   * is a list of edge targets (child dependencies)
   * @param graphObject
   * @private
   */
  private extractSourceEdgeToTargetEdges(
    graphObject: any
  ): SourceEdgeToTargetEdges {
    const edgesByNodeId: SourceEdgeToTargetEdges = {};

    for (const info of graphObject.edge) {
      const targetId = info["@_source"];

      if (!edgesByNodeId[targetId]) {
        edgesByNodeId[targetId] = [];
      }

      edgesByNodeId[targetId].push(info["@_target"]);
    }

    return edgesByNodeId;
  }

  /**
   * Extract the root edge id
   * The root is the one unique value that cannot be found in the list of target edges
   * @param dependencyNameByEdgeId
   * @param sourceEdgeToTargetEdges
   * @private
   */
  private extractRootEdgeId(
    dependencyNameByEdgeId: DependencyMetadataByEdgeId<ParserOutputItemModel>,
    sourceEdgeToTargetEdges: SourceEdgeToTargetEdges
  ): string {
    return (
      Object.keys(dependencyNameByEdgeId).find((key: string) => {
        return Object.entries(sourceEdgeToTargetEdges).every(
          ([_, value]) => !value.includes(key)
        );
      }) ?? ""
    );
  }
}
