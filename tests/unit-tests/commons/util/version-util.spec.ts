import "jest";
import { LIB_VERSION } from "../../../../src/commons/util/version-util";

describe("version util", () => {
  it("should get the right project version", () => {
    // given + when + then
    /* eslint-disable @typescript-eslint/no-var-requires */
    expect(LIB_VERSION).toEqual(require("../../../../package.json").version);
  });
});
