export interface DependencyMetadataByEdgeId<T> {
  [key: string]: T;
}

export interface SourceEdgeToTargetEdges {
  [key: string]: string[];
}
