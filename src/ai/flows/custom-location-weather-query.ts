'use server';
/**
 * @fileOverview An AI agent that answers a user's question about the weather for a custom location and date.
 *
 * - answerWeatherQuery - A function that answers the weather query.
 * - AnswerWeatherQueryInput - The input type for the answerWeatherQuery function.
 * - AnswerWeatherQueryOutput - The return type for the answerWeatherQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerWeatherQueryInputSchema = z.object({
  location: z.string().describe('The location to get the weather forecast for.'),
  date: z.string().describe('The date to get the weather forecast for.'),
  query: z.string().describe('The personalized question about the weather.'),
});
export type AnswerWeatherQueryInput = z.infer<typeof AnswerWeatherQueryInputSchema>;

const AnswerWeatherQueryOutputSchema = z.object({
  answer: z.string().describe("The answer to the personalized question about the weather. Should be an empty string if no question was asked."),
  riskScore: z.number().describe('A numerical weather risk score from 0 to 100.'),
  description: z.string().describe('A natural language summary of the weather conditions and risk.'),
});
export type AnswerWeatherQueryOutput = z.infer<typeof AnswerWeatherQueryOutputSchema>;

export async function answerWeatherQuery(input: AnswerWeatherQueryInput): Promise<AnswerWeatherQueryOutput> {
  return answerWeatherQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerWeatherQueryPrompt',
  input: {schema: AnswerWeatherQueryInputSchema},
  output: {schema: AnswerWeatherQueryOutputSchema},
  prompt: `You are a weather expert. For the given location and date, provide a detailed and plausible weather forecast.
Also, answer the user's personalized query if one is provided.

Generate the following:
1.  A weather risk score from 0 to 100.
2.  A concise, natural language summary explaining the weather conditions and the reasoning for the risk score.
3.  If the user provided a specific query, answer it. If not, the 'answer' field should contain an empty string.

Location: {{{location}}}
Date: {{{date}}}
Question: {{{query}}}`,
});

const answerWeatherQueryFlow = ai.defineFlow(
  {
    name: 'answerWeatherQueryFlow',
    inputSchema: AnswerWeatherQueryInputSchema,
    outputSchema: AnswerWeatherQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
