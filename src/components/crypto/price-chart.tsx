'use client';

import React, { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCryptoPriceHistoryForChart } from '@/app/api/services/crypto-price-service';
import { PriceHistoryData } from '@/lib/types';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '../ui/skeleton';

type TimePeriod = '7d' | '30d' | '90d' | '1y' | '5y';

interface PriceChartProps {
  ticker: string;
}

export function PriceChart({ ticker }: PriceChartProps) {
  const [period, setPeriod] = useState<TimePeriod>('7d');
  const [history, setHistory] = useState<PriceHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const data = await getCryptoPriceHistoryForChart(ticker, period);
      setHistory(data || null);
      setIsLoading(false);
    };
    fetchHistory();
  }, [ticker, period]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };
  
  const chartConfig = {
    price: {
      label: 'Price',
      color: 'hsl(var(--primary))',
    },
  };
  
  const yAxisDomain = history?.data ? [
    Math.min(...history.data.map(p => p.price)) * 0.98,
    Math.max(...history.data.map(p => p.price)) * 1.02
  ] : [0, 100];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Price History</CardTitle>
                <CardDescription>
                    {`Historical price data for ${ticker} over the last ${period}.`}
                </CardDescription>
            </div>
            <Tabs defaultValue="7d" onValueChange={(value) => setPeriod(value as TimePeriod)}>
              <TabsList>
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
                <TabsTrigger value="5y">5Y</TabsTrigger>
              </TabsList>
            </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <Skeleton className="h-[350px] w-full" />
        ) : history && history.data.length > 0 ? (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig}>
                <AreaChart
                  data={history.data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis domain={yAxisDomain} tickFormatter={(value) => formatPrice(Number(value))} orientation="right" tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ stroke: 'hsl(var(--accent))' }} content={<ChartTooltipContent indicator="dot" formatter={(value) => formatPrice(Number(value))}/>} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="var(--color-price)"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[350px] flex items-center justify-center">
            <p className="text-muted-foreground">No historical data available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
