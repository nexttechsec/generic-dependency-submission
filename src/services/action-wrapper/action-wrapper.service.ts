import * as core from "@actions/core";
import * as github from "@actions/github";

export class ActionWrapperService {
  /**
   * Get the project base path
   */
  getProjectBasePath(): string {
    return process.env["GITHUB_WORKSPACE"] || "";
  }

  /**
   * Get value from GitHub action input
   * @param key key to search for
   */
  getRawValue(key: string): string {
    return core.getInput(key);
  }

  /**
   * GitHub toolkit does not support providing list of string. We have to provide the list as:
   * <code>
   *   with:
   *      some-key: |
   *          value1
   *          value2
   *          value3
   * </code>
   * @param key to search for
   */
  getListValue(key: string): string[] {
    return core
      .getInput(key)
      ?.split("\n")
      .map((x) => x.trim())
      .filter((x) => x !== "");
  }

  /**
   * Get the project url
   */
  getProjectUrl(): string {
    return github?.context?.payload?.repository?.html_url ?? "";
  }

  /**
   * Get project name
   */
  getProjectName(): string {
    return github?.context?.payload?.repository?.name ?? "";
  }
}
