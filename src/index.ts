import puppeteer from 'puppeteer';
import striptags from 'striptags';
import { config } from 'dotenv';

import checkBetas from './check-betas';

config();

const FEED_URL = 'https://developer.apple.com/news/releases';

const getReleaseTitles = () => {
  const elements = Array.from(
    document.querySelectorAll('.article-content-container h2')
  );

  return elements.map((element) => element.innerHTML).join('\n');
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(FEED_URL);

  const releases = await page.evaluate(getReleaseTitles);

  checkBetas(striptags(releases));

  await browser.close();
})();
