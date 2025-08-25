"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function RealtimePrices() {
  const [prices, setPrices] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prices")
      .then((res) => res.json())
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card>
        <CardContent>Loading prices...</CardContent>
      </Card>
    );
  if (!prices)
    return (
      <Card>
        <CardContent>No price data.</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Prices</CardTitle>
        <CardDescription>Popular crypto coins (USD)</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(prices).map(([coin, data]: any) => (
            <li key={coin} className="flex flex-col">
              <span className="font-bold">{coin.toUpperCase()}</span>
              <span>${data.usd}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
