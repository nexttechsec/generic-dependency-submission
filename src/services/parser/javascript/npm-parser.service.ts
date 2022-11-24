import { ParserService } from "../parser.service";
import { DependencySubmissionInputItemModel } from "../../../models/dependency-submission-input-item.model";
import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";
import {
  Dependency,
  NpmPackage,
} from "../../../models/parser/javascript/npm/npm-dep.model";
import { AbstractParserService } from "../abstract-parser.service";
import { ActionWrapperService } from "../../action-wrapper/action-wrapper.service";
import { AppError } from "../../../commons/error/app-error";
import { AppErrorType } from "../../../commons/error/app-error-type";
import { TreeModel } from "../../../models/tree/tree.model";
import { ParserOutputItemModel } from "../../../models/parser/output/parser-output-item.model";
import { TreeNode } from "../../../models/tree/tree-node.model";

export class NpmParserService
  extends AbstractParserService
  implements ParserService
{
  constructor(actionWrapperService: ActionWrapperService) {
    super(actionWrapperService);
  }

  parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel {
    const fileContent: NpmPackage = JSON.parse(
      this.getFile(dependencySubmissionInputItemModel.manifestPath) as string
    );

    const tree: TreeModel<string, ParserOutputItemModel> =
      this.buildDependencyTree(
        dependencySubmissionInputItemModel,
        `${fileContent.name}:${fileContent.version}`,
        null,
        fileContent.name,
        {
          version: fileContent.version,
          dependencies: fileContent.dependencies,
        }
      );

    return {
      input: dependencySubmissionInputItemModel,
      output: tree,
    };
  }

  /**
   * Build
   * @param dependencySubmissionInputItemModel
   * @param rootId
   * @param parent
   * @param dependencyName
   * @param dependency
   * @private
   */
  private buildDependencyTree(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel,
    rootId: string,
    parent: TreeNode<string, ParserOutputItemModel> | null,
    dependencyName: string,
    dependency: Dependency
  ): TreeModel<string, ParserOutputItemModel> {
    const [namespace, name] = this.parseNameAndNamespace(dependencyName);

    const tree: TreeModel<string, ParserOutputItemModel> = new TreeModel(
      rootId,
      {
        type: dependencySubmissionInputItemModel.dependencyManagement,
        namespace,
        name,
        version: dependency.version,
      }
    );

    const childrenDependencies = dependency.dependencies;

    if (childrenDependencies !== undefined) {
      for (const [depName, dep] of Object.entries<Dependency>(
        childrenDependencies
      )) {
        const [namespace, name] = this.parseNameAndNamespace(depName);

        const newNodeId = `${name}:${dep.version}`;
        const newNode: TreeNode<string, ParserOutputItemModel> = new TreeNode<
          string,
          ParserOutputItemModel
        >(newNodeId, {
          type: dependencySubmissionInputItemModel.dependencyManagement,
          namespace,
          name,
          version: dependency.version,
        });

        if (parent == null) {
          tree.addNode(newNode, rootId);
        } else {
          parent.addChild(newNode);
        }

        this.buildDependencyTree(
          dependencySubmissionInputItemModel,
          newNodeId,
          newNode,
          depName,
          dep
        );
      }
    }

    return tree;
  }

  /**
   * parseNameAndNamespace parses the name and namespace from a NPM package name.
   * Namespace and name are URL-safe encoded, as expected by PackageURL
   *
   * @param npmDepName
   * @returns tuple of namespace and name
   */
  private parseNameAndNamespace(npmDepName: string): [string, string] {
    const namespaceAndName = npmDepName.split("/");

    if (namespaceAndName.length == 2) {
      return [
        encodeURIComponent(namespaceAndName[0]),
        encodeURIComponent(namespaceAndName[1]),
      ];
    } else if (namespaceAndName.length == 1) {
      return ["", encodeURIComponent(namespaceAndName[0])];
    } else {
      console.error(
        `expectation violated: package '${npmDepName}' has more than one slash (/) in name`
      );
      throw new AppError(AppErrorType.INVALID_INPUT);
    }
  }
}
