const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating...');
  await page.goto('https://21st.dev/community/ascii/uss-fda8ff9f-a8f6-439d-8557-f1490c2306e6', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({ path: '/Users/ericadibella/.gemini/antigravity-ide/brain/49ccd3c8-ff9c-4890-b5b0-cb94a7cdd127/user_ascii_preview.png' });
  console.log('Screenshot saved!');

  await browser.close();
})();
