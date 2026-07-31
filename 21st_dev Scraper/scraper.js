const readline = require('readline');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function main() {
  while (true) {
    const url = await askQuestion('\nInserisci il link del componente 21st.dev: ');
    
    if (!url || !url.includes('21st.dev')) {
      console.log("Link non valido. Assicurati che sia un URL di 21st.dev.");
    } else {
      await scrape(url);
    }
    
    const answer = await askQuestion('\nVuoi estrarre un altro componente? (y/n): ');
    if (answer.toLowerCase() !== 'y') {
      break;
    }
  }
  
  rl.close();
  console.log("Chiusura del terminale...");
  // Use osascript to close the Terminal window on macOS
  exec('osascript -e \'tell application "Terminal" to close first window\'');
  process.exit(0);
}

async function scrape(url) {
  // Extract component name from URL (e.g. "glass-card")
  const componentName = url.split('/').pop().split('?')[0] || 'component';
  
  console.log(`\n[Scraper] Avvio estrazione per il componente: ${componentName}`);
  console.log(`[Scraper] Navigazione verso ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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
    
    // Extract Preview URL
    let previewUrl = null;
    const previewMatch = html.match(/(?:\\*")preview_url(?:\\*")\s*:\s*(?:\\*")(https:\/\/cdn\.21st\.dev\/[^"\\]+\.png)(?:\\*")/);
    if (previewMatch) {
      previewUrl = previewMatch[1];
    }
    
    // Extract Compiled CSS URL
    let compiledCssUrl = null;
    const cssMatch = html.match(/(?:\\*")compiled_css(?:\\*")\s*:\s*(?:\\*")(https:\/\/cdn\.21st\.dev\/[^"\\]+\.css)(?:\\*")/);
    if (cssMatch) {
      compiledCssUrl = cssMatch[1];
    }
    
    // Extract Dependencies
    let depsStr = "";
    const regexDeps = /(?:\\*")dependencies(?:\\*")\s*:\s*(?:\\*")?(\{.*?\}|\[.*?\])(?:\\*")?/;
    const depsMatch = html.match(regexDeps);
    if (depsMatch) {
      try {
        let cleanStr = depsMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        const depsObj = JSON.parse(cleanStr);
        if (Array.isArray(depsObj)) depsStr = depsObj.join(' ');
        else depsStr = Object.keys(depsObj).join(' ');
      } catch(e) {}
    }

    // Extract Registry Dependencies (e.g. button, utils)
    let regDepsStr = "";
    const regexReg = /(?:\\*")registryDependencies(?:\\*")\s*:\s*(?:\\*")?(\{.*?\}|\[.*?\])(?:\\*")?/;
    const regMatch = html.match(regexReg);
    if (regMatch) {
      try {
        let cleanStr = regMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        const obj = JSON.parse(cleanStr);
        if (Array.isArray(obj)) regDepsStr = obj.join(' ');
        else regDepsStr = Object.keys(obj).join(' ');
      } catch(e) {}
    }

    // AI Prompt Generation
    let outputText = `Prompt AI per l'IDE:\n"Crea un componente React chiamato '${componentName}'. Usa il codice sottostante come implementazione esatta e assicurati che il risultato visivo corrisponda perfettamente all'immagine 'preview.png' allegata. Non omettere parti funzionali."\n\n`;
    outputText += `Componente: ${componentName}\nURL: ${url}\n\n`;
    
    if (depsStr || regDepsStr) {
      outputText += `=========== DIPENDENZE ===========\n`;
      if (depsStr) outputText += `Installa questi pacchetti:\nnpm install ${depsStr}\n\n`;
      if (regDepsStr) outputText += `Componenti shadcn richiesti:\nnpx shadcn-ui@latest add ${regDepsStr}\n\n`;
      outputText += `====================================\n\n`;
    }

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

    if (compiledCssUrl) {
      const cssRes = await fetch(compiledCssUrl);
      if (cssRes.ok) {
        const cssText = await cssRes.text();
        const cssFileName = compiledCssUrl.split('/').pop() || 'styles.css';
        outputText += `=========== STILE CSS (${cssFileName}) ===========\n\n${cssText}\n\n`;
      }
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
    
    const txtPath = path.join(compDir, `${componentName}.txt`);
    fs.writeFileSync(txtPath, outputText, 'utf-8');

    // Download preview image if available
    if (previewUrl) {
      try {
        const previewRes = await fetch(previewUrl);
        if (previewRes.ok) {
          const buffer = await previewRes.arrayBuffer();
          const previewPath = path.join(compDir, 'preview.png');
          fs.writeFileSync(previewPath, Buffer.from(buffer));
          console.log(`[Scraper] Immagine di anteprima salvata in:`);
          console.log(previewPath);
        }
      } catch (e) {
        console.log(`[Scraper] Impossibile scaricare l'immagine di anteprima: ${e.message}`);
      }
    }
    
    console.log(`\n[Scraper] Successo! Il file TXT è stato salvato in:`);
    console.log(txtPath);
    
  } catch (err) {
    console.error("\n[Scraper] Errore durante lo scraping:", err);
  } finally {
    await browser.close();
  }
}

main();
