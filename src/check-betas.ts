import fs from 'fs';
import chalk from 'chalk';

import updateBetas from './update-betas';

const { betasDir } = require('../package.json');

const getPrevBetaStamps = () => fs.readdirSync(betasDir);

const sortItems = (items: string[]) => {
  return items.sort((prev, next) => (prev > next ? -1 : 1));
};

const checkBetas = (releases: string) => {
  const isPreviousBetasExists = fs.existsSync(betasDir);

  if (isPreviousBetasExists) {
    const betaStampFiles = sortItems(getPrevBetaStamps());

    const latestBetaStampUrl = `${betasDir}/${betaStampFiles[0]}`;

    fs.readFile(latestBetaStampUrl, 'utf8', (err, oldReleases) => {
      if (err) throw err;

      if (releases !== oldReleases) {
        updateBetas(releases, oldReleases);
      } else {
        console.log(chalk.green('No new beta releases found 🤗'));
      }
    });
  } else {
    fs.mkdirSync(betasDir);

    updateBetas(releases);
  }
};

export default checkBetas;
