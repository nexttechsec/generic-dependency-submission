import { ActionWrapperService } from "./services/action-wrapper/action-wrapper.service";
import { InputValidatorService } from "./services/validator/input-validator.service";
import {
  Snapshot,
  submitSnapshot,
} from "@github/dependency-submission-toolkit";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { ParserFactoryService } from "./services/parser/parser-factory.service";
import { MappingService } from "./services/submission/mapping/mapping.service";
import { SchemaAggregatorService } from "./services/submission/schema-aggregator/schema-aggregator.service";
import { DependencySubmissionInputModel } from "./models/dependency-submission/dependency-submission-input.model";

try {
  const inputExtractorService: ActionWrapperService =
    new ActionWrapperService();
  const inputValidatorService: InputValidatorService =
    new InputValidatorService(inputExtractorService);

  // validate data
  console.log("[START] Validate input data");
  const data: DependencySubmissionInputModel =
    inputValidatorService.getAndValidateInput();
  console.log(
    `[END] Validate input data. Starting processing for: ${JSON.stringify(
      data
    )}`
  );

  const parserFactory: ParserFactoryService = new ParserFactoryService(
    inputExtractorService
  );
  const mappingService: MappingService = new MappingService();
  const schemaAggregator: SchemaAggregatorService = new SchemaAggregatorService(
    parserFactory,
    mappingService
  );

  const snapshot: Snapshot = schemaAggregator.aggregate(data);
  submitSnapshot(snapshot)
    .then(() => console.log("Successfully uploaded"))
    .catch(console.error);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed((error as any)?.message);
}
