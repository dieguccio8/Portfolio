const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://21st.dev/@theutkarshmail/components/3d-button", { waitUntil: 'networkidle0' });

  // Find the iframe
  const iframeElement = await page.$('iframe');
  if (iframeElement) {
    const frame = await iframeElement.contentFrame();
    if (frame) {
      const styles = await frame.evaluate(() => {
        const styleTags = Array.from(document.querySelectorAll('style')).map(s => s.innerText);
        return styleTags;
      });
      console.log("IFRAME STYLE TAGS:", styles.join("\n\n---\n\n"));
      
      const linkTags = await frame.evaluate(() => {
         return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
      });
      console.log("IFRAME LINK TAGS:", linkTags);
    }
  }
  await browser.close();
})();
