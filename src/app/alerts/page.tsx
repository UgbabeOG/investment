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
  import { Button } from "@/components/ui/button";
  import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
  
  // Mock data for alerts
  const alerts = [
    { id: 1, ticker: 'BTC', targetPrice: 70000, condition: 'above', status: 'active' },
    { id: 2, ticker: 'ETH', targetPrice: 3400, condition: 'below', status: 'active' },
    { id: 3, ticker: 'DOGE', targetPrice: 0.20, condition: 'above', status: 'triggered' },
  ];
  
  export default function AlertsPage() {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>My Price Alerts</CardTitle>
          <CardDescription>
            Manage your active and past price alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="font-medium">{alert.ticker}</div>
                  </TableCell>
                  <TableCell>
                    {`Price is ${alert.condition} ${formatPrice(alert.targetPrice)}`}
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.status === 'active' ? 'default' : 'secondary'} className={alert.status === 'active' ? 'bg-blue-500/20 text-blue-700' : ''}>
                        {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
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
  