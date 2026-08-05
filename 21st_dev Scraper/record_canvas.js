const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating to user effect...');
  await page.goto('https://21st.dev/community/ascii/uss-fda8ff9f-a8f6-439d-8557-f1490c2306e6', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));
  
  // Log the tag names of elements to see if there is a canvas
  const tags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .map(el => el.tagName.toLowerCase())
      .filter(tag => ['canvas', 'video', 'iframe'].includes(tag));
  });
  
  console.log('Media elements found:', tags);

  await browser.close();
})();
