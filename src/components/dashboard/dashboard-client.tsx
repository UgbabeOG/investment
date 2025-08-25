"use client";
import React from "react";
import { CryptoTable } from "@/components/dashboard/crypto-table";
import { AnalyticsInsights } from "@/components/dashboard/analytics-insights";
import { AISuggestions } from "@/components/dashboard/ai-suggestions";
import { RealtimePrices } from "@/components/dashboard/realtime-prices";
import { EducationContent } from "@/components/dashboard/education-content";
import { CurrencySwitcher } from "@/components/dashboard/currency-switcher";
import { SecurityStatus } from "@/components/dashboard/security-status";

export function DashboardClient({ cryptos }: { cryptos: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <CurrencySwitcher onChange={() => {}} />
        <SecurityStatus />
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <AnalyticsInsights />
        <AISuggestions />
        <RealtimePrices />
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <EducationContent />
      </div>
      <CryptoTable cryptos={cryptos} />
    </div>
  );
}
