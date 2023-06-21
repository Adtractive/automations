const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    // Checkout Repository
    await exec.exec('actions/checkout@v2');

    // Setup Node.js
    await exec.exec('actions/setup-node@v2', { 'with': { 'node-version': '14' } });

    // Install Dependencies
    await exec.exec('npm', ['install']);

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