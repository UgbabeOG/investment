'use client';

import React from 'react';
import { DollarSign, BellRing } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

interface SetAlertFormProps {
  ticker: string;
  currentPrice: number;
}

export function SetAlertForm({ ticker, currentPrice }: SetAlertFormProps) {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const price = formData.get('price');
        toast({
            title: "Alert Set!",
            description: `We'll notify you when ${ticker} reaches $${price}.`,
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Price Alert</CardTitle>
        <CardDescription>
          Get notified when {ticker} hits your target price.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="price">Target Price (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="price" name="price" type="number" step="any" placeholder={currentPrice.toString()} className="pl-8" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <BellRing className="mr-2 h-4 w-4" />
            Set Alert
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
