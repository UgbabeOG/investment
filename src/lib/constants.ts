import React from 'react';
import { Cryptocurrency, PriceHistoryPoint } from "@/lib/types";
import { Bitcoin, Waves, DogIcon, Bot } from 'lucide-react';

const generatePriceHistory = (basePrice: number, days: number): PriceHistoryPoint[] => {
  const history: PriceHistoryPoint[] = [];
  let price = basePrice;
  for (let i = days; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const fluctuation = (Math.random() - 0.5) * (price * 0.1);
    price += fluctuation;
    history.push({ date: date.toISOString().split('T')[0], price: Math.max(0, price) });
  }
  return history;
};

const createPriceHistoryForPeriods = (basePrice: number) => {
    const periods = { '7d': 7, '30d': 30, '90d': 90, '1y': 365, '5y': 1825 };
    const histories: any = {};
    Object.entries(periods).forEach(([period, days]) => {
        const data = generatePriceHistory(basePrice, days);
        const change = data.length > 1 ? ((data[data.length - 1].price - data[0].price) / data[0].price) * 100 : 0;
        histories[period] = { data, change };
    });
    return histories;
};

export const CRYPTO_DATA: Cryptocurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC",
    price: 67182.23,
    change24h: 2.5,
    marketCap: 1323000000000,
    volume24h: 45000000000,
    icon: React.createElement(Bitcoin, { className: 'size-8 text-yellow-500' }),
    priceHistory: createPriceHistoryForPeriods(67182.23),
  },
  {
    id: "ethereum",
    name: "Ethereum",
    ticker: "ETH",
    price: 3512.80,
    change24h: -1.2,
    marketCap: 422000000000,
    volume24h: 22000000000,
    icon: React.createElement(Waves, { className: 'size-8 text-blue-500' }),
    priceHistory: createPriceHistoryForPeriods(3512.80),
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    ticker: "DOGE",
    price: 0.158,
    change24h: 5.7,
    marketCap: 22000000000,
    volume24h: 1500000000,
    icon: React.createElement(DogIcon, { className: 'size-8 text-yellow-400' }),
    priceHistory: createPriceHistoryForPeriods(0.158),
  },
  {
    id: "genkicoin",
    name: "GenkiCoin",
    ticker: "GNK",
    price: 42.00,
    change24h: 10.0,
    marketCap: 1000000000,
    volume24h: 50000000,
    icon: React.createElement(Bot, { className: 'size-8 text-purple-500' }),
    priceHistory: createPriceHistoryForPeriods(42.00),
  },
];

export const SAMPLE_WALLET_ADDRESS = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
