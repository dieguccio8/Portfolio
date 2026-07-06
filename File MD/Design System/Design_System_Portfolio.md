# Design System — AgentAI Website

> **⚠️ ISTRUZIONE FONDAMENTALE**
> Applica questo design system **cambiando solo lo stile visivo** del sito. I contenuti (testi, titoli, sezioni, struttura delle pagine) devono rimanere **esattamente identici**. Questo documento definisce esclusivamente come le cose devono apparire, non cosa devono dire.

---

## 1. Identità visiva

Il sito ha un'estetica **dark, premium e tecnologica**. Sfondo quasi nero con accenti rosso vivo e dettagli in grigio scuro. L'atmosfera è cinematografica — simile a un'agenzia creativa di alto livello che lavora con AI. Tutto comunica potenza, precisione e modernità.

---

## 2. Palette colori

### Colori base

| Token                    | Hex         | Uso                                                         |
|--------------------------|-------------|-------------------------------------------------------------|
| `--color-bg`             | `#0A0A0A`   | Sfondo globale — nero quasi puro                            |
| `--color-bg-elevated`    | `#141414`   | Sfondo card, navbar, sezioni leggermente rialzate           |
| `--color-bg-card`        | `#1A1A1A`   | Sfondo card secondarie, pannelli interni                    |
| `--color-surface`        | `#222222`   | Elementi interattivi su sfondo scuro (chip, badge neutri)   |
| `--color-border`         | `#2A2A2A`   | Bordi card, divisori, outline sottili                       |
| `--color-border-subtle`  | `#1E1E1E`   | Bordi appena percettibili, separatori sezione               |

### Colori primari (accento)

| Token                    | Hex         | Uso                                                         |
|--------------------------|-------------|-------------------------------------------------------------|
| `--color-accent`         | `#E8302A`   | Rosso vivo — CTA primari, parole evidenziate, dot decorativi|
| `--color-accent-dark`    | `#B52420`   | Rosso scuro — hover su bottoni rossi, sfondo card statistiche|
| `--color-accent-muted`   | `#3D1210`   | Rosso molto scuro — sfondo badge sezione, glow sottile      |

### Colori testo

| Token                    | Hex         | Uso                                                         |
|--------------------------|-------------|-------------------------------------------------------------|
| `--color-text-primary`   | `#FFFFFF`   | Titoli principali, testi ad alta priorità                   |
| `--color-text-secondary` | `#AAAAAA`   | Testi descrittivi, label, sottotitoli                       |
| `--color-text-muted`     | `#666666`   | Testi terziari, placeholder, metadati                       |
| `--color-text-accent`    | `#E8302A`   | Parole chiave evidenziate inline nel testo (es. "design", "AI solutions") |

---

## 3. Tipografia

Usa `font-family: 'Inter', 'DM Sans', sans-serif` come font principale. Il carattere è pulito, geometrico, senza serif. La gerarchia si costruisce esclusivamente su **dimensione e peso** — nessun font decorativo.

### Scala tipografica

| Ruolo                  | Dimensione  | Peso           | Colore                    | Uso                                              |
|------------------------|-------------|----------------|---------------------------|--------------------------------------------------|
| Hero Display           | 64–72px     | 800 (ExtraBold)| `#FFFFFF`                 | Titolo principale homepage (es. "Your AI Sprint Team On Demand") |
| Hero accent inline     | 64–72px     | 800 (ExtraBold)| `#E8302A`                 | Parole chiave nel titolo hero evidenziate in rosso |
| Section title          | 42–48px     | 700 (Bold)     | `#FFFFFF`                 | Titoli di sezione (es. "End-to-End AI Services") |
| Section accent inline  | 42–48px     | 700 (Bold)     | `#E8302A`                 | Parole chiave evidenziate nei titoli di sezione  |
| Card title             | 28–32px     | 700 (Bold)     | `#FFFFFF`                 | Titoli card (es. "AI Strategy & Mapping")        |
| Stat number            | 48–56px     | 800 (ExtraBold)| `#FFFFFF`                 | Numeri grandi statistiche (es. "230+", "3M+")    |
| Body text              | 14–16px     | 400 (Regular)  | `#AAAAAA`                 | Paragrafi descrittivi, testi secondari           |
| Label / tag            | 11–13px     | 500 (Medium)   | `#AAAAAA` o `#FFFFFF`     | Badge sezione, chip, label metadati              |
| Nav link               | 14px        | 400 (Regular)  | `#CCCCCC`                 | Voci menu navigazione                            |
| Quote text             | 14–15px     | 400 (Regular)  | `#FFFFFF`                 | Testo citazioni/testimonial                      |

