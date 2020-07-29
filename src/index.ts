/* eslint-disable no-template-curly-in-string */
import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs'
import {parse} from 'yaml'
class TerraformCmdGenerator extends Command {
  static description = 'Generate any commands, based on Terraform Resources'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    resourcesFile: flags.string({char: 'f', description: 'YAML File with all the Resources', required: true}),
  }

  async run() {
    const {flags} = this.parse(TerraformCmdGenerator)
    const yamlFile = readFileSync(flags.resourcesFile, 'utf8')
    const yamlContent = parse(yamlFile) as YamlFile
    yamlContent.resources.forEach(tfResource => {
      const resourceTypes = Object.keys(tfResource)
      resourceTypes.forEach(resourceType => {
        const resourceNames = Object.keys(tfResource[resourceType])
        resourceNames.forEach(resourceName => {
          const resourceId = tfResource[resourceType][resourceName]
          const commandLine = yamlContent.command_line
          .replace('${TF_RESOURCE_TYPE}', resourceType)
          .replace('${TF_RESOURCE_NAME}', resourceName)
          .replace('${TF_RESOURCE_ID}', resourceId)
          this.log(commandLine)
        })
      })
    })
  }
}

interface YamlFile {
  command_line: string;
  resources: Resource[];
}

interface Resource {
  [key: string]: Record<string, string>;
}

export = TerraformCmdGenerator
