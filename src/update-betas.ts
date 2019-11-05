import fs from 'fs';
import * as diff from 'diff';
import Nexmo from 'nexmo';

const { betasDir } = require('../package.json');

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY_PATH
});

const updateBetas = (releases: string, oldReleases = '') => {
  fs.writeFile(`${betasDir}/${Date.now()}.txt`, releases, () => {
    const differences = diff
      .diffLines(oldReleases, releases)
      .filter(difference => difference.added)
      .map(difference => difference.value);

    nexmo.message.sendSms(
      process.env.PHONE_FROM,
      process.env.PHONE_TO,
      differences.join(''),
      { type: 'unicode' },
      (err: Error, data: any) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(data);
        }
      }
    );
  });
};

export default updateBetas;
