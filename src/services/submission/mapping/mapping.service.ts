import { TreeModel } from "../../../models/tree/tree.model";
import { Manifest, Package } from "@github/dependency-submission-toolkit";
import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";
import { ParserOutputItemModel } from "../../../models/parser/output/parser-output-item.model";
import { TreeNode } from "../../../models/tree/tree-node.model";
import { PackageUrlUtil } from "../../../commons/util/submission/package-url-util";

export interface PackageWrapperModel {
  parsedPackage: Package;
  scope: string | null | undefined;
  depth: number;
}

export class MappingService {
  /**
   * Create an instance of {@link Manifest} based on the <param>treeModel</param>
   * @param treeModel {@link TreeModel} input
   */
  createManifest(outputModel: ParserOutputModel): Manifest {
    const treeModel: TreeModel<string, ParserOutputItemModel> =
      outputModel.output;
    const root: TreeNode<string, ParserOutputItemModel> = treeModel.root;
    const rootData: ParserOutputItemModel = root.data;

    const manifest = new Manifest(rootData.name);

    // create all dependencies
    const newPackages = this.createPackageStructureRecursive(root, []).slice(1); // remove parent node and start with the first layer

    for (const newPackage of newPackages) {
      if (newPackage.depth === 1) {
        // direct dependencies
        manifest.addDirectDependency(
          newPackage.parsedPackage,
          PackageUrlUtil.parseDependencyScope(newPackage.scope ?? "")
        );
      }

      manifest.addIndirectDependency(
        // indirect dependencies
        newPackage.parsedPackage,
        PackageUrlUtil.parseDependencyScope(newPackage.scope ?? "")
      );
    }

    return manifest;
  }

  /**
   * Create list of packages to be submitted
   * @param rootNode {@link TreeNode}
   * @param packages current list of packages ({@link PackageWrapperModel})
   * @private
   */
  private createPackageStructureRecursive(
    rootNode: TreeNode<string, ParserOutputItemModel>,
    packages: PackageWrapperModel[],
    level = 0
  ): PackageWrapperModel[] {
    const newPackage = new Package(
      PackageUrlUtil.createPackageURL(rootNode.data)
    );
    packages.push({
      parsedPackage: newPackage,
      scope: rootNode.data?.scope,
      depth: level++,
    });

    const children: TreeNode<string, ParserOutputItemModel>[] =
      rootNode.children ?? [];

    for (const child of children) {
      const childPackage: Package = new Package(
        PackageUrlUtil.createPackageURL(child.data)
      );
      newPackage.dependsOn(childPackage);

      this.createPackageStructureRecursive(child, packages, level);
    }

    return packages;
  }
}
