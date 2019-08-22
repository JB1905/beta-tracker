const fs = require('fs');
const diff = require('diff');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY_PATH
});

const updateBetas = (oldReleases, releases) => {
  fs.writeFile(`./betas/${Date.now()}.txt`, releases, () => {
    const differences = diff
      .diffLines(oldReleases, releases)
      .filter(difference => difference.added)
      .map(difference => difference.value);

    nexmo.message.sendSms(
      process.env.PHONE_FROM,
      process.env.PHONE_TO,
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

module.exports = updateBetas;