### Regole tipografiche

- I titoli hero usano **mix di colore inline**: alcune parole bianche, altre rosse, nella stessa riga — senza tag separati visibili, solo `<span style="color: #E8302A">`.
- Line-height titoli: `1.1` (molto compresso, impatto visivo forte)
- Line-height body: `1.6`
- Letter-spacing titoli grandi: `-0.02em` (leggermente condensato)
- Letter-spacing label/badge: `0.05em` (leggermente espanso)
- **Mai** usare testo centrato tranne per elementi isolati (stat card, quote). Il testo scorre sempre da sinistra.

---

## 4. Spaziatura e layout

Layout a **12 colonne** su desktop. Il sito è pensato per schermi larghi (1280px–1440px max-width).

| Token            | Valore    | Uso                                                    |
|------------------|-----------|--------------------------------------------------------|
| `--space-xs`     | 4px       | Gap interno badge/chip                                 |
| `--space-sm`     | 8px       | Padding chip, gap icona-testo                          |
| `--space-md`     | 16px      | Padding interno card, gap elementi                     |
| `--space-lg`     | 24px      | Gap tra card, padding sezioni compatte                 |
| `--space-xl`     | 48px      | Padding verticale sezioni                              |
| `--space-2xl`    | 80px      | Margine tra macro-sezioni                              |
| `--space-3xl`    | 120–140px | Padding hero, spaziatura estrema tra blocchi principali|

**Max-width contenuto:** `1280px`, centrato con `margin: 0 auto` e `padding: 0 40px`.

---

## 5. Border radius

Il sito usa un sistema **coerente e moderato** — niente di troppo arrotondato, niente di squadrato. L'estetica è tecnica ma non fredda.

| Elemento                        | Border radius |
|---------------------------------|---------------|
| Bottoni pill (CTA primari)      | `50px`        |
| Bottoni compatti (chip/badge)   | `50px`        |
| Card principali                 | `16px`        |
| Card stat / pannelli secondari  | `12px`        |
| Avatar / immagini tonde         | `50%`         |
| Immagini card (foto)            | `12px`        |
| Navbar                          | `50px` (pill) |
| Tag sezione (es. "• Services")  | `50px`        |

---

## 6. Navbar / Menu

La navbar è **floating**, posizionata in alto con sfondo semitrasparente scuro e leggero blur. Non è full-width — è una pillola centrata che galleggia sopra il contenuto.

```
position: fixed
top: 16px
left: 50%
transform: translateX(-50%)
background: rgba(20, 20, 20, 0.85)
backdrop-filter: blur(12px)
border: 1px solid #2A2A2A
border-radius: 50px
padding: 10px 20px
display: flex
align-items: center
gap: 32px
z-index: 100
```

### Struttura interna navbar

```
[Logo + nome] ←——————→ [Home] [Services] [Works] [About] [Contact] ←——→ [Menu ⊕]
```

- **Logo:** icona rossa a sinistra + nome in bianco, font-weight 600
- **Nav links:** testo `#CCCCCC`, font-size 14px, senza underline, hover → `#FFFFFF`
- **Link attivo (Home):** sfondo `#E8302A`, colore `#FFFFFF`, border-radius `50px`, padding `6px 16px`
- **Bottone "Menu ⊕":** sfondo `#E8302A`, colore `#FFFFFF`, border-radius `50px`, padding `8px 18px`, font-size 13px. Il simbolo `⊕` è affiancato al testo.

