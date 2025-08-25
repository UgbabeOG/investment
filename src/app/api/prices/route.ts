// API route for real-time price tracking of popular crypto coins
import { NextRequest, NextResponse } from "next/server";

const POPULAR_COINS = [
  "BTC",
  "ETH",
  "SOL",
  "BNB",
  "ADA",
  "XRP",
  "DOGE",
  "AVAX",
  "DOT",
  "MATIC",
];

// Example using CoinGecko public API (no key required)
const COINGECKO_URL = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,cardano,ripple,dogecoin,avalanche-2,polkadot,polygon&vs_currencies=usd`;

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) throw new Error("Failed to fetch prices");
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
