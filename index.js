const core = require('@actions/core');
const exec = require('@actions/exec');

try {
  const ENVIRONMENT = core.getInput('environment');
  const CLOUDINARY_CLOUDNAME = core.getInput('cloudinary_cloudname');
  const CLOUDINARY_URL = core.getInput('cloudinary_url');
  const CLOUDINARY_API_KEY = core.getInput('cloudinary_api_key');
  const CLOUDINARY_API_SECRET = core.getInput('cloudinary_api_secret');
  const CLOUDINARY_API_URL = core.getInput('cloudinary_api_url');
  const CLOUDINARY_API_URL_STRING = core.getInput('cloudinary_api_url_string');

  const SENTRY_DSN = core.getInput('sentry_dsn');
  const SENTRY_ORGANIZATION = core.getInput('sentry_organization');
  const SENTRY_PROJECT = core.getInput('sentry_project');
  const SENTRY_AUTHTOKEN = core.getInput('sentry_authtoken');

  const TEST_USER_EMAIL = core.getInput('test_user_email');
  const TEST_USER_PASSWORD = core.getInput('test_user_password');

  const LOCAL_API_URL = core.getInput('local_api_url');
  const DEV_API_URL = core.getInput('dev_api_url');
  const STAGING_API_URL = core.getInput('staging_api_url');
  const PROD_API_URL = core.getInput('prod_api_url');

  const TEST_GROUP = core.getInput('test_group');
  const EXPO_USERNAME = core.getInput('expo_username');
  const EXPO_PASSWORD = core.getInput('expo_password');
  const FIREBASE_TOKEN = core.getInput('firebase_token');
  const FIREBASE_ANDROID_APP_ID = core.getInput('firebase_android_app_id');

  const APPLE_ID_EMAIL = core.getInput('apple_id_email');
  const APPLE_ID_PASSWORD = core.getInput('apple_id_password');
  const FIREBASE_IOS_APP_ID = core.getInput('firebase_ios_app_id');

  const ANDROID_KEYSTORE_PASSWORD = core.getInput('android_keystore_password');

  const MATCH_GITHUB_USERNAME = core.getInput('match_github_username');
  const MATCH_GITHUB_PASSWORD = core.getInput('match_github_password');

  exec.exec('yarn global add expo-cli')
    .then(() => exec.exec('yarn global add firebase-tools'))
    .then(() => exec.exec(`yarn run expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}`))
    .then(() => exec.exec('chmod +x ./deploy-scripts/create-files.sh'))
    .then(() => exec.exec(`./deploy-scripts/create-files.sh ${ENVIRONMENT} ${CLOUDINARY_CLOUDNAME} ${CLOUDINARY_URL} ${CLOUDINARY_API_KEY} ${CLOUDINARY_API_SECRET} ${CLOUDINARY_API_URL} ${CLOUDINARY_API_URL_STRING} ${SENTRY_DSN} ${SENTRY_ORGANIZATION} ${SENTRY_PROJECT} ${SENTRY_AUTHTOKEN} ${TEST_USER_EMAIL} ${TEST_USER_PASSWORD} ${LOCAL_API_URL} ${DEV_API_URL} ${STAGING_API_URL} ${PROD_API_URL} ${MATCH_GITHUB_USERNAME} ${MATCH_GITHUB_PASSWORD}`))
    .then(() => exec.exec('yarn run expo p'))
    .then(() => exec.exec('chmod +x ./deploy-scripts/deploy.android.sh'))
    .then(() => exec.exec(`./deploy-scripts/deploy.android.sh ${ENVIRONMENT} ${CLOUDINARY_CLOUDNAME} ${CLOUDINARY_URL} ${CLOUDINARY_API_KEY} ${CLOUDINARY_API_SECRET} ${CLOUDINARY_API_URL} ${CLOUDINARY_API_URL_STRING} ${SENTRY_DSN} ${SENTRY_ORGANIZATION} ${SENTRY_PROJECT} ${SENTRY_AUTHTOKEN} ${TEST_USER_EMAIL} ${TEST_USER_PASSWORD} ${LOCAL_API_URL} ${DEV_API_URL} ${STAGING_API_URL} ${PROD_API_URL} ${ANDROID_KEYSTORE_PASSWORD}`))
    .then(() => exec.exec(`firebase appdistribution:distribute ./android/app/build/outputs/apk/release/app-release.apk --app ${FIREBASE_ANDROID_APP_ID} --groups ${TEST_GROUP} --token ${FIREBASE_TOKEN}`))
    // .then(() => exec.exec('chmod +x ./deploy-scripts/deploy.ios.sh'))
    // .then(() => exec.exec(`./deploy-scripts/deploy.ios.sh ${ENVIRONMENT} ${CLOUDINARY_CLOUDNAME} ${CLOUDINARY_URL} ${CLOUDINARY_API_KEY} ${CLOUDINARY_API_SECRET} ${CLOUDINARY_API_URL} ${CLOUDINARY_API_URL_STRING} ${SENTRY_DSN} ${SENTRY_ORGANIZATION} ${SENTRY_PROJECT} ${SENTRY_AUTHTOKEN} ${TEST_USER_EMAIL} ${TEST_USER_PASSWORD} ${LOCAL_API_URL} ${DEV_API_URL} ${STAGING_API_URL} ${PROD_API_URL} ${APPLE_ID_EMAIL} ${APPLE_ID_PASSWORD}`))
    .catch(e => {
      console.log('error', e);
      core.setFailed(e);
    });
    
} catch (error) {
  core.setFailed(error.message);
}
