import { AvailableDependencyManagementEnum } from "../../dependency-submission/dependency-submission-input.model";

export interface ParserOutputItemModel {
  /**
   *  the package "type" or package "protocol" such as maven, npm, nuget, gem, pypi, etc. Required.
   */
  type: AvailableDependencyManagementEnum;

  /**
   * some name prefix such as a Maven groupid, a Docker image owner, a GitHub user or organization. Optional and type-specific.
   */
  namespace: string | undefined | null;

  /**
   * the name of the package. Required.
   */
  name: string;

  /**
   * the version of the package. Optional.
   */
  version: string | undefined | null;

  /**
   * extra qualifying data for a package such as an OS, architecture, a distro, etc. Optional and type-specific.
   */
  qualifiers?:
    | {
        [key: string]: string;
      }
    | undefined
    | null;

  /**
   * extra subpath within a package, relative to the package root. Optional.
   */
  subpath?: string | undefined | null;

  // these properties won't be used in PackageUrl but as utilities while adding the dependency
  scope?: string | undefined | null;
}
