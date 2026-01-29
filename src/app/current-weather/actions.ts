'use server';

import { getCurrentWeather } from '@/ai/flows/current-weather-flow';
import type { CurrentWeatherOutput } from '@/ai/flows/current-weather-flow';

export async function getDynamicWeather(lat: number, lon: number, date: string): Promise<CurrentWeatherOutput> {
  try {
    const result = await getCurrentWeather({ lat, lon, date });
    if (!result) {
      throw new Error('AI service returned no data.');
    }
    return result;
  } catch (error) {
    console.error('Error fetching dynamic weather data:', error);
    throw error;
  }
}
