import puppeteer from 'puppeteer';
import { config } from 'dotenv';
import striptags from 'striptags';

import checkBetas from './check-betas';

const FEED_URL = 'https://developer.apple.com/news/releases';

config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(FEED_URL);

  const releases = await page.evaluate(() => {
    const elements = Array.from(
      document.querySelectorAll('.article-content-container h2')
    );

    return elements.map((element) => element.innerHTML).join('\n');
  });

  checkBetas(striptags(releases));

  await browser.close();
})();
