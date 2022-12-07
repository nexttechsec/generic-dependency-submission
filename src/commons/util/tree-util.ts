import { AppError } from "../error/app-error";
import { AppErrorType } from "../error/app-error-type";
import { TreeNode } from "../../models/tree/tree-node.model";
import { TreeModel } from "../../models/tree/tree.model";
import {
  DependencyMetadataByEdgeId,
  SourceEdgeToTargetEdges,
} from "../../models/tree/graph-dep.model";

// TODO: write tests for it
export class TreeUtil {
  private constructor() {
    throw new AppError(AppErrorType.NOT_IMPLEMENTED);
  }

  /**
   * Create a tree based on a dictionary with {parent -> list of children dependencies}
   * @param dependencyNameByEdgeId - additional metadata by edge id
   * @param sourceEdgeToTargetEdges - the mapping between parent and child dependencies
   * @param currentRootId - unique root id
   * @param parent - parent node
   * @private
   */
  public static createTreeFromDependencyPairs<T>(
    dependencyNameByEdgeId: DependencyMetadataByEdgeId<T>,
    sourceEdgeToTargetEdges: SourceEdgeToTargetEdges,
    currentRootId: string,
    parent: TreeNode<string, T> | null
  ): TreeModel<string, T> {
    return TreeUtil.createRecursive(
      dependencyNameByEdgeId,
      sourceEdgeToTargetEdges,
      currentRootId,
      parent
    );
  }

  /**
   * Create a tree recursive based on a dictionary with {parent -> list of children dependencies}
   * @param dependencyNameByEdgeId - additional metadata by edge id
   * @param sourceEdgeToTargetEdges - the mapping between parent and child dependencies
   * @param currentRootId - unique root id
   * @param parent - parent node
   * @private
   */
  private static createRecursive<T>(
    dependencyNameByEdgeId: DependencyMetadataByEdgeId<T>,
    sourceEdgeToTargetEdges: SourceEdgeToTargetEdges,
    currentRootId: string,
    parent: TreeNode<string, T> | null
  ): TreeModel<string, T> {
    const tree: TreeModel<string, T> = new TreeModel(
      currentRootId,
      dependencyNameByEdgeId[currentRootId]
    );
    const childrenEdges = sourceEdgeToTargetEdges[currentRootId] ?? [];

    for (const childrenEdge of childrenEdges) {
      const newNode: TreeNode<string, T> = new TreeNode<string, T>(
        childrenEdge,
        dependencyNameByEdgeId[childrenEdge]
      );

      if (parent == null) {
        tree.addNode(newNode, currentRootId);
      } else {
        parent.addChild(newNode);
      }

      TreeUtil.createRecursive(
        dependencyNameByEdgeId,
        sourceEdgeToTargetEdges,
        childrenEdge,
        newNode
      );
    }

    return tree;
  }
}
