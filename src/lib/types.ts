import type { LucideIcon } from "lucide-react";

export interface Cryptocurrency {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  icon: React.ReactElement;
  priceHistory: {
    '7d': PriceHistoryData;
    '30d': PriceHistoryData;
    '90d': PriceHistoryData;
    '1y': PriceHistoryData;
    '5y': PriceHistoryData;
  }
}

export interface PriceHistoryData {
  data: PriceHistoryPoint[];
  change: number;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}
