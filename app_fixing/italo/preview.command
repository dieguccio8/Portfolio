#!/bin/bash
# ==============================================================================
# Preview 1-Click per macOS - Italo Redesign App
# ==============================================================================

# Vai nella cartella dell'applicazione
cd "$(dirname "$0")" || exit

PORT=3344
URL="http://localhost:$PORT/index.html"

echo "=================================================="
echo "  🚄 ITALO REDESIGN APP - PREVIEW LOCALE"
echo "=================================================="
echo "  Directory: $(pwd)"
echo "  Apertura in corso su: $URL"
echo "=================================================="

# Verifica se python3 è disponibile
if command -v python3 >/dev/null 2>&1; then
    # Avvia un server HTTP locale leggero in background
    python3 -m http.server $PORT >/dev/null 2>&1 &
    SERVER_PID=$!
    
    # Attendiamo un istante affinché il server sia pronto
    sleep 0.8
    
    # Apri il browser predefinito di macOS (Safari, Chrome, ecc.)
    open "$URL"
    
    echo "  ✅ App avviata nel browser predefinito!"
    echo "  Premi [CTRL + C] in questa finestra per chiudere il server."
    echo "=================================================="
    
    # Gestisci l'interruzione pulita
    trap "kill $SERVER_PID 2>/dev/null; echo 'Server arrestato.'; exit 0" SIGINT SIGTERM
    wait $SERVER_PID
else
    # Fallback diretto aprendo il file HTML nativamente
    open "index.html"
    echo "  ✅ Aperto index.html nel browser."
fi
