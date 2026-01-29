import type { SevenDayForecastData, HourlyForecastData } from '@/lib/types';

export const sevenDayForecast: SevenDayForecastData[] = [
  { day: 'Today', icon: 'cloud-sun', condition: 'Partly Cloudy', tempHigh: 18, tempLow: 10, precip: 20 },
  { day: 'Tue', icon: 'sun', condition: 'Sunny', tempHigh: 20, tempLow: 12, precip: 5 },
  { day: 'Wed', icon: 'cloud-rain', condition: 'Showers', tempHigh: 17, tempLow: 11, precip: 60 },
  { day: 'Thu', icon: 'cloudy', condition: 'Cloudy', tempHigh: 16, tempLow: 9, precip: 30 },
  { day: 'Fri', icon: 'cloud-lightning', condition: 'Thunderstorms', tempHigh: 18, tempLow: 12, precip: 75 },
  { day: 'Sat', icon: 'cloud-drizzle', condition: 'Heavy Rain', tempHigh: 15, tempLow: 10, precip: 90 },
  { day: 'Sun', icon: 'sun', condition: 'Sunny', tempHigh: 21, tempLow: 13, precip: 10 },
];

export const hourlyForecast: HourlyForecastData[] = [
  { time: '10:00', temperature: 14, precipitation: 10 },
  { time: '11:00', temperature: 15, precipitation: 15 },
  { time: '12:00', temperature: 17, precipitation: 20 },
  { time: '13:00', temperature: 18, precipitation: 75 },
  { time: '14:00', temperature: 18, precipitation: 60 },
  { time: '15:00', temperature: 16, precipitation: 40 },
  { time: '16:00', temperature: 15, precipitation: 25 },
];
