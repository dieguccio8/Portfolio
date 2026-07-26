const readline = require('readline');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\nInserisci il link del componente 21st.dev: ', async (url) => {
  if (!url || !url.includes('21st.dev')) {
    console.log("Link non valido. Assicurati che sia un URL di 21st.dev.");
    rl.close();
    return;
  }
  
  rl.close();

  // Extract component name from URL (e.g. "glass-card")
  const componentName = url.split('/').pop().split('?')[0] || 'component';
  
  console.log(`\n[Scraper] Avvio estrazione per il componente: ${componentName}`);
  console.log(`[Scraper] Navigazione verso ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    // Intercept to speed up loading (we don't need images/css)
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // We only need the raw HTML containing the React Server Components payload
    const html = await page.content();
    
    // Using the bypass trick: 21st.dev embeds private Cloudflare R2 links in the HTML JSON payload.
    // We can convert these r2:// links directly to their public CDN equivalent!
    let codeUrl = null;
    const r2Match = html.match(/(?:\\*")code(?:\\*")\s*:\s*(?:\\*")r2:\/\/components-code-private\/([^"\\]+)(?:\\*")/);
    if (r2Match) {
      codeUrl = `https://cdn.21st.dev/${r2Match[1]}`;
    } else {
      const publicCodeMatch = html.match(/(?:\\*")code(?:\\*")\s*:\s*(?:\\*")(https:\/\/cdn\.21st\.dev\/[^"\\]+)(?:\\*")/);
      if (publicCodeMatch) {
        codeUrl = publicCodeMatch[1];
      }
    }
    
    let demoCodeUrl = null;
    const demoMatch = html.match(/(?:\\*")demo_code(?:\\*")\s*:\s*(?:\\*")(https:\/\/cdn\.21st\.dev\/[^"\\]+)(?:\\*")/);
    if (demoMatch) {
      demoCodeUrl = demoMatch[1];
    }
    
    let outputText = `Componente: ${componentName}\nURL: ${url}\n\n`;
    let foundCode = false;

    if (codeUrl) {
      console.log(`[Scraper] Trovato URL sorgente principale! Download in corso...`);
      const response = await fetch(codeUrl);
      const code = await response.text();
      outputText += `=========== CODICE PRINCIPALE (${componentName}.tsx) ===========\n\n${code}\n\n`;
      foundCode = true;
    }
    
    if (demoCodeUrl) {
      console.log(`[Scraper] Trovato URL sorgente demo! Download in corso...`);
      const response = await fetch(demoCodeUrl);
      const demoCode = await response.text();
      outputText += `=========== CODICE DEMO (demo.tsx) ===========\n\n${demoCode}\n\n`;
      foundCode = true;
    }
    
    // Fallback if demo code is embedded directly as a string in the payload
    if (!demoCodeUrl) {
       const demoLiteralMatch = html.match(/(?:\\*")demoCode(?:\\*")\s*:\s*(?:\\*")((?:[^"\\]|\\.)*)(?:\\*")/);
       if (demoLiteralMatch) {
           let literalCode = demoLiteralMatch[1]
              .replace(/\\n/g, '\n')
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, '\\');
           outputText += `=========== CODICE DEMO (demo.tsx) ===========\n\n${literalCode}\n\n`;
           console.log(`[Scraper] Trovato codice demo integrato nel payload!`);
           foundCode = true;
       }
    }

    if (!foundCode) {
      console.log("\n[Scraper] ATTENZIONE: Impossibile trovare il codice. Potrebbe essere protetto o rimosso.");
      outputText += "Nessun codice trovato.\n";
    }
    
    // Save to components/<componentName>/<componentName>.txt
    const baseDir = path.join(process.cwd(), 'components');
    const compDir = path.join(baseDir, componentName);
    
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
    if (!fs.existsSync(compDir)) fs.mkdirSync(compDir);
    
    const outputPath = path.join(compDir, `${componentName}.txt`);
    fs.writeFileSync(outputPath, outputText, 'utf-8');
    
    console.log(`\n[Scraper] Successo! Il file TXT è stato salvato in:`);
    console.log(outputPath);
    
  } catch (err) {
    console.error("\n[Scraper] Errore durante lo scraping:", err);
  } finally {
    await browser.close();
  }
});
