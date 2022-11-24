export class TreeNode<ID, T> {
  private readonly _id: ID;
  private readonly _data: T;
  private _parent: TreeNode<ID, T> | null;
  private readonly _children: TreeNode<ID, T>[];

  /**
   * Build a new node for tree structure.
   * @param {String|Number} id  The id of the node
   */
  constructor(id: ID, data: T) {
    this._id = id;
    this._data = data;
    this._parent = null;
    this._children = [];
  }

  get id(): ID {
    return this._id;
  }

  get data(): T {
    return this._data;
  }

  get children(): TreeNode<ID, T>[] {
    return this._children;
  }

  set parent(parent: TreeNode<ID, T>) {
    this._parent = parent;
  }

  /**
   * Add new child to this node
   * @param id - child id
   * @param data - data to be saved
   */
  addChild(child: TreeNode<ID, T>): TreeNode<ID, T> {
    child.parent = this;
    this._children.push(child);

    return child;
  }
}
