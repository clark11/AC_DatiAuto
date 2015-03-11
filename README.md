DATI AUTO per Assetto Corsa - beta
================
PREMESSA: Probabilmente esistono già applicazioni simili (e anche migliori) ma ho creato questa app perchè avevo l'esigenza di avere il cruscotto auto su uno o più dispositivi connessi nella stessa rete (diversi dal pc sul quale stavo giocando)

Applicazione per il gioco Assetto Corsa per trasmettere in tempo reale i dati dell'auto
- Velocità
- Marcia
- RPM
- Tempo giro attuale

# Server Side

Prerequisito: Installare NODE.JS su pc server (anche diverso da pc di gioco)
- Eseguire il file udp.js: 
```
node udp.js 
```
# Game Side

- Copiare la cartella /datiauto/ in /assettocorsa/apps/python/
- Abilitare l'app dal gioco (schermata di attivazione moduli)

E' possibile visualizzare il "cruscotto" direttamente da browser (es: http://localhost:3000) 