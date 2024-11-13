import { remote } from 'webdriverio';
import { startup } from './startup.js';
import { fingerprint } from './util/fingerprint.js';

process.env.ANDROID_HOME = '/Users/mikitinski/Library/Android/sdk'

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Medium Phone API 35',
  'appium:chromedriverAutodownload': true,
  'appium:chromedriverExecutable': '/path/to/your/chromedriver' // specify your chromedriver path
  // 'appium:appPackage': 'com.android.settings.apps.chrome',
  // 'appium:appActivity': 'com.google.android.apps.chrome.Main',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

/**
 * @param {import('webdriverio').Browser} driver
 * @return {Promise<void>}
 */
async function skipChromeSuggestions(driver) {
  const gotItButton = await driver.$('//*[@text="Got it"]');
  await gotItButton.click().catch(console.warn);
}

async function runTest() {
   // launch emulator with proxy
  wdOpts.capabilities['appium:deviceName'] = await startup('http://PjMFia4S:dmUhxdTX@45.192.47.92:64520');
  const driver = await remote(wdOpts); // connect to emulator
  await driver.activateApp('com.android.chrome'); // launch chrome app

  await new Promise(resolve => setTimeout(resolve, 5000));

  const contexts = await driver.getContexts(); // List all contexts
  await driver.switchContext(contexts.find(ctx => ctx.includes('WEBVIEW')));

  await driver.url('https://youtube.com');
  await driver.execute(fingerprint.replaceWebGLInfoScript('ads', 'asd'));
  // await driver.activateApp('com.android.chrome'); // launch chrome app
  // await skipChromeSuggestions(driver);

  // try {
  //   const batteryItem = await driver.$('//*[@text="Battery"]');
  //   await batteryItem.click();
  // } finally {
  //   await driver.pause(1000);
  //   await driver.deleteSession();
  // }
}

runTest().catch(console.error);