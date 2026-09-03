import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Click on "Italo" project link
  await page.evaluate(() => {
    // find the button that contains "Italo"
    const elements = Array.from(document.querySelectorAll('*'));
    const italoBtn = elements.find(el => el.textContent && el.textContent.includes('Italo') && el.textContent.includes('Treni') && el.tagName === 'SPAN');
    if (italoBtn) {
       italoBtn.click();
    } else {
       console.log("Could not find Italo button");
    }
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.content();
  if (html.includes('vite-error-overlay')) {
    console.log('VITE ERROR OVERLAY FOUND');
  }
  await browser.close();
})();
