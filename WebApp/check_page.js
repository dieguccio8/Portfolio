import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    // Navigate to Chronos (Italo) page by clicking the menu or setting state
    // Let's just dump the inner text to see if there is a React error overlay
  });
  const html = await page.content();
  if (html.includes('vite-error-overlay')) {
    console.log('VITE ERROR OVERLAY FOUND');
  }
  await browser.close();
})();
