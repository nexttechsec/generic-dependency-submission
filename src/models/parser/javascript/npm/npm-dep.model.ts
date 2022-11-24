export interface NpmPackage {
  name: string;
  version: string;
  dependencies: Dependencies;
}

export interface Dependency {
  version: string;
  dependencies?: Dependencies;
}

export interface Dependencies {
  [name: string]: Dependency;
}
