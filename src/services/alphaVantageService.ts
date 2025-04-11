
import { toast } from 'sonner';

// API keys
const ALPHA_VANTAGE_API_KEY = "298NP5RGYWOAV0EC";
const FINANCIAL_MODELING_PREP_API_KEY = "cJzNeDoda6LZsyvIbPFG6pS8y08MC760";
const RAPID_API_KEY = "e0c04b5ebcmshe468badcae64c5cp1112acjsn019d4b851b5d";

// Base URLs
const ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query";
const FINANCIAL_MODELING_PREP_URL = "https://financialmodelingprep.com/api/v3";
const RAPID_API_URL = "https://stock-market-data.p.rapidapi.com";

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

// Interface for sector performance
export interface SectorPerformance {
  sector: string;
  performance: number;
}

// Interface for company profile
export interface CompanyProfile {
  symbol: string;
  name: string;
  description: string;
  industry: string;
  sector: string;
  ceo: string;
  website: string;
  marketCap: number;
  employees: number;
}

// Alpha Vantage API functions
export const fetchStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await fetch(`${ALPHA_VANTAGE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // If we hit the API limit, try with Financial Modeling Prep
    if (data['Information'] && data['Information'].includes('API rate limit')) {
      return fetchStockQuoteFMP(symbol);
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
    console.error("Error fetching stock quote from Alpha Vantage:", error);
    // Fallback to Financial Modeling Prep
    return fetchStockQuoteFMP(symbol);
  }
};

export const fetchRetailSales = async (): Promise<RetailSalesData[]> => {
  try {
    const response = await fetch(`${ALPHA_VANTAGE_URL}?function=RETAIL_SALES&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Check if we hit API limit
    if (data['Information'] && data['Information'].includes('API rate limit')) {
      // For retail sales, we'll use mock data if we hit the limit
      return generateMockRetailSalesData();
    }
    
    return data.data.map((item: any) => ({
      date: item.date,
      value: parseFloat(item.value)
    })).slice(0, 24); // Only last 24 months
  } catch (error) {
    console.error("Error fetching retail sales:", error);
    // Generate mock data as fallback
    return generateMockRetailSalesData();
  }
};

