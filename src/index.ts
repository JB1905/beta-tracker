import puppeteer from 'puppeteer';
import { config } from 'dotenv';

import checkBetas from './check-betas';

config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto('https://developer.apple.com/news/releases');

  const releases = await page.evaluate(() => {
    const elements = Array.from(
      document.querySelectorAll('.article-content-container h2')
    );

    return elements.map((element) => element.innerHTML).join('\n');
  });

  checkBetas(releases);

  await browser.close();
})();
