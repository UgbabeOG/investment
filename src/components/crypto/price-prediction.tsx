'use client';

import React, { useState } from 'react';
import { Bot, Zap } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { PricePredictionOutput, predictPrice } from '@/ai/flows/price-prediction';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface PricePredictionProps {
  ticker: string;
}

const initialState: { prediction: PricePredictionOutput | null; error: string | null } = {
  prediction: null,
  error: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Bot className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Predict Price
            </>
          )}
        </Button>
      );
}

export function PricePrediction({ ticker }: PricePredictionProps) {
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const ticker = formData.get('ticker') as string;
    try {
        const prediction = await predictPrice({ ticker });
        return { prediction, error: null };
    } catch(e) {
        console.error(e);
        return { prediction: null, error: "Failed to get prediction."}
    }
  }, initialState);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };
  
  const getConfidenceColor = (score: number) => {
    if (score > 0.8) return 'bg-green-500/20 text-green-700';
    if (score > 0.6) return 'bg-yellow-500/20 text-yellow-700';
    return 'bg-red-500/20 text-red-700';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Price Prediction (24-48h)</CardTitle>
        <CardDescription>
          Use our AI model to get a price prediction based on recent market data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
            <form action={formAction}>
                <input type="hidden" name="ticker" value={ticker} />
                <SubmitButton />
            </form>
            {state.prediction && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardDescription>Predicted Low</CardDescription>
                            <CardTitle className="text-2xl">{formatPrice(state.prediction.low)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardDescription>Predicted High</CardDescription>
                            <CardTitle className="text-2xl">{formatPrice(state.prediction.high)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardDescription>Predicted Avg</CardDescription>
                            <CardTitle className="text-2xl">{formatPrice(state.prediction.average)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardDescription>Confidence</CardDescription>
                            <CardTitle className="text-2xl">
                                <Badge className={`${getConfidenceColor(state.prediction.confidenceScore)} border-none`}>
                                    {(state.prediction.confidenceScore * 100).toFixed(0)}%
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            )}
            {state.error && <p className="text-red-500">{state.error}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
