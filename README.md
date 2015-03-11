DATI AUTO per Assetto Corsa - beta
================

Applicazione per il gioco Assetto Corsa per trasmettere in tempo reale i dati dell'auto
- Velocità
- RPM
- Tempo giro attuale
- Marcia

# Server Side

Prerequisito: Node.js installato
- Eseguire il file udp.js: 
```
node udp.js 
```
# Game Side

- Copiare la cartella /datiauto/ in /assettocorsa/apps/python/
- Abilitare l'app dal gioco (schermata di attivazione moduli)

E' possibile visualizzare il "cruscotto" direttamente da browser (es: http://localhost:3000) 