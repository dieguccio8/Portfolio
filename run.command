#!/bin/bash
echo "Preparazione dell'ambiente su Mac in corso..."
cd "$(dirname "$0")"
cd Code

# Installa i pacchetti se necessario
npm install

echo "Apertura del browser in corso..."
# Questo è il comando magico per Mac che forza l'apertura della pagina!
open http://localhost:3000

echo "Avvio del server..."
# Avvia Vite
npm run dev