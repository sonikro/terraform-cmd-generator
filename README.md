terraform-cmd-generator
=======================

Generate commands based on Terraform Resources

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/terraform-cmd-generator.svg)](https://npmjs.org/package/terraform-cmd-generator)
[![Downloads/week](https://img.shields.io/npm/dw/terraform-cmd-generator.svg)](https://npmjs.org/package/terraform-cmd-generator)
[![License](https://img.shields.io/npm/l/terraform-cmd-generator.svg)](https://github.com/sonikro/terraform-cmd-generator/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Example](#example)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g terraform-cmd-generator

$ tfgenerate -f <yaml_file_with_resources>
running command...
$ tfgenerate --help
USAGE
Generate any commands, based on Terraform Resources

USAGE
  $ tfgenerate

OPTIONS
  -f, --resourcesFile=resourcesFile  (required) YAML File with all the Resources
  -h, --help                         show CLI help
  -v, --version                      show CLI version
...
```
<!-- usagestop -->
# Example
<!-- example -->
For example, let's say you need to generate terraform import commands, based on a list of resources. You can do something like this

existing-resources.yaml
```yaml
command_line: "sh(script: \"terraform import ${TF_RESOURCE_TYPE}.${TF_RESOURCE_NAME} ${TF_RESOURCE_ID}\")"
resources:
    - aws_sqs_queue:
          some_queue: "awsqueueid"
          some_other_queue: "someotherqueueid"
    - aws_dynamodb_table:
          table1: "idoftable1"
          table2: "idoftable2"
```
When running 
```bash
tfgenerate -f existing-resources.yaml
```
The output should be
```groovy
sh(script: "terraform import aws_sqs_queue.some_queue awsqueueid")
sh(script: "terraform import aws_sqs_queue.some_other_queue someotherqueueid")
sh(script: "terraform import aws_dynamodb_table.table1 idoftable1")
sh(script: "terraform import aws_dynamodb_table.table2 idoftable2")
```
<!-- examplestop -->
