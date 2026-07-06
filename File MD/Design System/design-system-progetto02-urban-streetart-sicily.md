# Istruzioni Design System — Pagina Progetto 02 "Urban StreetArt Sicily"

## ⚠️ Scope del task (vincolante)

- Applicare le modifiche **SOLO** alla pagina progetto "Urban StreetArt Sicily" (progetto 02) del portfolio.
- **Non toccare** nessun'altra pagina, componente condiviso, header/footer globale, o altri progetti.
- Modificare **esclusivamente lo stile visivo**: colori, tipografia, texture, effetti grafici, spaziature, e i pattern decorativi descritti sotto.
- **Non modificare** testi, copy, immagini caricate dall'utente, o l'ordine/gerarchia dei contenuti.
- Se una modifica di stile richiede di toccare markup/HTML, farlo per aggiungere wrapper, layer decorativi (SVG/pseudo-elementi) o classi necessarie agli effetti grafici — mai per riscrivere o riordinare contenuti.

### 🔴 Nota su un tentativo precedente non riuscito

Un tentativo precedente ha **solo ricolorato** la pagina esistente (variabili colore) lasciando **identici layout, hero section ed elementi decorativi**. Questo NON è sufficiente. Il restyling deve introdurre **nuovi elementi grafici/decorativi reali** (forme SVG, cornici, layer di texture, badge, collage fotografico) descritti nella sezione 3 e nella sezione 4 "Hero Section", non limitarsi a un cambio di palette sui componenti già esistenti. In particolare **la hero section deve essere rifatta esplicitamente** seguendo la sezione 4: se rimane visivamente identica a prima (stesso layout, stessi colori, nessun elemento decorativo nuovo), il task non è completato.

---

## 1. Design system di riferimento (estratto dall'immagine fornita)

L'immagine di riferimento è una landing/case-study in stile **street art urbano**, layout a colonne editoriali stile "muro/collage". Elementi specifici osservati:

- **Sfondo**: nero/antracite con texture a scarabocchi/tag graffiti molto tenue su tutta la superficie, e ampie forme organiche gialle stile "onda/collina di vernice spray" che attraversano orizzontalmente la parte alta della pagina.
- **Palette originale**: nero di base, giallo senape acceso, verde erba, bianco sporco, tocchi di rosso, un pannello crema/bianco per una sezione a contrasto.
- **Tipografia**: titoli graffiti bubble-letter molto bold e gocciolanti (effetto vernice che cola), giustapposti in un punto a un headline più editoriale; testo corpo in maiuscolo condensato, molto spaziato; firme in stile corsivo/tag per le didascalie.
- **Elementi grafici ricorrenti**:
  - Angoli di foto "strappati" (torn corner), spesso con una foto inset più piccola che si sovrappone ruotata all'immagine principale (effetto collage a due livelli).
  - Cornici/aloni colorati dietro ai ritratti (forme a diamante/rombo ruotate, cerchi "alone") che fanno risaltare la foto principale.
  - Piccole icone decorative sparse (corona, personaggi/mostriciattoli, macchie) usate con parsimonia accanto a titoli o foto.
  - Collage di badge/etichette adesive ruotate a angolazioni diverse, raggruppate in cluster, per elencare nomi/tag/elementi.
  - Grafica di una bomboletta spray come elemento decorativo a tutta figura in una sezione.
  - Sottolineature a "goccia di vernice" sotto parole chiave nei titoli principali.
- **Struttura**: eyebrow/kicker sopra i titoli, badge con range di date, blocchi colore pieni dietro alcune immagini/pannelli, alternanza di colonne larghe/strette, forte asimmetria (elementi che escono dal bordo del contenitore, rotazioni, sovrapposizioni).

Questo è lo stile "grezzo" originale, molto denso e illustrativo. Nella sezione 3 lo **adattiamo**: manteniamo la logica dei componenti (angolo strappato, alone colorato, collage a due livelli, drip, badge ruotati) ma li eseguiamo in modo pulito, geometrico e "moderno", per restare professionali.

---

## 2. Design system adattato — palette e tipografia

### Palette colori

| Ruolo | Colore | Hex |
|---|---|---|
| Primario (accento) | Giallo brand | `#FCD306` |
| Sfondo base | Nero quasi puro | `#0D0D0D` |
| Sfondo secondario / card | Grigio antracite | `#1A1A1A` |
| Testo primario | Bianco sporco | `#F5F5F0` |
| Testo secondario / didascalie | Grigio chiaro | `#A8A8A2` |
| Bordi / divisori | Grigio scuro | `#2B2B2B` |
| Accento opzionale (badge/testo su giallo) | Nero su giallo | `#0D0D0D` su `#FCD306` |

Regola d'uso: **sfondo dominante nero**, il giallo va usato per: forme organiche/wave di sfondo nella hero, titoli in evidenza, badge, cornici/aloni dietro le foto, drip decorativo, hover state. Non deve superare ~15-20% della superficie totale della pagina.

### Tipografia — Urbanist (unica famiglia, gestita a pesi/varianti)

