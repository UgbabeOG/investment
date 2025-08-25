// Price Prediction Genkit flow.

"use server";

/**
 * @fileOverview Provides AI-powered price predictions for cryptocurrencies.
 *
 * - predictPrice - A function that returns price predictions.
 * - PricePredictionInput - The input type for the predictPrice function.
 * - PricePredictionOutput - The return type for the predictPrice function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";
import { getCryptoPriceHistory } from "@/app/api/services/crypto-price-service";

const PricePredictionInputSchema = z.object({
  ticker: z
    .string()
    .describe("The ticker symbol of the cryptocurrency (e.g., BTC, ETH)."),
});
export type PricePredictionInput = z.infer<typeof PricePredictionInputSchema>;

const PricePredictionOutputSchema = z.object({
  high: z
    .number()
    .describe("The predicted high price for the next 24-48 hours."),
  low: z.number().describe("The predicted low price for the next 24-48 hours."),
  average: z
    .number()
    .describe("The predicted average price for the next 24-48 hours."),
  confidenceScore: z
    .number()
    .describe(
      "A score between 0 and 1 representing the confidence in the prediction."
    ),
});
export type PricePredictionOutput = z.infer<typeof PricePredictionOutputSchema>;

export async function predictPrice(
  input: PricePredictionInput
): Promise<PricePredictionOutput> {
  return pricePredictionFlow(input);
}

const PricePredictionPromptInputSchema = PricePredictionInputSchema.extend({
  priceHistory: z.string().describe("The price history of the cryptocurrency."),
});

const prompt = ai.definePrompt({
  name: "pricePredictionPrompt",
  input: {
    schema: PricePredictionPromptInputSchema,
  },
  output: { schema: PricePredictionOutputSchema },
  prompt: `You are an AI-powered cryptocurrency price prediction expert.

  Given the current market data for {{ticker}}, provide a price prediction for the next 24-48 hours.
  Include a confidence score representing the accuracy of the prediction.

  Here is the price history of {{ticker}}:
  {{priceHistory}}

  Consider factors such as market trends, recent news, and technical indicators.
  Output the prediction in JSON format.
  `,
});

export const pricePredictionFlow = ai.defineFlow(
  {
    name: "pricePredictionFlow",
    inputSchema: PricePredictionInputSchema,
    outputSchema: PricePredictionOutputSchema,
  },
  async (input) => {
    const priceHistory = await getCryptoPriceHistory(input.ticker, "7d");
    const { output } = await prompt({
      ...input,
      priceHistory,
    });
    return output!;
  }
);
