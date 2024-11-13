import { exec } from 'child_process';

/**
 * @param {string} command -- command to execute
 * @param {number|boolean=} timeout -- if number provided will not wait until output finish
 * @return {Promise<unknown>}
 */
export const shell = (command, timeout = false) => new Promise((resolve, reject) => {
  command = 'source ~/.bash_profile && ' + command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("ERROR: ", error);
      console.error("stderr: ", stderr);
      error.message += stderr || '';
      reject(error);
    }
    if (stdout) {
      resolve(stdout);
    }
    resolve();
  });
  if (!!timeout && typeof timeout === 'number') {
    setTimeout(resolve, timeout);
  }
});