- **H1 / Hero title**: Urbanist **Black/900**, tutto maiuscolo, `letter-spacing: -0.02em`, dimensione grande (clamp `40px–96px`), bianco con una parola chiave in giallo `#FCD306` + drip accent (vedi sez. 4).
- **H2 / Titoli sezione**: Urbanist **ExtraBold/800**, maiuscolo.
- **Eyebrow/kicker**: Urbanist **SemiBold/600**, maiuscolo, `letter-spacing: 0.15–0.2em`, piccolo, colore giallo `#FCD306`.
- **Badge data/tag**: Urbanist **Bold/700**, maiuscolo, dentro badge bordato o pieno giallo/testo nero.
- **Body/paragrafi**: Urbanist **Regular/400** o **Medium/500**, minuscolo, interlinea 1.5–1.6, colore `#F5F5F0`.
- **Didascalie/caption**: Urbanist **Medium/500**, maiuscolo, piccolo, `letter-spacing: 0.08em`, colore `#A8A8A2`.

---

## 3. Componenti decorativi street da introdurre (concreti, non solo colore)

Questi sono componenti grafici reali da costruire, non solo variabili di colore. Selezionarne e distribuirli lungo la pagina:

1. **Wave/blob di sfondo giallo (hero + 1 altra sezione chiave)**: una forma organica ampia, tipo "collina/onda di vernice", larghezza piena, in giallo `#FCD306`, opacità 80-100% se elemento principale dello sfondo, 15-20% se passa dietro al testo. SVG `path` organico, non un cerchio generico.
2. **Texture scribble di sfondo**: pattern SVG ripetuto di scarabocchi/linee tag molto sottili, opacità 4-6%, su tutto il fondo nero della pagina.
3. **Angolo "strappato" sulle immagini**: `clip-path` con un angolo tagliato in diagonale (geometrico e pulito, non fotorealistico) su hero image e immagini di sezione principali.
4. **Collage a due livelli**: sull'immagine principale della hero (e opzionalmente un'altra immagine chiave), sovrapporre una seconda immagine più piccola in un angolo, ruotata di 4-8°, con bordo sottile o piccola ombra.
5. **Alone/cornice colorata dietro ai ritratti**: forma geometrica (rombo o cerchio ruotato) in giallo o antracite, dietro a una foto ritratto rilevante, leggermente più grande della foto.
6. **Drip accent sotto una parola chiave**: piccola forma SVG a goccia di vernice sotto 1-2 lettere di UNA parola chiave nell'H1 della hero, in giallo. Uso unico, non ripetuto ovunque.
7. **Cluster di badge ruotati**: se la pagina ha una sezione con elenco (tecnologie, tag, credit, artisti coinvolti), presentarli come chip/badge con bordo netto, ruotati a angolazioni diverse (-6°/+6° random), invece di lista piatta.
8. **Micro-icone decorative**: 1-2 piccole forme SVG astratte (goccia, macchia di spray) come accento vicino a un titolo di sezione o badge, mai illustrazioni figurative complesse.

Da **evitare**: nastro adesivo fotorealistico, ritagli di giornale, texture di carta/adesivo realistica, font handwriting/graffiti nel body, personaggi/mostriciattoli illustrati.

---

## 4. Hero Section — trattamento obbligatorio (deve visibilmente cambiare)

Questa sezione è quella rimasta invariata nel tentativo precedente: va ricostruita seguendo esattamente questi punti, tutti obbligatori:

- **Sfondo**: nero `#0D0D0D` pieno, con la wave/blob gialla organica (punto 3.1) che attraversa la parte superiore, e la texture scribble (punto 3.2) sovrapposta a bassa opacità.
- **Eyebrow**: piccola label gialla uppercase sopra il titolo.
- **H1**: titolo del progetto in Urbanist Black uppercase, bianco, con una parola chiave evidenziata in giallo e drip accent (punto 3.6) sotto di essa.
- **Immagine hero**: angolo strappato geometrico (3.3), leggera rotazione (-2°/+2°), collage a due livelli con immagine inset ruotata in senso opposto (3.4), alone/cornice colorata dietro (3.5).
- **CTA/bottone** (se presente): sfondo giallo pieno, testo nero, angoli vivi (no border-radius o max 4px), hover con leggero skew.

L'obiettivo: la hero deve leggersi immediatamente come "diversa" rispetto alla versione attuale, non solo ricolorata — con almeno 3 dei componenti decorativi della sezione 3 effettivamente costruiti e visibili.

---

## 5. Layout e struttura

- Mantenere ordine e contenuto delle sezioni esistenti.
- Alternare sfondo nero pieno e, per 1-2 sezioni chiave (hero, sezione finale/CTA), un blocco pieno in giallo `#FCD306` con testo nero.
- Le immagini di sezione possono avere sfondo/cornice colorata (giallo o antracite) invece dello sfondo neutro attuale.
- Introdurre asimmetria controllata: qualche immagine o badge può uscire leggermente dal bordo/griglia della propria colonna.
- Spaziatura verticale tra sezioni generosa (min. 80-120px su desktop).

---

## 6. Micro-interazioni (opzionali)

