import { notFound } from 'next/navigation';
import { getCryptoByTicker } from '@/app/api/services/crypto-price-service';
import { PriceChart } from '@/components/crypto/price-chart';
import { PricePrediction } from '@/components/crypto/price-prediction';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SetAlertForm } from '@/components/crypto/set-alert-form';
import { BuySellModal } from '@/components/crypto/buy-sell-modal';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function CryptoDetailPage({ params }: { params: { ticker: string } }) {
  const crypto = await getCryptoByTicker(params.ticker);

  if (!crypto) {
    notFound();
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 8 : 2,
    }).format(price);
  };

  const formatLargeNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 grid gap-4 md:gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                {crypto.icon}
                <div className='flex-1'>
                    <div className="flex items-center gap-2">
                        <CardTitle>{crypto.name} ({crypto.ticker})</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{formatPrice(crypto.price)}</span>
                        <span className={cn('text-sm font-semibold flex items-center gap-1', crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600')}>
                            {crypto.change24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {crypto.change24h.toFixed(2)}% (24h)
                        </span>
                    </div>
                </div>
                <Button variant="outline" size="icon">
                    <Star className="h-5 w-5 text-muted-foreground" />
                </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                 <div>
                    <p className="text-muted-foreground">Market Cap</p>
                    <p className="font-medium">{formatLargeNumber(crypto.marketCap)}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Volume (24h)</p>
                    <p className="font-medium">{formatLargeNumber(crypto.volume24h)}</p>
                </div>
            </CardContent>
        </Card>
        <PriceChart ticker={crypto.ticker} />
        <PricePrediction ticker={crypto.ticker} />
      </div>
      <div className="lg:col-span-2 grid gap-4 md:gap-8 content-start">
        <Card>
            <CardHeader>
                <CardTitle>Trade {crypto.ticker}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
                <BuySellModal mode="buy" crypto={crypto} />
                <BuySellModal mode="sell" crypto={crypto} />
            </CardContent>
        </Card>
        <SetAlertForm ticker={crypto.ticker} currentPrice={crypto.price} />
      </div>
    </div>
  );
}
