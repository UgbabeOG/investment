// Portfolio analytics & insights API (option 2)
import { NextRequest, NextResponse } from "next/server";

// Dummy data for demonstration
const analytics = {
  totalValue: 12345.67,
  profitLoss: 2345.67,
  allocation: [
    { ticker: "BTC", percent: 50 },
    { ticker: "ETH", percent: 30 },
    { ticker: "SOL", percent: 20 },
  ],
  history: [
    { date: "2025-08-01", value: 10000 },
    { date: "2025-08-15", value: 12000 },
    { date: "2025-08-25", value: 12345.67 },
  ],
  risk: {
    volatility: 0.7,
    sharpeRatio: 1.2,
  },
};

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, data: analytics });
}
