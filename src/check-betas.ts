import fs from 'fs';

import updateBetas from './update-betas';

const { betasDir } = require('../package.json');

const checkBetas = (releases: string) => {
  if (fs.existsSync(betasDir)) {
    const files = fs
      .readdirSync(betasDir)
      .sort((prev, next) => (prev > next ? -1 : 1));

    fs.readFile(`${betasDir}/${files[0]}`, 'utf8', (err, oldReleases) => {
      if (oldReleases !== releases) updateBetas(releases, oldReleases);
    });
  } else {
    fs.mkdirSync(betasDir);

    updateBetas(releases);
  }
};

export default checkBetas;