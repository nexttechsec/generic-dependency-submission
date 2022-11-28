// TODO: add some real data here
export const CONTEXT = {
  get issue(): { owner: string; repo: string; number: number } {
    return { number: 0, owner: "", repo: "" };
  },
  get repo(): { owner: string; repo: string } {
    return { owner: "", repo: "" };
  },
  payload: {
    repository: {
      name: "project-name",
      owner: {
        login: "ss",
      },
      html_url: "https://github.com",
    },
  },
  eventName: "string",
  sha: "string",
  ref: "string",
  workflow: "string",
  action: "string",
  actor: "string",
  job: "string",
  runNumber: 1,
  runId: 1,
  apiUrl: "string",
  serverUrl: "string",
  graphqlUrl: "string",
};