- Hover su link/bottoni: transizione verso `#FCD306`, eventuale micro-skew (1-2°), durata breve (150-200ms).
- Reveal on-scroll leggero (fade + slide verticale) per i titoli di sezione.

---

## 7. Accessibilità e qualità

- Contrasto AA: bianco `#F5F5F0` su nero `#0D0D0D`, nero `#0D0D0D` su giallo `#FCD306`.
- Focus state visibile (outline giallo `#FCD306`, 2px).
- Responsive: su mobile ridurre wave/blob, angoli strappati e rotazioni; il collage a due livelli in hero può diventare una sola immagine su mobile.
- Rispettare `prefers-reduced-motion`.

---

## 8. Prompt riassuntivo da incollare in Google AI Studio

```
Applica il seguente restyling SOLO alla pagina del progetto "Urban StreetArt Sicily" 
(progetto 02) del portfolio. Non modificare nessun'altra pagina o componente condiviso. 
Non modificare testi, contenuti, immagini o ordine dei contenuti: solo lo stile visivo.

IMPORTANTE: ignora completamente il design/stile attualmente presente nella pagina del 
progetto 02 (colori, font, spaziature, effetti grafici, hero section esistenti). Non 
limitarti a ricolorare i componenti esistenti: costruisci davvero i nuovi elementi 
decorativi descritti sotto (forme SVG, cornici, layer di texture, badge, collage 
fotografico). Se al termine la hero section sembra ancora uguale a prima (stesso 
layout, nessun elemento decorativo nuovo visibile), il task NON è completo: la hero 
va rifatta seguendo esattamente la sezione HERO SECTION qui sotto.

PALETTE:
- Sfondo base: #0D0D0D (nero)
- Sfondo secondario/card: #1A1A1A
- Primario/accento: #FCD306 (giallo)
- Testo primario: #F5F5F0
- Testo secondario: #A8A8A2
- Bordi: #2B2B2B
Usa il giallo per forme di sfondo nella hero, titoli in evidenza, badge, cornici/aloni 
dietro le foto, drip decorativo, hover state. Non superare il 15-20% della superficie 
totale in giallo.

TIPOGRAFIA: usa solo il font Urbanist, con questi ruoli:
- H1: Urbanist 900 (Black), maiuscolo, letter-spacing -0.02em
- H2: Urbanist 800 (ExtraBold), maiuscolo
- Eyebrow/kicker: Urbanist 600, maiuscolo, letter-spacing 0.15-0.2em, colore #FCD306
- Badge/tag: Urbanist 700, maiuscolo, dentro badge bordato o pieno giallo/testo nero
- Body: Urbanist 400-500, minuscolo, interlinea 1.5-1.6
- Caption immagini: Urbanist 500, maiuscolo, letter-spacing 0.08em, colore #A8A8A2

COMPONENTI DECORATIVI DA COSTRUIRE (non solo colore, elementi grafici reali):
1. Wave/blob organico giallo a piena larghezza in cima alla hero (SVG path organico, 
   non un cerchio generico), eventualmente ripetuto in 1 altra sezione chiave.
2. Texture scribble/tag di sfondo, pattern SVG ripetuto, opacità 4-6%, su tutta la pagina.
3. Angolo "strappato" geometrico (clip-path diagonale pulito) sulle immagini principali.
4. Collage a due livelli sull'immagine hero: immagine principale + immagine inset più 
   piccola sovrapposta in un angolo, ruotata in senso opposto (4-8°).
5. Alone/cornice geometrica (rombo o cerchio ruotato) dietro ai ritratti/foto principali.
6. Drip di vernice SVG sotto 1-2 lettere di UNA parola chiave nell'H1 della hero.
7. Se presente una lista di tag/tecnologie/credit: badge/chip ruotati a angolazioni 
   diverse invece di lista piatta.
8. 1-2 micro-icone SVG astratte (goccia, macchia) come accento vicino a titoli o badge.

HERO SECTION (obbligatorio, deve cambiare visibilmente rispetto a ora):
- Sfondo nero con wave gialla organica in alto + texture scribble sovrapposta.
- Eyebrow label gialla uppercase sopra il titolo.
- H1 in Urbanist Black uppercase bianco, con una parola chiave in giallo + drip accent.
- Immagine hero con angolo strappato, leggera rotazione, collage a due livelli, e 
  alone/cornice colorata dietro.
- CTA (se presente): sfondo giallo pieno, testo nero, angoli vivi, hover con skew leggero.

EVITARE: nastro adesivo fotorealistico, ritagli giornale, texture carta/adesivo 
realistica, font handwriting/graffiti nel body, personaggi illustrati.

LAYOUT: mantieni ordine e contenuti delle sezioni esistenti. Alterna sfondo nero pieno 
a 1-2 sezioni chiave con blocco giallo pieno e testo nero. Introduci asimmetria 
controllata: qualche immagine/badge può uscire leggermente dal bordo della propria 
colonna. Spaziatura verticale tra sezioni 80-120px su desktop.

ACCESSIBILITÀ: contrasto AA, focus visibile in giallo 2px, rispetta 
prefers-reduced-motion, su mobile riduci wave/blob/rotazioni e semplifica il collage 
hero a una sola immagine.
```
