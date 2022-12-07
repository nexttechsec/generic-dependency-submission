export interface PipTreeOutputModel {
  package: PipTreePackage;
  dependencies?: PipTreePackage[];
}

export interface PipTreePackage {
  key: string;
  package_name: string;
  installed_version: string;
  required_version?: string;
}
