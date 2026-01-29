'use server';

import { answerWeatherQuery } from '@/ai/flows/custom-location-weather-query';
import type { AnswerWeatherQueryOutput } from '@/ai/flows/custom-location-weather-query';
import { z } from 'zod';

const schema = z.object({
  location: z.string().min(1, 'Location is required.'),
  date: z.string().min(1, 'Date is required.'),
  query: z.string().optional(),
});

type State = {
  success: boolean;
  data: AnswerWeatherQueryOutput | null;
  error: string | null;
};

export async function getAiWeatherAnalysis(prevState: State, formData: FormData): Promise<State> {
  try {
    const validatedData = schema.parse({
      location: formData.get('location'),
      date: formData.get('date'),
      query: formData.get('query') || '',
    });

    const result = await answerWeatherQuery(validatedData);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, data: null, error: message };
  }
}
