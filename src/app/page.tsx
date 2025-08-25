import { getCurrentCryptoPrices } from "@/app/api/services/crypto-price-service";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
export default async function DashboardPage() {
  const cryptos = await getCurrentCryptoPrices();
  return <DashboardClient cryptos={cryptos} />;
}
