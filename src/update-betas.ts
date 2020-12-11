import fs from 'fs';
import * as diff from 'diff';
import { config } from 'dotenv';
import Nexmo from 'nexmo';

const { betasDir } = require('../package.json');

config();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY!,
  apiSecret: process.env.NEXMO_API_SECRET!,
});

const updateBetas = (releases: string, oldReleases = '') => {
  fs.writeFile(`${betasDir}/${Date.now()}.txt`, releases, () => {
    const differences = diff
      .diffLines(oldReleases, releases)
      .filter((difference) => difference.added)
      .map((difference) => difference.value);

    nexmo.message.sendSms(
      process.env.FROM_NUMBER!,
      process.env.TO_NUMBER!,
      differences.join(''),
      { type: 'unicode' },
      (err, data) => {
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
