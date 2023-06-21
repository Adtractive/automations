const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    await exec.exec('npm install');

    let testOutput = '';
    const options = {};
    options.listeners = {
      stdout: (data) => {
        testOutput += data.toString();
      },
    };

    await exec.exec('npm run test -- --reporter junit --reporter-options "mochaFile=results.xml"', [], options);
    core.setOutput('results', testOutput);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();