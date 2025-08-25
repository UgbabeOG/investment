'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Cryptocurrency } from '@/lib/types';
import { DollarSign } from 'lucide-react';

interface BuySellModalProps {
  mode: 'buy' | 'sell';
  crypto: Cryptocurrency;
}

export function BuySellModal({ mode, crypto }: BuySellModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const amount = formData.get('amount') as string;
    
    toast({
        title: `Order Placed!`,
        description: `You ${mode === 'buy' ? 'bought' : 'sold'} ${amount} ${crypto.ticker}.`,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === 'buy' ? 'default' : 'outline'} className={mode === 'buy' ? 'bg-green-600 hover:bg-green-700' : ''}>
            {mode === 'buy' ? 'Buy' : 'Sell'} {crypto.ticker}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
            <DialogHeader>
            <DialogTitle>{mode === 'buy' ? 'Buy' : 'Sell'} {crypto.name}</DialogTitle>
            <DialogDescription>
                Enter the amount of {crypto.ticker} you'd like to {mode}.
                Your available balance is $10,000.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                Amount
                </Label>
                <Input id="amount" name="amount" type="number" step="any" className="col-span-3" placeholder={`0.00 ${crypto.ticker}`} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Price</Label>
                <div className="col-span-3 font-medium">${crypto.price.toLocaleString()}</div>
            </div>
            </div>
            <DialogFooter>
            <Button type="submit">Confirm {mode === 'buy' ? 'Purchase' : 'Sale'}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
