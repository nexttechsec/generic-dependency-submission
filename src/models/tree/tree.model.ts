import { TreeNode } from "./tree-node.model";
import { AppError } from "../../commons/error/app-error";
import { AppErrorType } from "../../commons/error/app-error-type";

export class TreeModel<ID, T> {
  private readonly _root: TreeNode<ID, T>;

  /**
   * Create new tree with
   * @param id
   * @param data
   */
  constructor(id: ID, data: T) {
    this._root = new TreeNode(id, data);
  }

  /**
   * Add a node to the tree.
   * @param    node            The new node.
   * @param    parentId      The parent node id.
   */
  addNode(node: TreeNode<ID, T>, parentId: ID) {
    const parent: TreeNode<ID, T> | null = this.findNodeStartingBy(
      this._root,
      parentId
    );

    if (parent) {
      parent.addChild(node);
    } else {
      throw new AppError(AppErrorType.NODE_NOT_FOUND);
    }
  }

  get root(): TreeNode<ID, T> {
    return this._root;
  }

  /**
   * Pretty print for tree
   */
  printTree(): void {
    this.recursePrint(this._root, "\t");
  }

  /**
   * Find a particular Node starting by another one
   * @param currentNode - the
   * @param id node to search for
   * @private
   */
  private findNodeStartingBy(
    currentNode: TreeNode<ID, T>,
    id: ID
  ): TreeNode<ID, T> | null {
    if (currentNode?.id === id) {
      return currentNode;
    }

    for (const child of currentNode.children) {
      if (this.findNodeStartingBy(child, id)) {
        return child;
      }
    }

    return null;
  }

  /**
   * Print the tree using recursion
   * @param startingNode
   * @param prefix
   * @private
   */
  private recursePrint(startingNode: TreeNode<ID, T>, prefix: string) {
    console.log(prefix + JSON.stringify(startingNode.data));
    for (let i = 0, { length } = startingNode.children; i < length; i++) {
      this.recursePrint(startingNode.children[i], "\t" + prefix);
    }
  }
}
