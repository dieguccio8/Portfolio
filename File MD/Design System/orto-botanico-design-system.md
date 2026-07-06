# Design System — Orto Botanico di Catania

> **⚠️ SCOPE IMPORTANTE**  
> Questo design system si applica **esclusivamente** alla pagina del progetto **"Orto Botanico"** nel portfolio. Non deve influenzare nessun'altra pagina o sezione del sito.

---

## 1. Identità visiva

Il progetto è un'app mobile per la navigazione dell'Orto Botanico di Catania. L'estetica è **naturale, accessibile e moderna**: verde botanico dominante su sfondo bianco puro, con accenti cromatici che identificano le zone dell'orto. Il tono è informativo ma invitante.

---

## 2. Palette colori

### Colori principali

| Nome token         | Hex       | Uso                                                  |
|--------------------|-----------|------------------------------------------------------|
| `--color-primary`  | `#2E8B3A` | Verde botanico — CTA primari, bordi card attive, icone principali |
| `--color-primary-dark` | `#1F6B2A` | Verde scuro — hover sui bottoni primari          |
| `--color-bg`       | `#FFFFFF` | Sfondo globale delle schermate                       |
| `--color-surface`  | `#F5F5F5` | Sfondo chip/badge secondari, input field             |
| `--color-text-primary` | `#1A1A1A` | Testi principali, titoli                         |
| `--color-text-secondary` | `#555555` | Testi descrittivi, label dentro chip          |
| `--color-border`   | `#D0D0D0` | Bordi card, input, chip non attivi                   |

### Colori categoria (zone dell'orto)

Questi colori vengono usati esclusivamente per identificare le zone botaniche nelle card piante, nei chip/badge e nella mappa.

| Categoria        | Hex        | Uso                                      |
|------------------|------------|------------------------------------------|
| Tropicale        | `#E8A020` | Badge "Tropicale" — sfondo giallo-arancio|
| Arido            | `#D94040` | Badge "Arido" — sfondo rosso             |
| Orto Siculo      | `#2E8B3A` | Badge "Orto Siculo" — sfondo verde       |
| Mediterraneo     | `#9B59B6` | Badge "Mediterraneo" — sfondo viola      |
| Orto Generale    | `#2563EB` | Badge "Orto Generale" — sfondo blu       |
| Bagni            | `#1C3A6B` | Badge "Bagni" — sfondo blu navy          |
| Fontanella       | `#38BDF8` | Badge "Fontanella" — sfondo azzurro      |

> **Nota:** Tutti i badge categoria usano testo bianco `#FFFFFF` su questi sfondi.

### Colori mappa

| Elemento          | Hex        |
|-------------------|------------|
| Zona Tropicale    | `#E8A020` |
| Zona Arido        | `#CC3333` |
| Zona Orto Siculo  | `#2E8B3A` |
| Zona Mediterraneo | `#8B5CF6` |
| Zona Orto Generale| `#3B82F6` |
| Percorso (dashed) | `#EF4444` |
| Marker Start      | `#EF4444` |
| Marker End        | `#EF4444` |
| Marker "Tu sei qui" | `#1C3A6B` |
| Edifici           | `#D4D4D4` |
| Strade/percorsi   | `#F0F0F0` |

---

## 3. Tipografia

Il progetto usa **un'unica famiglia sans-serif di sistema** — nello stile dei typeface geometrici moderni (vicino a *DM Sans*, *Inter* o *Nunito*). La gerarchia si costruisce esclusivamente su peso e dimensione.

> **Indicazione di implementazione:** Usare `font-family: 'DM Sans', 'Inter', sans-serif` per rispecchiare al meglio il look del progetto.

### Scala tipografica

| Ruolo                  | Dimensione | Peso       | Uso                                             |
|------------------------|-----------|------------|-------------------------------------------------|
| Display / Hero title   | 32–34px   | 700 (Bold) | Titoli di sezione principali ("Scegli il percorso…") |
| Page title             | 26–28px   | 700 (Bold) | Nome del percorso attivo ("Percorso Breve")     |
| Section heading        | 22–24px   | 700 (Bold) | Intestazioni sottosezioni ("Habitat", "Curiosità") |
| Card title             | 18–20px   | 400 (Regular) | Nome pianta nelle card lista              |
| Body text              | 15–16px   | 400 (Regular) | Testo descrittivo, paragrafi                |
| Bold inline            | 15–16px   | 700 (Bold) | Parole enfatizzate inline nel corpo ("**famiglie**", "**visitatori di fretta**") |
| Label / chip text      | 13–14px   | 400–500    | Testo nei badge categoria, chip durata/piante   |
| Numero step            | 14px      | 700 (Bold) | Numerazione step nel dettaglio pianta (cerchio verde) |

