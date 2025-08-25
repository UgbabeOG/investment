import { appRoute } from '@genkit-ai/next';
import { pricePredictionFlow } from '@/ai/flows/price-prediction';

export const POST = appRoute(pricePredictionFlow);

// If GET requests were previously supported, add this to maintain compatibility
export const GET = appRoute(pricePredictionFlow);
