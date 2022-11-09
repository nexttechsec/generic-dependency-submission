import * as core from '@actions/core'
import * as github from '@actions/github'
import { BuildTarget, Package, Snapshot, submitSnapshot } from '@github/dependency-submission-toolkit'
import { PackageURL } from 'packageurl-js'

try {
  const language = core.getInput('language')
  console.log(`Used language: ${language}!`)

  const dependencyManagementTool = core.getInput('dependency-management')
  console.log(`Dependency Management tool: ${dependencyManagementTool}!`)

  const manifestFiles = core.getInput('manifest-files')
  console.log(`Manifest files: ${manifestFiles}!`)

  console.log(`The following input was provided: ${language}|${dependencyManagementTool}|${manifestFiles}`)

  const snapshot = new Snapshot({ // TODO: fix configs here
    name: 'Mvn project',
    url: github.context.repo.repo,
    version: '0.0.1'
  })
  const buildTarget: BuildTarget = new BuildTarget('Project-Name') // TODO: project name here
  buildTarget.addBuildDependency(
    new Package(
      new PackageURL(
        'maven',
        'org.apache.logging.log4j',
        'log4j-core',
        '2.14.1',
        null,
        null
      )
    )
  );
  snapshot.addManifest(buildTarget)
  submitSnapshot(snapshot)
    .then(() => console.log('Uploaded'))
    .catch(console.error)

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  core.setFailed((error as any)?.message)
}
