import { Manifest, Snapshot } from "@github/dependency-submission-toolkit";
import { ParserFactoryService } from "../../parser/parser-factory.service";
import { ParserService } from "../../parser/parser.service";
import { ParserOutputModel } from "../../../models/parser/output/parser-output.model";
import { MappingService } from "../mapping/mapping.service";
import { LIB_VERSION } from "../../../commons/util/version-util";
import { DependencySubmissionInputModel } from "../../../models/dependency-submission/dependency-submission-input.model";

export class SchemaAggregatorService {
  private readonly PROJECT_NAME = "generic-dependency-submission";
  private readonly PROJECT_URL =
    "https://github.com/nexttechsec/generic-dependency-submission";

  constructor(
    private parserFactoryService: ParserFactoryService,
    private mappingService: MappingService
  ) {}

  /**
   * Aggregate the manifest files into a single snapshot object
   * @param dependencySubmissionModel instance of {@link DependencySubmissionInputModel}
   */
  aggregate(
    dependencySubmissionModel: DependencySubmissionInputModel
  ): Snapshot {
    const parserService: ParserService =
      this.parserFactoryService.getParserByCondition(
        dependencySubmissionModel.language,
        dependencySubmissionModel.dependencyManagement
      );

    const snapshot = new Snapshot({
      name: this.PROJECT_NAME,
      url: this.PROJECT_URL,
      version: LIB_VERSION,
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
