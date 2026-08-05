const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating...');
  await page.goto('https://21st.dev/community/ascii?preview=%2Fcommunity%2Fascii%2Fsa7bi-2a4878ca-13d3-4621-af92-6310621cbd40', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'test_export_1.png' });

  // Find all buttons and click them one by one until "Export video" appears in DOM
  const result = await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const btns = Array.from(document.querySelectorAll('button'));
    
    for (const btn of btns) {
      try {
        btn.click();
        await sleep(500);
        
        const items = Array.from(document.querySelectorAll('*'));
        const exportItem = items.find(i => i.textContent && i.textContent === 'Export video');
        if (exportItem) {
          exportItem.click();
          return true;
        }
      } catch (e) {}
    }
    return false;
  });

  console.log('Found and clicked Export video?', result);

  if (result) {
    console.log('Waiting 10s for download...');
    await new Promise(r => setTimeout(r, 10000));
  }

  await page.screenshot({ path: 'test_export_2.png' });
  await browser.close();
})();
