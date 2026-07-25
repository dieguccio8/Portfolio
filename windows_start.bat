@echo off
echo ==========================================
echo Avvio del progetto in corso...
echo ==========================================

:: 1. Entra nella cartella dove risiede il codice del progetto
cd Code

:: 2. Controlla se le dipendenze sono gia state installate. 
:: Se manca la cartella node_modules, le installa automaticamente.
if not exist "node_modules\" (
    echo.
    echo Prima esecuzione rilevata: Installazione dei pacchetti necessari in corso...
    echo Attendi qualche istante...
    call npm install
)

:: 3. Avvia il server e apri automaticamente il browser
echo.
echo Avvio del server locale...
call npm run dev -- --open

pause