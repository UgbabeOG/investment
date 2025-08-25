// API route for educational content (option 9)
import { NextRequest, NextResponse } from "next/server";

const EDUCATION_CONTENT = [
  {
    id: 1,
    title: "What is Cryptocurrency?",
    content:
      "A beginner-friendly guide to understanding digital currencies and blockchain.",
  },
  {
    id: 2,
    title: "How to Read Crypto Charts",
    content:
      "Learn the basics of candlestick charts, volume, and technical indicators.",
  },
  {
    id: 3,
    title: "Risk Management in Crypto Investing",
    content: "Tips and strategies to manage risk and avoid common pitfalls.",
  },
  // Add more as needed
];

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, data: EDUCATION_CONTENT });
}