### Interlinea e spaziatura

- Line-height corpo: `1.6`
- Line-height titoli: `1.2`
- Letter-spacing titoli: `normal` (no tracking aggiuntivo)

---

## 4. Spaziatura e layout

Il layout è pensato per **mobile-first** (viewport 390–430px). Tutti gli spacing si basano su multipli di 8px.

| Token                  | Valore   | Uso                                              |
|------------------------|----------|--------------------------------------------------|
| `--space-xs`           | 4px      | Gap interno badge/chip                           |
| `--space-sm`           | 8px      | Padding interno chip, gap tra icona e label      |
| `--space-md`           | 16px     | Padding orizzontale globale delle schermate      |
| `--space-lg`           | 20–24px  | Padding verticale sezioni, gap tra card          |
| `--space-xl`           | 32px     | Spaziatura tra blocchi principali                |
| `--space-2xl`          | 48px     | Margine top/bottom sezioni hero                  |

---

## 5. Border radius

Il progetto usa angoli molto arrotondati — stile "pill" per bottoni e badge, e arrotondamenti consistenti per le card.

| Elemento              | Border radius   |
|-----------------------|-----------------|
| Bottoni primari (pill)| `50px`          |
| Card navigazione percorso | `20px`      |
| Card lista piante     | `16px`          |
| Chip/badge categoria  | `50px` (pill)   |
| Chip durata/piante    | `50px` (pill)   |
| Icone tonde (cerchi)  | `50%`           |
| Bottone back          | `16px`          |
| Input di ricerca      | `50px` (pill)   |
| Immagine hero pianta  | `16px`          |

---

## 6. Componenti UI

### 6.1 Bottoni

#### Bottone primario (verde pieno)
```
background: #2E8B3A
color: #FFFFFF
border-radius: 50px
padding: 14px 28px
font-size: 15px
font-weight: 700
display: flex; align-items: center; gap: 10px
```
Varianti: con icona a sinistra (leaf, pin), solo testo ("Inizia il percorso", "Termina percorso", "Visualizza nella mappa").

#### Bottone back (outline verde)
```
background: transparent
border: 2px solid #2E8B3A
color: #2E8B3A
border-radius: 16px
width: 44px; height: 44px
display: flex; align-items: center; justify-content: center
```
Contiene una chevron `<` in verde.

#### Bottone icona grigio (QR code, lingua)
```
background: #F0F0F0
border-radius: 50%
width: 44px; height: 44px
display: flex; align-items: center; justify-content: center
```

---

### 6.2 Chip durata e piante

Piccole pillole con icona + testo, bordo grigio chiaro.

```
background: #FFFFFF
border: 1.5px solid #D0D0D0
border-radius: 50px
padding: 8px 14px
display: inline-flex; align-items: center; gap: 6px
font-size: 13px
color: #1A1A1A
```

Struttura interna:
```
[icona 16px] [Label bold: "Durata:"] [valore normale: "15-25 min"]
```

---

### 6.3 Card percorso (home)

Card cliccabili con bordo verde e sfondo bianco.

```
background: #FFFFFF
border: 2px solid #2E8B3A
border-radius: 20px
padding: 20px
display: flex
flex-direction: column
gap: 12px
```

Struttura interna:
```
[Icona tonda verde 48px] [Nome percorso bold 20px]
[Chip durata] [Chip piante]
```

---

### 6.4 Badge / chip categoria

Pill colorato con icona e nome zona. Colore dipende dalla categoria (vedi sezione palette).

```
border-radius: 50px
padding: 6px 12px
display: inline-flex; align-items: center; gap: 6px
font-size: 13px
font-weight: 500
color: #FFFFFF
background: [colore categoria]
```

---

### 6.5 Card pianta (lista)

Card orizzontale con immagine quadrata a sinistra, nome e badge a destra.

```
background: #FFFFFF
border: 1.5px solid #D0D0D0
border-radius: 16px
padding: 12px
display: flex
align-items: center
gap: 14px
```

Struttura interna:
```
[Immagine 80x80px, border-radius: 12px] 
  → [Nome pianta 18px bold]
  → [Badge categoria]
```

---

### 6.6 Input di ricerca

```
background: #FFFFFF
border: 2px solid #2E8B3A
border-radius: 50px
padding: 12px 20px
display: flex; align-items: center; gap: 10px
font-size: 15px
color: #999 (placeholder)
```

Icona lente di ingrandimento verde a sinistra (`#2E8B3A`).

---

### 6.7 Header navigazione

