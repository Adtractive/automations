const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');

async function run() {
  try {
    // Run Cypress Tests
    const execOptions = { listeners: { stdout: (data) => console.log(data.toString()) } };
    await exec.exec('npm', ['run', 'test', '--', '--reporter', 'junit', '--reporter-options', 'mochaFile=results.xml'], execOptions);

    // Read and set the test results as an output
    const results = await fs.promises.readFile('results.xml', 'utf-8');
    core.setOutput('results', results);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