export const fetchMonthlyTimeSeries = async (symbol: string): Promise<TimeSeriesData[]> => {
  try {
    const response = await fetch(
      `${ALPHA_VANTAGE_URL}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Check if we hit API limit
    if (data['Information'] && data['Information'].includes('API rate limit')) {
      // Try with Financial Modeling Prep
      return fetchMonthlyTimeSeriesFMP(symbol);
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
    console.error("Error fetching monthly time series from Alpha Vantage:", error);
    // Try with Financial Modeling Prep as fallback
    return fetchMonthlyTimeSeriesFMP(symbol);
  }
};

// Financial Modeling Prep API functions
export const fetchStockQuoteFMP = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await fetch(`${FINANCIAL_MODELING_PREP_URL}/quote/${symbol}?apikey=${FINANCIAL_MODELING_PREP_API_KEY}`);
    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error("No data returned from FMP");
    }
    
    const quote = data[0];
    
    return {
      symbol: quote.symbol,
      price: quote.price,
      change: quote.change,
      changePercent: quote.changesPercentage,
      open: quote.open,
      high: quote.dayHigh,
      low: quote.dayLow,
      volume: quote.volume,
      latestTradingDay: new Date().toISOString().split('T')[0], // Today's date as string
    };
  } catch (error) {
    console.error("Error fetching stock quote from FMP:", error);
    toast.error(`Failed to fetch data for ${symbol}`);
    throw error;
  }
};

export const fetchMonthlyTimeSeriesFMP = async (symbol: string): Promise<TimeSeriesData[]> => {
  try {
    const response = await fetch(
      `${FINANCIAL_MODELING_PREP_URL}/historical-price-full/${symbol}?serietype=line&apikey=${FINANCIAL_MODELING_PREP_API_KEY}`
    );
    const data = await response.json();
    
    if (!data || !data.historical || data.historical.length === 0) {
      throw new Error("No historical data returned from FMP");
    }
    
    // Take only monthly data by filtering dates (approximately)
    const monthlyData = data.historical
      .filter((_: any, index: number) => index % 30 === 0) // Approximate monthly data
      .map((item: any) => ({
        date: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
      }))
      .slice(-60); // Take last 60 months
    
    return monthlyData;
  } catch (error) {
    console.error("Error fetching monthly time series from FMP:", error);
    toast.error(`Failed to fetch historical data for ${symbol}`);
    // Try RapidAPI as a last resort
    return fetchMonthlyTimeSeriesRapidAPI(symbol);
  }
};

export const fetchSectorPerformanceFMP = async (): Promise<SectorPerformance[]> => {
  try {
    const response = await fetch(
      `${FINANCIAL_MODELING_PREP_URL}/sectors-performance?apikey=${FINANCIAL_MODELING_PREP_API_KEY}`
    );
    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error("No sector performance data returned");
    }
    
    return data.map((item: any) => ({
      sector: item.sector,
      performance: parseFloat(item.changesPercentage.replace('%', ''))
    }));
  } catch (error) {
    console.error("Error fetching sector performance data:", error);
    toast.error("Failed to fetch sector performance data");
    return [];
  }
};

export const fetchCompanyProfileFMP = async (symbol: string): Promise<CompanyProfile> => {
  try {
    const response = await fetch(
      `${FINANCIAL_MODELING_PREP_URL}/profile/${symbol}?apikey=${FINANCIAL_MODELING_PREP_API_KEY}`
    );
    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error("No company profile data returned");
    }
    
    const profile = data[0];
    
    return {
      symbol: profile.symbol,
      name: profile.companyName,
      description: profile.description,
      industry: profile.industry,
      sector: profile.sector,
      ceo: profile.ceo,
      website: profile.website,
      marketCap: profile.mktCap,
      employees: profile.fullTimeEmployees
    };
  } catch (error) {
    console.error("Error fetching company profile:", error);
    toast.error(`Failed to fetch profile for ${symbol}`);
    return {
      symbol,
      name: symbol,
      description: "Information not available",
      industry: "N/A",
      sector: "N/A",
      ceo: "N/A",
      website: "N/A",
      marketCap: 0,
      employees: 0
    };
  }
};

// RapidAPI Stock Market Data functions
export const fetchMonthlyTimeSeriesRapidAPI = async (symbol: string): Promise<TimeSeriesData[]> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'stock-market-data.p.rapidapi.com'
      }
    };
    
    const response = await fetch(
      `${RAPID_API_URL}/stock/history?ticker_symbol=${symbol}&years=5&format=json`, 
      options
    );
    const data = await response.json();
    
    if (!data || !data.historical || data.historical.length === 0) {
      throw new Error("No historical data returned from RapidAPI");
    }
    
    // Process the RapidAPI format into our TimeSeriesData format
    return data.historical
      .filter((_: any, index: number) => index % 30 === 0) // Approximate monthly data
      .map((item: any) => ({
        date: item.date,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
        volume: parseInt(item.volume)
      }))
      .slice(-60); // Take last 60 months
  } catch (error) {
    console.error("Error fetching data from RapidAPI:", error);
    toast.error(`Failed to fetch historical data for ${symbol}`);
    // Last resort - generate mock data
    return generateMockTimeSeriesData(symbol);
  }
};

// Mock data generators (for fallback when all APIs fail)
const generateMockRetailSalesData = (): RetailSalesData[] => {
  const data: RetailSalesData[] = [];
  const today = new Date();
  
  for (let i = 0; i < 24; i++) {
    const date = new Date();
    date.setMonth(today.getMonth() - i);
    
    data.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`,
      value: 500000 + Math.random() * 100000 // Random value between 500k and 600k
    });
  }
  
  toast.info('Using mock retail sales data due to API limitations');
  return data;
};

const generateMockTimeSeriesData = (symbol: string): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const today = new Date();
  let basePrice = 100; // Starting price
  
  for (let i = 59; i >= 0; i--) {
    const date = new Date();
    date.setMonth(today.getMonth() - i);
    
    const volatility = Math.random() * 0.08; // 0-8% volatility
    const directionality = Math.random() > 0.5 ? 1 : -1;
    const change = basePrice * volatility * directionality;
    
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    
    data.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`,
      open,
      high,
      low,
      close,
      volume: Math.floor(1000000 + Math.random() * 9000000) // Random volume between 1M and 10M
    });
    
    basePrice = close; // Set next month's base to this month's close
  }
  
  toast.info(`Using mock time series data for ${symbol} due to API limitations`);
  return data;
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