Sticky top bar. Layout a tre zone: `[back button] [spazio flex] [QR button] [language button]`

```
display: flex
align-items: center
justify-content: space-between
padding: 12px 16px
background: #FFFFFF
```

---

### 6.8 Navbar globale (tab bar superiore)

Due bottoni affiancati che occupano la larghezza disponibile.

```
display: grid
grid-template-columns: 1fr 1fr
gap: 8px
padding: 0 16px
```

Bottone "Scopri le piante!": sfondo verde scuro `#1A5C25`  
Bottone "Visualizza la mappa": sfondo verde medio `#2E8B3A`  
Entrambi con icona bianca a sinistra e testo bianco.

---

### 6.9 Numerazione step pianta

Cerchio verde con numero bianco, affiancato al nome della pianta nel dettaglio.

```
width: 28px; height: 28px
background: #2E8B3A
border-radius: 50%
color: #FFFFFF
font-size: 13px
font-weight: 700
display: flex; align-items: center; justify-content: center
```

---

### 6.10 Immagine hero pianta (dettaglio)

Immagine fotografica a tutta larghezza con angoli arrotondati.

```
width: 100%
aspect-ratio: 16/9
object-fit: cover
border-radius: 16px
```

---

## 7. Icone

Il progetto usa icone monocromatiche in stile **filled/outlined** con corner radius coerenti. Le principali:

| Icona                  | Uso                                        |
|------------------------|--------------------------------------------|
| 🌿 Foglia / leaf       | Navigazione "Scopri le piante", Orto Siculo |
| 📍 Pin/location        | "Visualizza la mappa", marker mappa         |
| ⏱ Orologio            | Chip durata                                |
| 🌵 Cactus              | Badge Arido                                |
| 🌴 Palma               | Badge Tropicale                            |
| 🏛 Edificio            | Badge Orto Generale                        |
| ✨ Sparkle             | Icona "Percorso Scoperta"                  |
| 👣 Footsteps           | Icona "Percorso Breve"                     |
| 📖 Libro               | Icona "Percorso Studio"                    |
| ⚡ Lampo               | Bottone azione rapida (scanner)            |
| 🔍 Lente               | Input ricerca piante                       |
| < Chevron             | Bottone back                               |
| QR icon               | Bottone scanner QR                         |
| 🏳️ Bandiera IT         | Selettore lingua                           |

> Le icone all'interno dei bottoni primari verdi hanno colore `#FFFFFF`. Le icone nei chip/badge usano il colore della categoria.

---

## 8. Struttura delle schermate (flusso)

Il progetto è articolato in **5 schermate principali**:

| Schermata               | Descrizione                                                       |
|-------------------------|-------------------------------------------------------------------|
| **Home — Scelta percorso** | Hero title + 3 card percorso (Breve, Scoperta, Studio)          |
| **Dettaglio percorso**  | Titolo percorso, chip durata/piante, descrizione, lista piante del percorso, CTA "Inizia il percorso" |
| **Mappa percorso**      | Mappa interattiva full-screen con legenda, Start/End, percorso tratteggiato rosso |
| **Lista piante**        | Barra ricerca + filtri categoria + card lista piante              |
| **Dettaglio pianta**    | Immagine hero, nome, badge categoria, numerazione, descrizione con sezioni "Habitat" e "Curiosità" |

---

## 9. Tono e stile contenuto

- Lingua: italiano
- Tono: informativo, accogliente, divulgativo
- I titoli di sezione nel dettaglio pianta usano parole semplici: **"Habitat"**, **"Curiosità"**
- Nel corpo del testo, alcune parole chiave sono in bold per enfasi visiva
- Le liste puntate usano il bullet standard `•` senza numerazione

---

## 10. Note implementative per il portfolio

Quando questa pagina del portfolio mostra il progetto Orto Botanico:

1. **Usare il verde `#2E8B3A`** come colore dominante degli elementi UI mostrati (mockup, screenshot, frame).
2. **I mockup dovrebbero essere presentati su sfondo bianco o grigio chiaro** (`#F8F8F8`), non su sfondi scuri o colorati, per rispettare l'estetica dell'app.
3. **La font del portfolio per questa sezione** può seguire quella del resto del portfolio, ma gli elementi UI riprodotti nei mockup devono riflettere la tipografia sans-serif del progetto.
4. **I colori di categoria** (giallo tropicale, rosso arido, viola mediterraneo, ecc.) possono essere usati come **accenti decorativi** nella pagina portfolio per richiamare il sistema di zone botaniche.
5. **Non applicare dark mode** a questa sezione: il progetto è interamente white/light.
