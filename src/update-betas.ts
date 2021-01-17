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

const findDifferencesBetweenOldAndNew = (
  oldReleases: string,
  releases: string
) => {
  return diff
    .diffLines(oldReleases, releases)
    .filter((difference) => difference.added)
    .map((difference) => difference.value);
};

const notifyUserByMessage = (messages: string[]) => {
  nexmo.message.sendSms(
    process.env.FROM_NUMBER!,
    process.env.TO_NUMBER!,
    messages.join(''),
    { type: 'unicode' },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(data);
      }
    }
  );
};

const updateBetas = (releases: string, oldReleases = '') => {
  const newStampPath = `${betasDir}/${Date.now()}.txt`;

  fs.writeFile(newStampPath, releases, () => {
    const differences = findDifferencesBetweenOldAndNew(oldReleases, releases);

    notifyUserByMessage(differences);
  });
};

export default updateBetas;