---

## 7. Bottoni

### Bottone primario (rosso pieno)
```
background: #E8302A
color: #FFFFFF
border-radius: 50px
padding: 12px 24px
font-size: 14px
font-weight: 500
border: none
cursor: pointer
transition: background 0.2s
hover → background: #B52420
```

### Bottone secondario (outline grigio scuro)
```
background: #222222
color: #CCCCCC
border-radius: 50px
padding: 12px 24px
font-size: 14px
font-weight: 400
border: 1px solid #333333
hover → background: #2A2A2A; color: #FFFFFF
```

Esempio di coppia bottoni: `[Explore Services — outline] [View Pricing Plans — rosso]` affiancati con `gap: 12px`.

---

## 8. Badge / Tag sezione

Piccola pillola usata per identificare la sezione corrente. Appare sopra i titoli principali.

```
background: #3D1210
color: #E8302A
border-radius: 50px
padding: 4px 12px
font-size: 11px
font-weight: 500
letter-spacing: 0.05em
display: inline-flex
align-items: center
gap: 6px
```

Struttura: `• Services` oppure `• AI-Driven Agency` — il bullet `•` è in rosso, il testo in rosso più chiaro o bianco.

---

## 9. Card

### 9.1 Card statistica (stat card)
Card piccola con numero grande e label descrittiva.

```
background: #141414
border: 1px solid #2A2A2A
border-radius: 12px
padding: 20px 24px
display: flex
flex-direction: column
gap: 4px
```

Struttura interna:
```
[Numero grande 48px ExtraBold bianco]  ← es. "230+"
[Label 13px #AAAAAA]                   ← es. "Projects successfully launched worldwide"
```

### 9.2 Card principale (contenuto)
Card con sfondo grigio molto scuro, usata per sezioni come "Based in Montréal" o il pannello servizi.

```
background: #141414
border: 1px solid #1E1E1E
border-radius: 16px
padding: 28px 32px
overflow: hidden
```

Può contenere: testo + bottone + immagine fotografica con border-radius 12px.

### 9.3 Card servizio
Card per la lista servizi, con numerazione in alto a destra, titolo e chip tag.

```
background: #141414
border: 1px solid #2A2A2A
border-radius: 16px
padding: 24px 28px
display: flex
flex-direction: column
gap: 16px
```

Struttura interna:
```
[Numerazione top-right: "01", "02" — colore #444444, font-size 12px]
[Titolo card 28px bold bianco]
[Descrizione 14px #AAAAAA]
[Chip tag — vedi sezione 10]
```

### 9.4 Card testimonial / citazione
```
background: #141414
border: 1px solid #2A2A2A
border-radius: 16px
padding: 24px
display: flex
gap: 16px
align-items: flex-start
```

Struttura interna:
```
[Avatar foto 56px, border-radius 50%]
  → [Simbolo " in rosso #E8302A, font-size 20px]
  → [Testo citazione 14px bianco]
  → [Nome | Ruolo — 12px #AAAAAA]
```

---

## 10. Chip / Tag

Piccole pillole usate all'interno delle card per categorizzare o elencare funzionalità.

```
background: #222222
color: #AAAAAA
border-radius: 50px
padding: 6px 14px
font-size: 12px
font-weight: 400
display: inline-flex
align-items: center
border: 1px solid #333333
```

Variante attiva / hover:
```
background: #2A2A2A
color: #FFFFFF
border-color: #444444
```

---

## 11. Sezione hero

La hero occupa l'intera altezza dello schermo (100vh) con un'immagine fotografica o illustrativa a tutto sfondo, senza sfondo solido. Il contenuto si sovrappone all'immagine con testo bianco.

```
position: relative
min-height: 100vh
overflow: hidden
background: #0A0A0A
```

L'immagine hero è posizionata in modo asimmetrico — **non centrata**, ma spostata a destra o al centro-destra, lasciando spazio al testo a sinistra. Ha un leggero glow/alone colorato (rosso o ambientale) generato con `filter: drop-shadow` o `box-shadow` esterno.

