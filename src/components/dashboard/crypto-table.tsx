'use client';

import React from 'react';
import Link from 'next/link';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Cryptocurrency } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/use-watchlist';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface CryptoTableProps {
  cryptos: Cryptocurrency[];
  showWatchlistOnly?: boolean;
}

export function CryptoTable({ cryptos, showWatchlistOnly = false }: CryptoTableProps) {
  const { watchlist, toggleWatchlist } = useWatchlist();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };
  
  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(marketCap)
  }

  const filteredCryptos = showWatchlistOnly
    ? cryptos.filter((crypto) => watchlist.includes(crypto.ticker))
    : cryptos;

  return (
    <Card>
        <CardHeader>
            <CardTitle>{showWatchlistOnly ? 'My Watchlist' : 'Market Overview'}</CardTitle>
            <CardDescription>
                {showWatchlistOnly 
                    ? 'Cryptocurrencies you are currently tracking.'
                    : 'An overview of the top cryptocurrencies.'
                }
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredCryptos.map((crypto) => (
                <TableRow key={crypto.id}>
                    <TableCell>
                        <Link href={`/crypto/${crypto.ticker}`}>{crypto.icon}</Link>
                    </TableCell>
                    <TableCell>
                    <Link href={`/crypto/${crypto.ticker}`}>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.ticker}</div>
                    </Link>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatPrice(crypto.price)}</TableCell>
                    <TableCell className="text-right">
                    <Badge variant={crypto.change24h >= 0 ? 'default' : 'destructive'} className={cn(crypto.change24h >=0 ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' : 'bg-red-500/20 text-red-700 hover:bg-red-500/30', 'border-none flex items-center justify-end gap-1 w-24 ml-auto')}>
                        {crypto.change24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {crypto.change24h.toFixed(2)}%
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">{formatMarketCap(crypto.marketCap)}</TableCell>
                    <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => toggleWatchlist(crypto.ticker)}>
                        <Star
                        className={cn(
                            'h-5 w-5',
                            watchlist.includes(crypto.ticker)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-muted-foreground'
                        )}
                        />
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
      </CardContent>
    </Card>
  );
}
