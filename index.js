const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {

  const EXPO_USERNAME	 = core.getInput('expo_username');
  const EXPO_PASSWORD	 = core.getInput('expo_password');

  exec.exec('yarn')
    .then(() => exec.exec(`yarn run expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}`))
    .then(() => exec.exec(`yarn build:android`))
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}