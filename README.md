
# Sentiment-Stock Visualizer Dashboard

Una dashboard interattiva per visualizzare dati di analisi finanziaria e studiare l'impatto del sentimento degli investitori sui rendimenti azionari di settore.

## Caratteristiche

- Design moderno con tema scuro e accenti verdi
- Visualizzazione del Consumer Confidence Index (CCI)
- Grafici interattivi per i rendimenti azionari di settore
- Analisi delle correlazioni tra CCI e rendimenti
- Tabella comparativa dei settori
- Dati in tempo reale tramite Alpha Vantage API
- Layout completamente responsive

## Tecnologie Utilizzate

- React
- Typescript
- Recharts per i grafici
- Tailwind CSS per lo styling
- React Query per la gestione dello stato e delle richieste API
- Lucide React per le icone

## Come Eseguire il Progetto

1. Clonare il repository
2. Installare le dipendenze con `npm install`
3. Avviare il server di sviluppo con `npm run dev`
4. Aprire il browser su `http://localhost:8080`

## API Alpha Vantage

Il progetto utilizza l'API di Alpha Vantage per ottenere dati finanziari in tempo reale. L'API key è già configurata nel servizio.

## Struttura della Dashboard

- **Header**: Selettore di settore e indicatori principali
- **Sidebar**: Navigazione principale
- **Sentiment Overview**: Indice di fiducia dei consumatori
- **Sector Performance**: Grafico delle performance di settore
- **Average Returns**: Rendimenti medi per il settore selezionato
- **CCI vs Returns Trend**: Grafico temporale di correlazione
- **Correlation Summary**: Valore di correlazione per settore
- **Sector Comparison**: Tabella comparativa tra settori

La dashboard visualizza dati per i settori: Tecnologia, Sanità, Finanza, Energia e Beni di Consumo, utilizzando ETF di settore come proxy.

## Note Implementative

- Il Consumer Confidence Index (CCI) è calcolato in base ai dati delle vendite al dettaglio
- I valori di correlazione sono simulati ma potrebbero essere calcolati da dati storici reali
- La dashboard è ottimizzata per schermi di tutte le dimensioni
