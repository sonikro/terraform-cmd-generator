import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('terraform-cmd-generator', () => {
  test
  .stdout()
  .do(() => cmd.run(['-f', 'test-resources.yaml']))
  .it('generates corresponding commands', ctx => {
    expect(ctx.stdout).to.contain('sh(script: "terraform import aws_sqs_queue.some_queue awsqueueid")')
    expect(ctx.stdout).to.contain('sh(script: "terraform import aws_sqs_queue.some_other_queue someotherqueueid")')
    expect(ctx.stdout).to.contain('sh(script: "terraform import aws_dynamodb_table.table1 idoftable1")')
    expect(ctx.stdout).to.contain('sh(script: "terraform import aws_dynamodb_table.table2 idoftable2")')
  })
})
