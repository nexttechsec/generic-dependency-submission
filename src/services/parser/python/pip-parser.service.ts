import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";
import { DependencySubmissionInputItemModel } from "../../../models/dependency-submission/dependency-submission-input-item.model";
import { AbstractParserService } from "../abstract-parser.service";
import {
  DependencyMetadataByEdgeId,
  SourceEdgeToTargetEdges,
} from "../../../models/tree/graph-dep.model";
import { ParserOutputItemModel } from "../../../models/parser/output/parser-output-item.model";
import { TreeUtil } from "../../../commons/util/tree-util";
import {
  PipTreeOutputModel,
  PipTreePackage,
} from "../../../models/parser/python/pip-tree-output.model";
import { AvailableDependencyManagementEnum } from "../../../models/dependency-submission/dependency-submission-input.model";

export class PipParserService extends AbstractParserService {
  parse(
    dependencySubmissionInputItemModel: DependencySubmissionInputItemModel
  ): ParserOutputModel {
    const fileContent: PipTreeOutputModel[] = JSON.parse(
      this.getFile(dependencySubmissionInputItemModel.manifestPath) as string
    );

    /**
     * In the output file there's no parent node directly
     * Crete an initial rootEdge it and replace later (after dependencyByName and sourceEdgeToTargetEdges are created)
     * with the file name (since we don't have for now another way to specify which is the "module" name)
     */
    const rootEdgeId = `initial_${Math.random()}:1.0.0`;
    const dependencyNameByEdgeId: DependencyMetadataByEdgeId<ParserOutputItemModel> =
      {
        [rootEdgeId]: {
          type: AvailableDependencyManagementEnum.PIP,
          namespace: null,
          name: this.getFileName(
            dependencySubmissionInputItemModel.manifestPath
          ),
          version: "1.0.0",
        },
      };
    const sourceEdgeToTargetEdges: SourceEdgeToTargetEdges = {
      [rootEdgeId]: [],
    };

    for (const pipDependency of fileContent) {
      const packageInfo: PipTreePackage = pipDependency.package;
      const parentPackageId = this.buildPackageId(packageInfo);

      if (!dependencyNameByEdgeId[parentPackageId]) {
        // add dependency in dependencyNameByEdgeId if not already
        dependencyNameByEdgeId[parentPackageId] = {
          type: dependencySubmissionInputItemModel.dependencyManagement,
          namespace: null,
          name: packageInfo.key,
          version: packageInfo.installed_version,
          scope: null, // TODO: check if scope can be somehow extracted, otherwise runtime by default
        };
      }

      if (!sourceEdgeToTargetEdges[parentPackageId]) {
        // add source -> target relationship to sourceEdgeToTargetEdges
        sourceEdgeToTargetEdges[parentPackageId] = (
          pipDependency.dependencies || []
        ).map((childDependency: PipTreePackage) =>
          this.buildPackageId(childDependency)
        );
      }

      if (this.isDirectDependency(pipDependency, fileContent)) {
        // root dependency, add it in sourceEdgeToTargetEdges array for the root
        sourceEdgeToTargetEdges[rootEdgeId].push(parentPackageId);
      }
    }

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

  private buildPackageId(packageInfo: PipTreePackage): string {
    return `${packageInfo.key}:${packageInfo.installed_version}`;
  }

  /**
   * Check if a particular dependency is a direct dependency or not
   * @param dependency dependency to check
   * @param allDependencies list with all dependencies
   * @private
   */
  private isDirectDependency(
    dependency: PipTreeOutputModel,
    allDependencies: PipTreeOutputModel[]
  ): boolean {
    const dependencyKey = dependency.package.key;
    const dependencyVersion = dependency.package.installed_version;

    return !allDependencies.some((dep: PipTreeOutputModel) => {
      return (
        dep.package.key !== dependencyKey && // ignore same dependency from the list
        dep.dependencies?.some(
          (value: PipTreePackage) =>
            value.key === dependencyKey &&
            value.installed_version === dependencyVersion
        )
      );
    });
  }
}
