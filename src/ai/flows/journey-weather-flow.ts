'use server';
/**
 * @fileOverview An AI agent that provides a weather forecast for a journey between two locations.
 *
 * - getJourneyWeather - A function that returns the journey weather forecast.
 * - JourneyWeatherInput - The input type for the getJourneyWeather function.
 * - JourneyWeatherOutput - The return type for the getJourneyWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const JourneyWeatherInputSchema = z.object({
  from: z.string().describe('The starting point of the journey.'),
  to: z.string().describe('The destination of the journey.'),
});
export type JourneyWeatherInput = z.infer<typeof JourneyWeatherInputSchema>;

const JourneyStepSchema = z.object({
    step: z.number().describe('The step number in the journey.'),
    location: z.string().describe('The name of the location for this step.'),
    risk: z.number().describe('A numerical weather risk score from 0 to 100.'),
    riskLevel: z.enum(['low', 'medium', 'high']).describe('The categorical risk level.'),
    weatherDesc: z.string().describe('A brief description of the weather at this step.'),
    riskExplanation: z.string().describe('An explanation of why the risk score was assigned.'),
});

const JourneyWeatherOutputSchema = z.object({
    summary: z.string().describe('A summary of the overall journey weather.'),
    steps: z.array(JourneyStepSchema).describe('An array of weather forecasts for each step of the journey.'),
});
export type JourneyWeatherOutput = z.infer<typeof JourneyWeatherOutputSchema>;

export async function getJourneyWeather(input: JourneyWeatherInput): Promise<JourneyWeatherOutput> {
  return journeyWeatherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'journeyWeatherPrompt',
  input: { schema: JourneyWeatherInputSchema },
  output: { schema: JourneyWeatherOutputSchema },
  prompt: `You are a weather expert who provides journey forecasts. Generate a plausible weather forecast for a road trip from {{{from}}} to {{{to}}}.

Create a journey plan with 5 distinct steps (locations) between the start and end points.

For each step, provide:
- A step number.
- The location name.
- A weather risk score between 0 and 100.
- A risk level ('low', 'medium', or 'high') based on the score.
- A short weather description.
- A brief explanation for the assigned risk.

Also, provide an overall summary of the weather for the entire journey. Make the weather data interesting and variable, including some steps with higher risk due to conditions like rain or wind.
`,
});

const journeyWeatherFlow = ai.defineFlow(
  {
    name: 'journeyWeatherFlow',
    inputSchema: JourneyWeatherInputSchema,
    outputSchema: JourneyWeatherOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
