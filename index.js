const fs = require('fs');
const puppeteer = require('puppeteer');
const diff = require('diff');
require('dotenv').config({ path: './.env' });

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.goto('https://developer.apple.com/news/releases');

  const releasesList = await page.evaluate(() => {
    const elements = Array.from(
      document.querySelectorAll('.article-content-container h2')
    );

    const releases = elements.map(element => element.innerHTML);

    return releases.join('\n');
  });

  const updateBetas = old => {
    fs.writeFile(`./betas/${Date.now()}.txt`, releasesList, () => {
      const differences = diff
        .diffLines(old, releasesList)
        .filter(difference => difference.added)
        .map(difference => difference.value);

      console.log(differences.join(''));
    });
  };

  const checkBetas = () => {
    const files = fs.readdirSync('./betas').sort((prev, next) => {
      return prev > next ? -1 : 1;
    });

    fs.readFile(`./betas/${files[0]}`, 'utf8', (err, data) => {
      if (data !== releasesList) {
        updateBetas(data);
      }
    });
  };

  checkBetas();

  await browser.close();
})();