Layout testo hero (colonna sinistra):
```
display: flex
flex-direction: column
gap: 24px
max-width: 540px
padding-top: 140px
```

---

## 12. Sezione statistiche inline (sotto hero)

Riga orizzontale di 3 mini-card statistiche, posizionate nella parte bassa della hero o subito sotto.

```
display: flex
gap: 12px
```

Ogni mini-card:
```
background: rgba(20, 20, 20, 0.7)
border: 1px solid #2A2A2A
border-radius: 12px
padding: 14px 20px
backdrop-filter: blur(8px)
```

Struttura:
```
[Label piccola 11px #AAAAAA]  ← es. "Happy people"
[Numero 36px ExtraBold bianco] ← es. "3M+"
[Elemento grafico opzionale — avatar stack o barra]
```

---

## 13. Sezione logo strip (trusted brands)

Riga orizzontale di loghi su sfondo leggermente più chiaro del body (`#111111`), tutti in bianco con opacità ridotta.

```
background: #111111
padding: 32px 0
display: flex
align-items: center
justify-content: space-between
gap: 40px
```

Loghi: `opacity: 0.4`, `filter: brightness(0) invert(1)` per uniformarli tutti in bianco. Hover → `opacity: 0.8`.

Label a sinistra: `Trusted by 120+ top-tier brands` — font-size 12px, colore `#666666`.

---

## 14. Effetti e texture

### Glow / alone colorato
L'elemento visivo più caratteristico del sito. Usato sull'immagine hero e su alcune card.

```css
/* Glow rosso ambientale */
filter: drop-shadow(0 0 60px rgba(232, 48, 42, 0.4));

/* Oppure come pseudo-elemento radial */
background: radial-gradient(ellipse at center, rgba(232, 48, 42, 0.15) 0%, transparent 70%);
```

### Blur semitrasparente (glassmorphism leggero)
Usato sulla navbar e sulle mini-card statistiche.

```css
background: rgba(14, 14, 14, 0.8);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.06);
```

### Overlay scuro su immagini
Le fotografie hanno sempre un overlay scuro per mantenere la leggibilità del testo sovrapposto.

```css
background: linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 60%, transparent 100%);
```

---

## 15. Griglia card e layout sezioni

### Layout a due colonne (sezione about / location)
```
display: grid
grid-template-columns: 1fr 1fr
gap: 16px
```

### Layout servizi (card list)
```
display: grid
grid-template-columns: 1fr 1fr
gap: 16px
align-items: start
```

La colonna sinistra ha: badge sezione + titolo grande + body text.
La colonna destra ha: griglia di card servizio.

### Sezione statistiche grandi (trusted / 120+)
```
display: grid
grid-template-columns: 1fr 1fr
gap: 16px
```

Colonna sinistra: testo descrittivo + stelle rating.
Colonna destra: numero grande (`120+`) in ExtraBold bianco, font-size 96–112px.

---

## 16. Istruzioni generali di implementazione

1. **Non modificare i contenuti** — testi, titoli, struttura delle sezioni, numero di elementi restano identici. Cambia solo come appaiono visivamente.
2. **Dark mode sempre attiva** — non ci sono varianti light. Il sito è esclusivamente dark.
3. **Sfondo globale:** `background-color: #0A0A0A` sul `<body>`.
4. **Font:** `font-family: 'Inter', sans-serif` — importa da Google Fonts con i pesi 400, 500, 700, 800.
5. **Transizioni:** tutti gli elementi interattivi hanno `transition: all 0.2s ease` per hover morbidi.
6. **Cursore:** `cursor: pointer` su tutti gli elementi cliccabili.
7. **Scrollbar:** nascosta o stilizzata in dark (`scrollbar-color: #333 #0A0A0A`).
8. **Selezione testo:** `::selection { background: #E8302A; color: #FFFFFF; }` per coerenza col tema.
9. **Anti-aliasing:** `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;` sul body.
10. **Box-sizing:** `* { box-sizing: border-box; }` globale.
