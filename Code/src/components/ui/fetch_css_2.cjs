const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://21st.dev/@minhxthanh/components/moving-dot-card', { waitUntil: 'networkidle2' });
  const html = await page.content();
  const cssMatch = html.match(/(?:\\*")compiled(?:_c|C)ss(?:\\*")\s*:\s*(?:\\*")(https:\/\/cdn\.21st\.dev\/[^"\\]+\.css)(?:\\*")/);
  if (cssMatch) {
    const res = await fetch(cssMatch[1]);
    const css = await res.text();
    fs.writeFileSync('moving-dot-card.css', css);
    console.log('CSS saved to moving-dot-card.css');
  } else {
    const cssLiteralMatch = html.match(/(?:\\*")css(?:\\*")\s*:\s*(?:\\*")((?:[^"\\]|\\.)*)(?:\\*")/);
    if (cssLiteralMatch) {
        let css = cssLiteralMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        fs.writeFileSync('moving-dot-card.css', css);
        console.log('CSS saved to moving-dot-card.css (literal)');
    } else {
        console.log('CSS not found');
    }
  }
  await browser.close();
})();
