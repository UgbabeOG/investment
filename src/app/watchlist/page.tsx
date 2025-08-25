import { getCurrentCryptoPrices } from "@/app/api/services/crypto-price-service";
import { CryptoTable } from "@/components/dashboard/crypto-table";

export default async function WatchlistPage() {
  const cryptos = await getCurrentCryptoPrices();

  return (
    <div className="flex flex-col gap-4">
      <CryptoTable cryptos={cryptos} showWatchlistOnly={true} />
    </div>
  );
}
