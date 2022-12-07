import "jest";
import { ActionWrapperService } from "../../../../src/services/action-wrapper/action-wrapper.service";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { customMockProperty } from "../../../helpers/util/jest-util";
import { CONTEXT } from "../../../helpers/mock/action-wrapper/input.mocks";

jest.mock("@actions/core");
jest.mock("@actions/github");

const mockedCore = core as jest.Mocked<typeof core>;
const mockedGithub = github as jest.Mocked<typeof github>;

describe("ActionWrapperService", () => {
  let underTest: ActionWrapperService;

  beforeEach(() => {
    jest.clearAllMocks(); // clear all mocks before
    underTest = new ActionWrapperService();
  });

  it("should get project base path if env is set", () => {
    // given
    const oldEnvs = { ...process.env };
    process.env["GITHUB_WORKSPACE"] = "some-value";

    // when
    expect(underTest.getProjectBasePath()).toBe("some-value");

    // then
    process.env = oldEnvs;
  });

  it("should get empty for project base path if env is not set", () => {
    // given + when + then
    expect(underTest.getProjectBasePath()).toBe("");
  });

  it("should return desired input", () => {
    // given
    const inputKey = "key";
    mockedCore.getInput.mockReturnValueOnce("value");

    // when
    const result = underTest.getRawValue(inputKey);

    // then
    expect(result).toBe("value");
    expect(mockedCore.getInput).toHaveBeenCalledTimes(1);
    expect(mockedCore.getInput).toHaveBeenCalledWith(inputKey);
  });

  it("should return list value", () => {
    // given
    const inputKey = "key";
    mockedCore.getInput.mockReturnValueOnce(`
        test1\n
        test2\n
        test3`);

    // when
    const result = underTest.getListValue(inputKey);

    // then
    expect(result).toEqual(["test1", "test2", "test3"]);
    expect(mockedCore.getInput).toHaveBeenCalledTimes(1);
    expect(mockedCore.getInput).toHaveBeenCalledWith(inputKey);
  });

  it("should return undefined if value is not provided", () => {
    // given
    const inputKey = "key";
    mockedCore.getInput.mockReturnValue(undefined as any as string);

    // when
    const result = underTest.getListValue(inputKey);

    // then
    expect(result).toBeUndefined();
    expect(mockedCore.getInput).toHaveBeenCalledTimes(1);
    expect(mockedCore.getInput).toHaveBeenCalledWith(inputKey);
  });

  it("should get the project url", () => {
    // given
    customMockProperty(mockedGithub, "context", CONTEXT);

    // when
    const result = underTest.getProjectUrl();

    // then
    expect(result).toEqual("https://github.com");
  });

  it("should get the project name", () => {
    // given
    customMockProperty(mockedGithub, "context", CONTEXT);

    // when
    const result = underTest.getProjectName();

    // then
    expect(result).toEqual("project-name");
  });
});
