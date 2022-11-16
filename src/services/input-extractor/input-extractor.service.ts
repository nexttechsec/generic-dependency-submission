import * as core from "@actions/core";

export class InputExtractorService {
  /**
   * Get value from github action input
   * @param key key to search for
   */
  getRawValue(key: string): string {
    return core.getInput(key);
  }

  /**
   * Github toolkit does not support providing list of string. We have to provide the list as:
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
      .filter((x) => x !== "");
  }
}
