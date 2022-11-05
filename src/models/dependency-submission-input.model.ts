export enum AvailableLanguageEnum {
    JAVA = 'java',
    JAVASCRIPT = 'javascript',
    PYTHON = 'python'
}

export enum AvailableDependencyManagementToolsEnum {
    GRADLE = 'gradle',
    MAVEN = 'maven',
    PIP = 'pip',
    POETRY = 'poetry'
}

export interface DependencySubmissionInputModel {
    language: AvailableLanguageEnum;
    dependencyManagement: AvailableDependencyManagementToolsEnum;
    manifestFiles: string[];
}
