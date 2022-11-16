import * as core from "@actions/core";
import * as github from "@actions/github";
import {
  BuildTarget,
  Package,
  Snapshot,
  submitSnapshot,
} from "@github/dependency-submission-toolkit";
import { PackageURL } from "packageurl-js";
import { ActionWrapperService } from "./services/action-wrapper/action-wrapper.service";
import { DependencySubmissionInputModel } from "./models/dependency-submission-input.model";
import { InputValidatorService } from "./services/validator/input-validator.service";

try {
  const inputExtractorService: ActionWrapperService =
    new ActionWrapperService();
  const inputValidatorService: InputValidatorService =
    new InputValidatorService(inputExtractorService);
  const data: DependencySubmissionInputModel =
    inputValidatorService.getAndValidateInput();

  console.log(`The following input was provided: ${JSON.stringify(data)}`);

  const snapshot = new Snapshot({
    // TODO: fix configs here
    name: "Mvn project",
    url: "https://github.com/nexttechsec/log4j-unsecure", // TODO: fix configs here
    version: "0.0.1",
  });
  const buildTarget: BuildTarget = new BuildTarget("Project-Name"); // TODO: project name here
  buildTarget.addBuildDependency(
    new Package(
      new PackageURL(
        "maven",
        "org.apache.logging.log4j",
        "log4j-core",
        "2.14.1",
        null,
        null
      )
    )
  );
  snapshot.addManifest(buildTarget);
  submitSnapshot(snapshot)
    .then(() => console.log("Uploaded"))
    .catch(console.error);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed((error as any)?.message);
}
