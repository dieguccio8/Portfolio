# Analisi UX/UI Italo Treno - Dettaglio per Schermate

Di seguito è riportata l'analisi dettagliata estrapolata dalla board Figma, suddivisa per le singole schermate dell'applicazione.

## 1. Home
* La schermata principale mostra troppe informazioni senza un ordine gerarchico chiaro.
* Il menu inferiore scompare quando si entra in una schermata interna.
* **Priorità dei contenuti**: Sarebbe opportuno dare più importanza agli avvisi cruciali (scioperi, offerte) posizionandoli o evidenziandoli meglio. Il "livello member" andrebbe spostato nella sezione dedicata "Italo Più".
* **Ridondanza nella navigazione**:
  * "Acquista biglietto" è presente sia nella home che nel menu.
  * "I miei viaggi" è duplicato sia nel menu inferiore che in quello laterale.
  * "Italo Più" compare nel menu laterale ben 3 volte e nel menu basso 1 volta.
  * "Carnet" è ripetuto 2 volte nel menu laterale.
  * "Home" e "In viaggio" sono presenti sia nel menu laterale che in quello inferiore.
  * I tasti "I miei viaggi", "Parti ora" e "Biglietti" portano tutti alla stessa schermata.
* **Usabilità del menu**: Il menu laterale è parecchio confusionario, contiene un numero eccessivo di funzioni. Il pulsante "Altro" apre lo stesso menu laterale che si attiva con uno swipe a sinistra.
* **Iconografia**: Le icone presentano stili differenti e molte non sono intuitive. La "D" del profilo non è centrata. Le icone campanella, occhio e profilo hanno tutte dimensioni diverse (l'icona notifiche non rispetta le dimensioni). Inoltre, usare l'icona "occhio" per indicare le ricerche recenti non è pertinente (meglio un orologio).

## 2. Acquista Biglietto
* **Gerarchia Visiva**: Troppe informazioni (biglietti, promozioni, livello utente) senza un ordine gerarchico chiaro. Spaziature troppo strette tra le righe e layout poco fluido.
* **Contrasto e Colori**:
  * La CTA "Scopri di più" è poco visibile perché il colore è troppo simile allo sfondo rosso, creando problemi di contrasto.
  * Uso del rosso per evidenziare il "Miglior Prezzo": il rosso è universalmente associato a errori o avvisi, potrebbe generare confusione.
  * I colori del testo sono troppo uniformi. Sarebbe utile dare colori differenti alle icone dei servizi disponibili per differenziarli.
  * Il pulsante "Aggiungi" ha poco contrasto, sembra testo normale e non un pulsante.
* **Testi e Leggibilità**: 
  * Il testo "07:40 - 08:39" e il titolo della schermata non sono centrati. 
  * I testi sono troppo piccoli, e il prezzo non è evidenziato abbastanza rispetto ad altre informazioni meno rilevanti.
  * Mancano le etichette di spiegazione dei servizi e l'icona non è in linea con il testo. Le etichette nel menu in basso sono molto piccole rispetto alle icone.
* **Elementi di Interfaccia (UI)**:
  * Lo slider orario è poco leggibile, con numeri piccoli e poca chiarezza sulla selezione oraria attuale.
  * Spaziatura incoerente tra i diversi blocchi (Orari, Ambiente di viaggio, ecc).
  * Il tasto "rimuovi" sembra parte del titolo e non un pulsante cliccabile. Il titolo "Filtri" andrebbe centrato.
* **Layout Biglietto**: Ripetizione eccessiva della struttura (ogni sezione appare visivamente identica). I dettagli del biglietto sono monocromatici e non risaltano; bisognerebbe dare più importanza a elementi chiave come Data, Orario e Tratta, mentre la durata del viaggio passa in secondo piano. Il totale andrebbe spostato alla fine (sotto i metodi di pagamento).

## 3. Cerca Biglietto
* Manca una chiara spiegazione su dove trovare il codice biglietto, l'utente potrebbe non sapere cosa e dove cercare per inserirlo.
* È presente un grande spazio vuoto sotto il pulsante, che potrebbe essere ottimizzato inserendo immagini o dettagli utili.

## 4. I Miei Viaggi
* L'area "Acquista biglietto" non è visivamente attraente.
* Nel complesso, la schermata risulta troppo spoglia.

## 5. Italo Più
* **Layout**: Il titolo della schermata non è centrato e le icone non sono allineate verticalmente con le relative etichette.
* **Colore**: Sono presenti solo due colori in tutta l'applicazione, rendendo la vista monotona. Necessità di enfatizzare visivamente il livello dell'utente.
* **Naming**: Il nome "Italo Più" non è intuitivo per i nuovi utenti. Meglio utilizzare un termine più familiare come "Programma fedeltà".

## 6. Offerte
* Il titolo della schermata non è centrato.
* La natura monocromatica della pagina la rende noiosa. Sarebbe opportuno aggiungere delle immagini per differenziare visivamente le varie offerte.

## 7. MiRo
* **Architettura dell'informazione**: Inserire questo servizio all'interno della sezione generale "Offerte" eliminerebbe una voce dal menu che attualmente crea solo confusione.
* **UI**: Aggiungere delle immagini per differenziare visivamente l'offerta e le sue funzioni.

## 8. Viaggiare con Italo
* **Gerarchia Visiva**: Totale assenza di gerarchia del testo e titolo non centrato.
* **Architettura dell'informazione**: Questa sezione si adatterebbe perfettamente come sezione di "Benvenuto", permettendo di eliminarla dal già affollato menu laterale.

## 9. Business First
* I testi sono troppo simili tra loro e creano confusione visiva; il titolo della schermata non è centrato.
* Come per MiRo, si potrebbe accorpare nelle "Offerte" per snellire il menu laterale. L'uso di immagini aiuterebbe a differenziare i contenuti.

## 10. Italo Go
* Aspetto troppo monocromatico: nessun elemento risalta e il titolo non è centrato.
* **Layout**: Meglio posizionare in alto tutti i servizi disponibili e la spiegazione in basso. Si consiglia l'inserimento di immagini e loghi dei servizi nel menu a tendina per aggiungere colore e riconoscibilità.

## 11. Assistenza
* **Disposizione elementi**: "Cerca per categoria" andrebbe posizionato sopra, seguito dalla barra di ricerca, e infine tutte le altre informazioni.
* **Leggibilità**: Necessità di differenziare i colori del testo per migliorare la lettura.

## 12. Italo Live
* Spaziatura minima tra i box delle categorie, che rende la schermata troppo densa e opprimente.
* Mancano le icone accanto alle singole categorie.

## 13. Impostazioni App
* Layout eccessivamente spoglio. Non c'è nessuna sezione per la gestione dell'account o un tasto di logout visibile.
* La lingua è mostrata solo tramite una bandiera, senza un'etichetta testuale.
* L'informazione sulla versione dell'app (es. "rel. 5.3.2") è scritta in piccolo e isolata in basso, una posizione poco intuitiva. Sarebbe meglio integrarla in una sezione "Info app".
* L'intera schermata delle impostazioni potrebbe essere direttamente integrata nella schermata del "Profilo".
