export type SevenDayForecastData = {
  day: string;
  icon: string;
  condition: string;
  tempHigh: number;
  tempLow: number;
  precip: number;
};

export type HourlyForecastData = {
  time: string;
  temperature: number;
  precipitation: number;
};

export type JourneyStep = {
  step: number;
  location: string;
  risk: number;
  riskLevel: 'low' | 'medium' | 'high';
  weatherDesc: string;
  riskExplanation: string;
};
