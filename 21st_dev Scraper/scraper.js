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

async function searchAlternativeSources(page, componentName, authorName, foundCode) {
  console.log(`\n[Scraper] DEEP RESEARCH avviata per il componente '${componentName}' (autore: ${authorName})...`);
  
  // 1. Mirata sui siti top e librerie gratuite (incluse wundercorp e isas1)
  const topSites = "site:github.com/wundercorp/awesome-components OR site:github.com/isas1/forever-ai-components OR site:github.com OR site:ui.shadcn.com OR site:magicui.design OR site:ui.aceternity.com OR site:uiverse.io OR site:codepen.io";
  const query = encodeURIComponent(`"${componentName}" ("${authorName}" OR react OR tailwind OR css) (${topSites})`);
  const searchUrl = `https://html.duckduckgo.com/html/?q=${query}`;
  
  let output = `\n## DEEP RESEARCH CONTESTUALE\n\n`;
  output += `> Questa sezione contiene il codice estratto dalle fonti primarie sul web per **${componentName}**. L'IA deve UNIFICARE questo codice con quello scaricato da 21st.dev per assicurarsi che non manchi nulla (specialmente CSS o animazioni framer-motion).\n\n`;

  try {
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    const links = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll('.result__a'));
      return results.map(a => ({ title: a.innerText, url: a.href })).slice(0, 2);
    });
    
    if (links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        let actualUrl = link.url;
        try {
          const urlObj = new URL(link.url);
          if (urlObj.hostname === 'duckduckgo.com' && urlObj.searchParams.has('uddg')) {
            actualUrl = decodeURIComponent(urlObj.searchParams.get('uddg'));
          }
        } catch(e) {}

        output += `### FONTE ORIGINALE ${i+1}: [${link.title}](${actualUrl})\n`;
        
        if (actualUrl.includes('github.com') && actualUrl.includes('/blob/') && /\.(tsx|jsx|ts|js|css|html)$/i.test(actualUrl)) {
          const rawUrl = actualUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
          try {
            console.log(`[Scraper] Download raw file da GitHub: ${rawUrl}`);
            const res = await fetch(rawUrl);
            if (res.ok) {
              const code = await res.text();
              const ext = actualUrl.split('.').pop();
              output += `**CODICE SORGENTE GITHUB:**\n\n\`\`\`${ext}\n${code}\n\`\`\`\n\n`;
            }
          } catch(e) {}
        } else {
          // Naviga nel sito per estrarre <code> o <pre>
          try {
            console.log(`[Scraper] Scraping pagina web alternativa: ${actualUrl}`);
            const newPage = await page.browser().newPage();
            await newPage.goto(actualUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
            
            const extractedCode = await newPage.evaluate(() => {
              const blocks = Array.from(document.querySelectorAll('pre, code'));
              // extract the largest blocks of code, limit to avoid massive noise
              return blocks.map(b => b.innerText.trim())
                           .filter(text => text.length > 40 && text.length < 15000)
                           .slice(0, 3)
                           .join('\n\n---\n\n');
            });
            await newPage.close();
            
            if (extractedCode) {
              output += `**CODICE ESTRATTO (Trovato nella pagina):**\n\n\`\`\`tsx\n${extractedCode}\n\`\`\`\n\n`;
            } else {
               output += `*Nessun blocco di codice evidente trovato sulla pagina.*\n\n`;
            }
          } catch(e) {
            output += `*Impossibile scansionare la pagina (${e.message}).*\n\n`;
          }
        }
      }
      return output;
    } else {
      // Fallback globale se non trova nulla sui siti top
      console.log(`[Scraper] Nessun risultato dai siti top. Tento fallback globale...`);
      const fallbackQuery = encodeURIComponent(`"${componentName}" react tailwind source code`);
      await page.goto(`https://html.duckduckgo.com/html/?q=${fallbackQuery}`, { waitUntil: 'networkidle2' });
      const fallbackLinks = await page.evaluate(() => {
        const results = Array.from(document.querySelectorAll('.result__a'));
        return results.map(a => ({ title: a.innerText, url: a.href })).slice(0, 1);
      });
      
      if (fallbackLinks.length > 0) {
         let actualUrl = fallbackLinks[0].url;
         try {
           const urlObj = new URL(fallbackLinks[0].url);
           if (urlObj.hostname === 'duckduckgo.com' && urlObj.searchParams.has('uddg')) {
             actualUrl = decodeURIComponent(urlObj.searchParams.get('uddg'));
           }
         } catch(e) {}
         output += `### FALLBACK: [${fallbackLinks[0].title}](${actualUrl})\n`;
         
         try {
            console.log(`[Scraper] Scraping fallback: ${actualUrl}`);
            const newPage = await page.browser().newPage();
            await newPage.goto(actualUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
            
            const extractedCode = await newPage.evaluate(() => {
              const blocks = Array.from(document.querySelectorAll('pre, code'));
              return blocks.map(b => b.innerText.trim())
                           .filter(text => text.length > 40 && text.length < 15000)
                           .slice(0, 3)
                           .join('\n\n---\n\n');
            });
            await newPage.close();
            
            if (extractedCode) {
              output += `**CODICE ESTRATTO (Fallback):**\n\n\`\`\`tsx\n${extractedCode}\n\`\`\`\n\n`;
            }
          } catch(e) {}
          return output;
      }
      return output + "Nessuna fonte esterna utile trovata sul web.\n\n";
    }
  } catch (err) {
    console.log(`[Scraper] Errore durante la deep research: ${err.message}`);
    return output + `Errore di ricerca: ${err.message}\n\n`;
  }
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
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
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
    
    // Extract Preview URL
    let previewUrl = null;
    const previewMatch = html.match(/(?:\\*")preview_url(?:\\*")\s*:\s*(?:\\*")(https:\/\/cdn\.21st\.dev\/[^"\\]+\.png)(?:\\*")/);
    if (previewMatch) {
      previewUrl = previewMatch[1];
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

    let outputText = `You are given a task to integrate an existing React component in the codebase\n\nThe codebase should support:\n- shadcn project structure  \n- Tailwind CSS\n- Typescript\n\nIf it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.\n\nDetermine the default path for components and styles. \nIf default path for components is not /components/ui, provide instructions on why it's important to create this folder\nCopy-paste this component to /components/ui folder:\n`;

    if (depsStr || regDepsStr) {
      outputText += `\nInstall NPM dependencies:\n\`\`\`bash\n${depsStr} ${regDepsStr}\n\`\`\`\n\n`;
    }

    let foundCode = false;

    // OTTIMIZZAZIONE IMPECCABILE: Estrae tutti i file (CSS, TSX, JS, TS) direttamente dai link CDN!
    const allLinks = new Set();
    const cdnRegex = /https:\/\/cdn\.21st\.dev\/[^"'\\]+\.(css|tsx|jsx|ts|js)/g;
    let m;
    while ((m = cdnRegex.exec(html)) !== null) {
      allLinks.add(m[0]);
    }
    const r2Regex = /r2:\/\/components-code-private\/([^"'\\]+\.(css|tsx|jsx|ts|js))/g;
    while ((m = r2Regex.exec(html)) !== null) {
      allLinks.add(`https://cdn.21st.dev/${m[1]}`);
    }

    const filesToDownload = Array.from(allLinks);
    
    for (const fileUrl of filesToDownload) {
      try {
         const fileRes = await fetch(fileUrl);
         if (fileRes.ok) {
            const fileText = await fileRes.text();
            const parts = fileUrl.split('/');
            let fileName = parts.pop() || 'file';
            const ext = fileName.split('.').pop();
            // Se è un file demo, includiamo la cartella padre per distinguerli (es. default, character-scale)
            if (fileName.includes('demo') && parts.length > 0) {
               fileName = parts.pop() + '/' + fileName;
            }
            
            // Separa il tipo di file per rendere il markdown leggibile
            if (ext === 'css') {
               // Per ignorare il noioso tailwind base reset se troviamo un altro CSS
               if (fileName.includes('compiled') && filesToDownload.some(u => u.endsWith('.css') && !u.includes('compiled'))) {
                  continue; // Saltiamo il compiled.css se esiste un index.css!
               }
               outputText += `\`\`\`css\n${fileName}\n${fileText}\n\`\`\`\n\n`;
            } else {
               // Formatta come richiesto: nome file seguito dal codice
               let cleanFileName = fileName;
               if (cleanFileName.includes('demo')) {
                   cleanFileName = cleanFileName.replace('code.demo.', 'demo.').replace(/\\.[0-9]+/, '');
               } else if (cleanFileName.includes('registry')) {
                   cleanFileName = 'registry.' + ext;
               } else {
                   cleanFileName = componentName + '.' + ext;
               }
               
               outputText += `\`\`\`${ext}\n${cleanFileName}\n${fileText}\n\`\`\`\n\n`;
            }
            foundCode = true;
         }
      } catch(e) {}
    }
    
    // Fallback if demo code is embedded directly as a string in the payload
    const hasDemoFile = filesToDownload.some(f => f.toLowerCase().includes('demo'));
    if (!hasDemoFile) {
       const demoLiteralMatch = html.match(/(?:\\*")demoCode(?:\\*")\s*:\s*(?:\\*")((?:[^"\\]|\\.)*)(?:\\*")/);
       if (demoLiteralMatch) {
           let literalCode = demoLiteralMatch[1]
              .replace(/\\n/g, '\n')
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, '\\');
           outputText += `## CODICE DEMO (demo.tsx)\n\n\`\`\`tsx\n${literalCode}\n\`\`\`\n\n`;
           console.log(`[Scraper] Trovato codice demo integrato nel payload!`);
           foundCode = true;
       }
    }
    // Estrazione eventuale del prompt AI testuale (se presente nel payload)
    let aiPrompt = '';
    const aiPromptMatch = html.match(/(?:\\*[\"'])prompt(?:\\*[\"'])\s*:\s*(?:\\*[\"'])((?:[^\"\\\\]|\\\\.)*)(?:\\*[\"'])/i);
    if (aiPromptMatch) {
       try {
          aiPrompt = aiPromptMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
       } catch(e) {}
    }

    if (aiPrompt) {
       outputText = `## PROMPT AI ORIGINALE\n\n> "${aiPrompt}"\n\n=======================\n\n` + outputText;
       console.log(`[Scraper] Estratto Prompt AI originale dal payload!`);
    }

    // Estrazione del prompt/recipe (per componenti ASCII/generativi che non hanno codice)
    const recipeMatch = html.match(/(?:\\\\*[\"'])recipeJson(?:\\\\*[\"'])\s*:\s*(\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\})*)*\})*)*\})/);
    let recipeStr = '';
    if (recipeMatch) {
       recipeStr = recipeMatch[1].replace(/\\\\\"/g, '\"').replace(/\\\\/g, '');
    } else {
       const idx = html.indexOf('recipeJson');
       if (idx > -1) {
          let sub = html.substring(idx + 12);
          let endIdx = sub.indexOf('},\\"isPublished\\"');
          if (endIdx === -1) endIdx = sub.indexOf('},"isPublished"');
          if (endIdx > -1) {
             recipeStr = sub.substring(0, endIdx+1).replace(/\\\\\"/g, '\"').replace(/\\\\/g, '');
          }
       }
    }
    
    let isGenerativePromptOnly = false;
    if (recipeStr) {
       try {
          recipeStr = recipeStr.replace(/\\"/g, '"').replace(/\\\\/g, '');
          const parsed = JSON.parse(recipeStr);
          const formattedJson = JSON.stringify(parsed, null, 2);
          
          // Extract nice title from HTML
          let niceTitle = componentName;
          const titleMatch = html.match(/<title>([^<]+)<\/title>/);
          if (titleMatch) {
            niceTitle = titleMatch[1].split('—')[0].trim();
          }

          const template = `Recreate the "${niceTitle}" ASCII-art effect from 21st.dev (https://21st.dev/community/ascii) using Canvas2D (or an equivalent 2D raster API).

Source photo: ${parsed.sourceUrl || '/ascii-editor/demos/generated/ref-002.webp'}

Render pipeline (reimplement, don't assume our internal code is available):
1. Draw the source photo into a canvas at the target size; \`bgMode\`/\`bgBlur\`/\`bgOpacity\` control what shows behind the effect (blurred copy, solid color, the original photo, or nothing).
2. Divide the canvas into a grid of \`cellSize\`px cells and sample the average color/luminance of each cell.
3. For each cell, draw a shape per \`renderMode\`: "characters" draws a glyph from \`charSet\` sized/colored by luminance; "dither"/"mosaic"/"pixel"/"dots"/"cross"/"diamond"/"voxel"/"lego"/"mixed"/"lines"/"diagonal"/"braille"/"disco"/"hexdump" (hex-digit glyphs)/"matrix" (green code rain, self-animated)/"rings"/"hearts"/"stars"/"hexagons" (honeycomb)/"triangles" (low-poly)/"bubbles"/"hatch" (pencil cross-hatch)/"contour" (topographic iso-lines)/"halfblocks" (double vertical detail) each draw their own primitive shape instead. Respect \`coverage\` (% of cells drawn), \`density\`, \`invert\`, and \`edgeEmphasis\`.
4. Apply color adjustments in order: \`brightness\`, \`contrast\`, \`saturation\`, \`grayscale\`, then the \`tint\` color at \`tintOpacity\` via \`overlayBlend\`, then \`blurType\`/\`blurAmount\`.
5. Layer post-effects from \`pfx\` for every key where \`enabled\` is true, at its \`intensity\` (0-100): scanLines, vignette, bloom, chromatic, filmGrain, glitch, halftone, pixelate, filmDust.
6. If \`lights.enabled\`, add glow at each point in \`lights.points\` (normalized x/y, radius, intensity).
7. If \`mask.enabled\`, use \`mask.dataUrl\` as a reveal mask back to the plain photo (inverted if \`mask.invert\`).
8. This look is animated — see \`animSpeed\`, \`animStyle\` (wave/pulse/shimmer/ripple/flicker), and \`animIntensity\` for how it moves over time.

Full parameters (JSON):
\`\`\`json
${formattedJson}
\`\`\``;
          
          if (!foundCode) {
             outputText = `${template}\n`;
             isGenerativePromptOnly = true;
          } else {
             outputText = `## PROMPT DI GENERAZIONE (21st.dev Template)\n\n${template}\n\n=======================\n\n` + outputText;
          }
       } catch (e) {
          // Fallback if parsing fails
          recipeStr = recipeStr.replace(/\\"/g, '"');
          if (!foundCode) {
             outputText = `\`\`\`json\n${recipeStr}\n\`\`\`\n`;
             isGenerativePromptOnly = true;
          } else {
             outputText += `## PROMPT ESTRATTO (recipeJson)\n\n\`\`\`json\n${recipeStr}\n\`\`\`\n\n`;
          }
       }
       console.log(`[Scraper] Trovato prompt/recipe JSON integrato nel payload!`);
       foundCode = true;
    }

    if (!foundCode) {
      console.log("\n[Scraper] ATTENZIONE: Impossibile trovare il codice su 21st.dev.");
      outputText += "Nessun codice trovato su 21st.dev.\n";
    }
    
    let authorName = "";
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split('/').filter(p => p.length > 0);
      if (parts.length >= 2) {
        // Find the author name which is usually before 'components' or just before the component name
        let authorPart = parts[parts.length - 2];
        if (authorPart === 'components' && parts.length >= 3) {
          authorPart = parts[parts.length - 3];
        }
        authorName = authorPart.replace('@', ''); // Extract author (e.g. magicui or ibelick)
      }
    } catch(e) {}

    if (!isGenerativePromptOnly) {
      // Always search for alternative sources on the web to find Github repos or other implementations
      const alternativeOutput = await searchAlternativeSources(page, componentName, authorName, foundCode);
      outputText += alternativeOutput;
    }
    
    // Aggiungi le linee guida finali come nel prompt originale
    outputText += `\nImplementation Guidelines\n 1. Analyze the component structure and identify all required dependencies\n 2. Review the component's argumens and state\n 3. Identify any required context providers or hooks and install them\n 4. Questions to Ask\n - What data/props will be passed to this component?\n - Are there any specific state management requirements?\n - Are there any required assets (images, icons, etc.)?\n - What is the expected responsive behavior?\n - What is the best place to use this component in the app?\n\nSteps to integrate\n 0. Copy paste all the code above in the correct directories\n 1. Install external dependencies\n 2. Fill image assets with Unsplash stock images you know exist\n 3. Use lucide-react icons for svgs or logos if component requires them\n`;

    // Save to components/<componentName>/<componentName>.txt
    const baseDir = path.join(process.cwd(), 'components');
    const compDir = path.join(baseDir, componentName);
    
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
    if (!fs.existsSync(compDir)) fs.mkdirSync(compDir);
    
    const txtPath = path.join(compDir, `${componentName}.md`);
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
    
    console.log(`\n[Scraper] Successo! Il file MD è stato salvato in:`);
    console.log(txtPath);
    
  } catch (err) {
    console.error("\n[Scraper] Errore durante lo scraping:", err);
  } finally {
    await browser.close();
  }
}

main();
