'use server';

import { CRYPTO_DATA } from "@/lib/constants";
import type { Cryptocurrency, PriceHistoryData } from "@/lib/types";

export async function getCurrentCryptoPrices(): Promise<Cryptocurrency[]> {
  // In a real app, you'd fetch this from an API
  return Promise.resolve(CRYPTO_DATA.map(coin => ({
      ...coin,
      price: coin.price * (1 + (Math.random() - 0.5) * 0.05), // Simulate real-time fluctuation
  })));
}

export async function getCryptoByTicker(ticker: string): Promise<Cryptocurrency | undefined> {
  const coin = CRYPTO_DATA.find(c => c.ticker.toUpperCase() === ticker.toUpperCase());
  if (!coin) return undefined;
  
  // Simulate real-time fluctuation
  return {...coin, price: coin.price * (1 + (Math.random() - 0.5) * 0.05)}
}


export async function getCryptoPriceHistory(ticker: string, period: '7d' | '30d' | '90d' | '1y' | '5y' = '7d'): Promise<string> {
    const coin = await getCryptoByTicker(ticker);
    if (!coin) {
        throw new Error(`Invalid ticker: ${ticker}`);
    }
    const history = coin.priceHistory[period];
    // The Genkit prompt expects a string, so we serialize it.
    return JSON.stringify(history.data.map(p => ({ date: p.date, price: p.price.toFixed(2) })));
}

export async function getCryptoPriceHistoryForChart(ticker: string, period: '7d' | '30d' | '90d' | '1y' | '5y'): Promise<PriceHistoryData | undefined> {
    const coin = await getCryptoByTicker(ticker);
    if (!coin) return undefined;
    return coin.priceHistory[period];
}
