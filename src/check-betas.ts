import fs from 'fs';
import chalk from 'chalk';

import updateBetas from './update-betas';

const { betasDir } = require('../package.json');

const sortItems = (items: string[]) => {
  return items.sort((prev, next) => (prev > next ? -1 : 1));
};

const getPrevBetaStamps = () => fs.readdirSync(betasDir);

const checkBetas = (releases: string) => {
  const isPreviousBetasExist = fs.existsSync(betasDir);

  if (isPreviousBetasExist) {
    const [latestBetaStampFile] = sortItems(getPrevBetaStamps());

    const latestBetaStampUrl = `${betasDir}/${latestBetaStampFile}`;

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
