import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('h2'));
    const italo = titles.find(h2 => h2.textContent.includes('Italo'));
    if(italo) {
        italo.click();
    }
  });
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({path: 'italo_screenshot.png'});
  const html = await page.content();
  if (html.includes('vite-error-overlay')) {
    console.log('VITE ERROR OVERLAY FOUND');
  } else {
    console.log("No error overlay");
  }
  await browser.close();
})();
