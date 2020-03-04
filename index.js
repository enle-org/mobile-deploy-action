const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  const TEST_GROUP	 = core.getInput('test_group');
  const EXPO_USERNAME	 = core.getInput('expo_username');
  const EXPO_PASSWORD	 = core.getInput('expo_password');
  const FIREBASE_TOKEN	 = core.getInput('firebase_token');
  const FIREBASE_ANDROID_APP_ID	 = core.getInput('firebase_android_app_id');

  exec.exec(`yarn`)
    .then(() => exec.exec(`yarn global add expo-cli`))
    .then(() => exec.exec(`yarn global add firebase-tools`))
    .then(() => exec.exec(`yarn run expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}`))
    // .then(() => exec.exec(`yarn build:android`))
    .then(() => exec.exec(`tail -n 1 output.txt`))
    .then(res => {
      console.log("res", res)
      exec.exec(`head -n 1`)
    })
    // .then(() => exec.exec(`tail -n 1 output.txt | head -n 1 | cut -c47- | xargs wget -O build.apk`))
    .then(() => exec.exec(`firebase appdistribution:distribute ./build.apk --app ${FIREBASE_ANDROID_APP_ID} --groups ${TEST_GROUP} --token ${FIREBASE_TOKEN}`))
    .catch(e => core.setFailed(e));
    
} catch (error) {
  core.setFailed(error.message);
}
