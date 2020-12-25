import fs from 'fs';
import * as diff from 'diff';
import Nexmo from 'nexmo';

const { betasDir } = require('../package.json');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY!,
  apiSecret: process.env.NEXMO_API_SECRET!,
});

const findDifferencesBetweenOldAndNew = (oldReleases, releases) => {
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
  fs.writeFile(`${betasDir}/${Date.now()}.txt`, releases, () => {
    const differences = findDifferencesBetweenOldAndNew(oldReleases, releases);

    notifyUserByMessage(differences);
  });
};

export default updateBetas;
