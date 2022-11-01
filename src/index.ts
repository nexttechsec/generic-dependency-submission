import * as core from '@actions/core'
import * as github from '@actions/github'
import {EnumUtil} from "./commons/util/enum-util";
import {AvailableLanguageEnum} from "./models/parser-input.model";

try {
    // const language = core.getInput('language');
    // console.log(`Used language: ${language}!`);
    //
    // const dependencyManagementTool = core.getInput('dependency-management');
    // console.log(`Dependency Management tool: ${dependencyManagementTool}!`);
    //
    // const manifestFiles = core.getInput('manifest-files');
    // console.log(`Manifest files: ${manifestFiles}!`);
    //
    // console.log(`The following input was provided: ${language}|${dependencyManagementTool}|${manifestFiles}`);
    //
    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed((error as any)?.message);
}
