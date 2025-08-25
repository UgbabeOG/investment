"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Suggestion {
  ticker: string;
  reason: string;
}

export function AISuggestions() {
  const [data, setData] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ai/suggestions")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card>
        <CardContent>Loading suggestions...</CardContent>
      </Card>
    );
  if (!data.length)
    return (
      <Card>
        <CardContent>No suggestions available.</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Investment Suggestions</CardTitle>
        <CardDescription>Coins to watch or buy, powered by AI</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-4">
          {data.map((s) => (
            <li key={s.ticker}>
              <b>{s.ticker}</b>: {s.reason}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
