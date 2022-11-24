// TODO: to be removed
import {
  AvailableDependencyManagementEnum,
  AvailableLanguageEnum,
} from "./models/dependency-submission-input.model";
import { SchemaAggregatorService } from "./services/submission/schema-aggregator/schema-aggregator.service";
import { ParserFactoryService } from "./services/parser/parser-factory.service";
import { MappingService } from "./services/submission/mapping/mapping.service";

// const parser = new XMLParser({ ignoreAttributes: false });
// const result = parser.parse(
//   fs.readFileSync(
//     "/Users/stefan/office/projects/github/generic-dependency-submission/tests/helpers/input/java/mvn/dependency.graphml"
//   )
// );
//
// const graphObject = result.graphml.graph;
// const nodes = graphObject.node;
// const edges = graphObject.edge;
//
// const nodesDict: { [key: string]: string } = {};
// for (const info of nodes) {
//   nodesDict[info?.["@_id"]] = info?.data?.["y:ShapeNode"]?.["y:NodeLabel"];
// }
//
// const rootNodeId =
//   Object.keys(nodesDict).find((key: string) => {
//     return edges.every((info: any) => !info["@_target"]?.includes(key));
//   }) ?? "";
//
// const edgesByNodeId: { [key: string]: string[] } = {};
// for (const info of edges) {
//   const targetId = info["@_source"];
//
//   if (!edgesByNodeId[targetId]) {
//     edgesByNodeId[targetId] = [];
//   }
//
//   edgesByNodeId[targetId].push(info["@_target"]);
// }
//
// const utility = (
//   edgesByNodeId: { [key: string]: string[] },
//   current: TreeNode<string, string>,
//   parent: TreeNode<string, string> | null
// ) => {
//   const tree = new TreeModel(current.id, current.data);
//   const children = edgesByNodeId[current.id] ?? [];
//
//   for (const childId of children) {
//     // every child
//     const newNode: TreeNode<string, string> = new TreeNode<string, string>(
//       childId,
//       nodesDict[childId]
//     );
//
//     if (parent == null) {
//       tree.addNode(newNode, current.id);
//     } else {
//       parent.addChild(newNode);
//     }
//
//     utility(
//       edgesByNodeId,
//       new TreeNode<string, string>(childId, nodesDict[childId]),
//       newNode
//     );
//   }
//
//   return tree;
// };

// const createdTree = utility(
//   edgesByNodeId,
//   new TreeNode<string, string>(rootNodeId, nodesDict[rootNodeId]),
//   null
// );
// createdTree.printTree();

// const nodesArray = nodes.map((info: any) => {
//   return {
//     'id': info?.['@_id'],
//     'label': info?.data?.['y:ShapeNode']?.['y:NodeLabel']
//   };
// });

// const processedNodes = nodesArray.map((info: any) => {
//   return {
//     source: info['@_source'],
//     target: info['@_target']
//   };
// });

// console.log(JSON.stringify(processedNodes))

// const parserFactory: ParserFactoryService = new ParserFactoryService();
// const mappingService: MappingService = new MappingService();
// const schemaAggregator: SchemaAggregatorService = new SchemaAggregatorService(
//     parserFactory,
//     mappingService
// );
//
// console.log(
//     schemaAggregator
//         .aggregate(
//             "Mvn project",
//             "https://github.com/nexttechsec/log4j-unsecure",
//             "0.0.1",
//             {
//                 language: AvailableLanguageEnum.JAVA,
//                 dependencyManagement: AvailableDependencyManagementEnum.MAVEN,
//                 manifestFiles: [
//                     "/Users/stefan/office/projects/github/generic-dependency-submission/tests/helpers/input/java/mvn/dependency.graphml",
//                 ],
//             }
//         )
//         .prettyJSON()
// );

// try {
//   const inputExtractorService: ActionWrapperService =
//     new ActionWrapperService();
//   const inputValidatorService: InputValidatorService =
//     new InputValidatorService(inputExtractorService);
//   const data: DependencySubmissionInputModel =
//     inputValidatorService.getAndValidateInput();
//
//   console.log(`The following input was provided: ${JSON.stringify(data)}`);
//
//   const snapshot = new Snapshot({
//     // TODO: fix configs here
//     name: "Mvn project",
//     url: "https://github.com/nexttechsec/log4j-unsecure", // TODO: fix configs here
//     version: "0.0.1",
//   });
//   const buildTarget: BuildTarget = new BuildTarget("Project-Name"); // TODO: project name here
//   buildTarget.addBuildDependency(
//     new Package(
//       new PackageURL(
//         "maven",
//         "org.apache.logging.log4j",
//         "log4j-core",
//         "2.14.1",
//         null,
//         null
//       )
//     ),
//
//   );

// const manifest = new Manifest("Project-Name", "some-path");
// manifest.addDirectDependency()

//   snapshot.addManifest(buildTarget);
//   submitSnapshot(snapshot)
//     .then(() => console.log("Uploaded"))
//     .catch(console.error);
//
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2);
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed((error as any)?.message);
// }
