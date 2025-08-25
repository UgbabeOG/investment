// Multi-currency support API (option 7)
import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_CURRENCIES = ["USD", "EUR", "NGN", "GBP", "JPY"];

export async function GET(req: NextRequest) {
  // In production, convert portfolio values using real FX rates
  return NextResponse.json({ success: true, data: SUPPORTED_CURRENCIES });
}
