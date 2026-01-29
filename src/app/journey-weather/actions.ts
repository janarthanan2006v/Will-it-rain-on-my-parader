'use server';
import { getJourneyWeather } from '@/ai/flows/journey-weather-flow';
import type { JourneyWeatherOutput } from '@/ai/flows/journey-weather-flow';

export async function getJourneyWeatherData(from: string, to: string): Promise<JourneyWeatherOutput | null> {
  try {
    if (!from || !to) return null;
    const result = await getJourneyWeather({ from, to });
    return result;
  } catch (error) {
    console.error('Error fetching journey weather data:', error);
    return null;
  }
}
