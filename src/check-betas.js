const fs = require('fs');

const updateBetas = require('./update-betas');

const checkBetas = releases => {
  const files = fs
    .readdirSync('./betas')
    .sort((prev, next) => (prev > next ? -1 : 1));

  fs.readFile(`./betas/${files[0]}`, 'utf8', (err, oldReleases) => {
    if (oldReleases !== releases) {
      updateBetas(oldReleases, releases);
    }
  });
};

module.exports = checkBetas;
