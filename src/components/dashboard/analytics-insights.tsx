"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Analytics {
  totalValue: number;
  profitLoss: number;
  allocation: { ticker: string; percent: number }[];
  history: { date: string; value: number }[];
  risk: { volatility: number; sharpeRatio: number };
}

export function AnalyticsInsights() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/analytics")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card>
        <CardContent>Loading analytics...</CardContent>
      </Card>
    );
  if (!data)
    return (
      <Card>
        <CardContent>No analytics data.</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Analytics</CardTitle>
        <CardDescription>
          Performance, allocation, and risk insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>Total Value: ${data.totalValue.toLocaleString()}</div>
          <div>Profit/Loss: ${data.profitLoss.toLocaleString()}</div>
          <div>Risk (Volatility): {data.risk.volatility}</div>
          <div>Risk (Sharpe Ratio): {data.risk.sharpeRatio}</div>
          <div>Allocation:</div>
          <ul className="ml-4 list-disc">
            {data.allocation.map((a) => (
              <li key={a.ticker}>
                {a.ticker}: {a.percent}%
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
