// AI-powered investment suggestions API (option 4)
import { NextRequest, NextResponse } from "next/server";

// Dummy AI suggestion logic for demonstration
const suggestions = [
  {
    ticker: "ETH",
    reason: "Strong upward trend and positive news sentiment.",
  },
  {
    ticker: "SOL",
    reason: "High developer activity and recent ecosystem growth.",
  },
  {
    ticker: "BTC",
    reason: "Market leader, low risk for long-term holding.",
  },
];

export async function GET(req: NextRequest) {
  // In production, call your Genkit AI flow here
  return NextResponse.json({ success: true, data: suggestions });
}
