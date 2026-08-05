const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('https'); // for downloading

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating to user effect...');
  await page.goto('https://21st.dev/community/ascii/uss-fda8ff9f-a8f6-439d-8557-f1490c2306e6', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));
  
  const videoSrc = await page.evaluate(() => {
    const video = document.querySelector('video');
    return video ? video.src || video.currentSrc : null;
  });
  
  console.log('Video SRC:', videoSrc);

  if (videoSrc && videoSrc.startsWith('http')) {
     console.log('Downloading video...');
     const file = fs.createWriteStream('/Users/ericadibella/Desktop/DIEGO/Portfolio/Code/public/hero_video_02.mp4');
     http.get(videoSrc, function(response) {
       response.pipe(file);
       file.on('finish', function() {
         file.close();
         console.log('Video downloaded successfully to public/hero_video_02.mp4!');
       });
     });
  }

  await browser.close();
})();
