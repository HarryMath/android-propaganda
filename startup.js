import { shell } from './util/shell.js';

export const startup = async (proxy) => {
  const availableDevices = await shell('emulator -list-avds');
  console.log('availableDevices', availableDevices);
  const deviceName = availableDevices.split('\n').filter(Boolean).pop()?.trim();
  if (!deviceName) {
    throw new Error('No available device');
  }

  console.log('device is ' + deviceName);

  // await shell(`emulator -avg ${deviceName} -http-proxy ${proxy}`);
  const options = {
    'http-proxy': proxy,
    // 'gpu': 'guest', // for great lags)
  }

  const args = [
    // 'netfast', // disable network shaping
    // 'no-boot-anim' // disable animation for faster boot
  ];

  let launchCommand = `emulator -avd ${deviceName}`;
  for (const key in options) {
    launchCommand += ` -${key} ${options[key]}`;
  }

  for (const arg of args) {
    launchCommand += ` -${arg}`
  }

  console.log(launchCommand);

  await shell(launchCommand, 20_000); // launch android device
  await shell('appium', 1000); // start appium

  return deviceName;
}
