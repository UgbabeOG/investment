import { getCurrentCryptoPrices } from "@/app/api/services/crypto-price-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DepositModal } from "@/components/portfolio/deposit-modal";
import { PortfolioStats } from "@/components/portfolio/portfolio-stats";

export default async function PortfolioPage() {
  // In a real app, this would be the user's actual holdings
  const holdings = (await getCurrentCryptoPrices()).slice(0, 3).map((coin, i) => ({
    ...coin,
    amount: (10 - i * 3) * (Math.random() + 0.5),
    value: coin.price * (10 - i * 3) * (Math.random() + 0.5)
  }));
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };
  
  const formatAmount = (amount: number, ticker: string) => {
      return `${amount.toFixed(4)} ${ticker}`;
  }

  return (
    <div className="flex flex-col gap-4">
      <PortfolioStats />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>My Assets</CardTitle>
                <CardDescription>A detailed view of your current holdings.</CardDescription>
            </div>
            <DepositModal />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Holdings</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                        {asset.icon}
                        <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatPrice(asset.price)}</TableCell>
                  <TableCell className="text-right">{formatAmount(asset.amount, asset.ticker)}</TableCell>
                  <TableCell className="text-right font-medium">{formatPrice(asset.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
