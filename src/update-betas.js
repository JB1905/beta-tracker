const fs = require('fs');
const diff = require('diff');

const updateBetas = (oldReleases, releases) => {
  fs.writeFile(`./betas/${Date.now()}.txt`, releases, () => {
    const differences = diff
      .diffLines(oldReleases, releases)
      .filter(difference => difference.added)
      .map(difference => difference.value);

    console.log(differences.join(''));
  });
};

module.exports = updateBetas;
