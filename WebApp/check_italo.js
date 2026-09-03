import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Find Italo treni image or text to click
  await page.evaluate(() => {
    // The menu has images or text for projects. 
    // Let's click the first thing that contains "Italo"
    const els = Array.from(document.querySelectorAll('div, span, img, h1, h2, h3'));
    const italo = els.find(el => el.textContent && el.textContent.includes('Italo') && el.textContent.length < 20);
    if(italo) {
        italo.click();
    } else {
        console.log("Not found italo text, trying to find chronos in data-id or something");
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
