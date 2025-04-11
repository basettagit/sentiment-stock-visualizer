
import { toast } from 'sonner';

const API_KEY = "298NP5RGYWOAV0EC";
const BASE_URL = "https://www.alphavantage.co/query";

// Interface for stock quote data
export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  latestTradingDay: string;
}

// Interface for retail sales data
export interface RetailSalesData {
  date: string;
  value: number;
}

// Interface for time series data
export interface TimeSeriesData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const fetchStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    const quote = data['Global Quote'];
    
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume']),
      latestTradingDay: quote['07. latest trading day']
    };
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    toast.error(`Failed to fetch data for ${symbol}`);
    throw error;
  }
};

export const fetchRetailSales = async (): Promise<RetailSalesData[]> => {
  try {
    const response = await fetch(`${BASE_URL}?function=RETAIL_SALES&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    return data.data.map((item: any) => ({
      date: item.date,
      value: parseFloat(item.value)
    })).slice(0, 24); // Only last 24 months
  } catch (error) {
    console.error("Error fetching retail sales:", error);
    toast.error('Failed to fetch retail sales data');
    throw error;
  }
};

export const fetchMonthlyTimeSeries = async (symbol: string): Promise<TimeSeriesData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    const timeSeries = data['Monthly Time Series'];
    return Object.keys(timeSeries)
      .map(date => ({
        date,
        open: parseFloat(timeSeries[date]['1. open']),
        high: parseFloat(timeSeries[date]['2. high']),
        low: parseFloat(timeSeries[date]['3. low']),
        close: parseFloat(timeSeries[date]['4. close']),
        volume: parseInt(timeSeries[date]['5. volume'])
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-60); // Take last 60 months
  } catch (error) {
    console.error("Error fetching monthly time series:", error);
    toast.error(`Failed to fetch historical data for ${symbol}`);
    throw error;
  }
};

// Sector symbols mapping
export const sectorETFs = {
  'Technology': 'XLK',
  'Healthcare': 'XLV',
  'Financial': 'XLF', 
  'Energy': 'XLE',
  'Consumer': 'XLP'
};

// Calculate mock sentiment index based on retail sales
export const calculateSentimentIndex = (retailSales: RetailSalesData[]): number => {
  if (retailSales.length === 0) return 100;
  
  // Get the latest month's value
  const latestValue = retailSales[0].value;
  
  // Get average of previous 6 months
  const previousValues = retailSales.slice(1, 7);
  const avgPrevious = previousValues.reduce((sum, item) => sum + item.value, 0) / previousValues.length;
  
  // Calculate percentage change and use it to adjust a base CCI value
  const percentChange = (latestValue - avgPrevious) / avgPrevious;
  
  // Base CCI is 100, adjust by percentage change scaled up
  return 100 + (percentChange * 100);
};
