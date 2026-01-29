'use server';
/**
 * @fileOverview An AI agent that provides a weather forecast for a given location and date.
 *
 * - getCurrentWeather - A function that returns the weather forecast.
 * - CurrentWeatherInput - The input type for the getCurrentWeather function.
 * - CurrentWeatherOutput - The return type for the getCurrentWeather function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CurrentWeatherInputSchema = z.object({
  lat: z.number().describe('The latitude of the location.'),
  lon: z.number().describe('The longitude of the location.'),
  date: z.string().describe('The date for the weather forecast.'),
});
export type CurrentWeatherInput = z.infer<typeof CurrentWeatherInputSchema>;

const CurrentWeatherOutputSchema = z.object({
  locationName: z.string().describe("The name of the location identified from the coordinates."),
  riskScore: z.number().describe('A numerical weather risk score from 0 to 100.'),
  description: z.string().describe('A natural language summary of the weather conditions and risk.'),
  alert: z.object({
    title: z.string().describe('A short, catchy title for a weather alert. Empty string if no alert.'),
    description: z.string().describe('A description of the weather alert. Empty string if no alert.'),
  }),
  rainProbability: z.number().describe('The probability of rain in the next 3 hours, from 0 to 100.'),
});
export type CurrentWeatherOutput = z.infer<typeof CurrentWeatherOutputSchema>;

export async function getCurrentWeather(input: CurrentWeatherInput): Promise<CurrentWeatherOutput> {
  return currentWeatherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'currentWeatherPrompt',
  input: {schema: CurrentWeatherInputSchema},
  output: {schema: CurrentWeatherOutputSchema},
  prompt: `You are a weather expert. Based on the provided latitude: {{{lat}}}, longitude: {{{lon}}}, and date: {{{date}}}, provide a detailed and plausible weather forecast.

First, identify the location (city, region).

Then, generate the following:
1.  A weather risk score from 0 to 100.
2.  A concise, natural language summary explaining the weather conditions and the reasoning for the risk score.
3.  A weather alert if necessary (e.g., heatwave, storm warning). If no alert is needed, provide empty strings for the title and description. Make some interesting alerts.
4.  A percentage probability of rain for the next 3 hours.

Make the weather data interesting and variable.
`,
});

const currentWeatherFlow = ai.defineFlow(
  {
    name: 'currentWeatherFlow',
    inputSchema: CurrentWeatherInputSchema,
    outputSchema: CurrentWeatherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
