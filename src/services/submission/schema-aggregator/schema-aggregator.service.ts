import { DependencySubmissionInputModel } from "../../../models/dependency-submission-input.model";
import { Manifest, Snapshot } from "@github/dependency-submission-toolkit";
import { ParserFactoryService } from "../../parser/parser-factory.service";
import { ParserService } from "../../parser/parser.service";
import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";
import { MappingService } from "../mapping/mapping.service";

export class SchemaAggregatorService {
  constructor(
    private parserFactoryService: ParserFactoryService,
    private mappingService: MappingService
  ) {}

  /**
   * Aggregate the manifest files into a single snapshot object
   * @param projectName project name
   * @param projectUrl project url
   * @param projectVersion project version
   * @param dependencySubmissionModel instance of {@link DependencySubmissionInputModel}
   */
  aggregate(
    projectName: string,
    projectUrl: string,
    projectVersion: string,
    dependencySubmissionModel: DependencySubmissionInputModel
  ): Snapshot {
    const parserService: ParserService =
      this.parserFactoryService.getParserByCondition(
        dependencySubmissionModel.language,
        dependencySubmissionModel.dependencyManagement
      );

    const snapshot = new Snapshot({
      name: "generic-dependency-submission",
      url: "https://github.com/nexttechsec/generic-dependency-submission",
      version: "2.11", // TODO: do not hardcode the version
    });

    for (const manifestPath of dependencySubmissionModel.manifestFiles) {
      console.log(`[START] Parsing file ${manifestPath}`);
      const parserOutputModel: ParserOutputModel = parserService.parse({
        language: dependencySubmissionModel.language,
        dependencyManagement: dependencySubmissionModel.dependencyManagement,
        manifestPath,
      });
      console.log(`[END] Parsing file ${manifestPath} finished.`);

      console.log(`[START] Create manifest object for ${manifestPath}`);
      const manifest: Manifest =
        this.mappingService.createManifest(parserOutputModel);
      console.log(`[END] Create manifest object for ${manifestPath}`);
      snapshot.addManifest(manifest);
    }

    return snapshot;
  }
}
