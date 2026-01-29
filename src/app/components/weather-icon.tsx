import { Sun, Cloud, CloudRain, CloudSun, Cloudy, CloudDrizzle, CloudLightning, Wind, Snowflake } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type WeatherIconProps = {
  icon: string;
} & LucideProps;

export function WeatherIcon({ icon, ...props }: WeatherIconProps) {
  switch (icon) {
    case 'sun':
      return <Sun {...props} />;
    case 'cloud-sun':
      return <CloudSun {...props} />;
    case 'cloudy':
      return <Cloudy {...props} />;
    case 'cloud-rain':
      return <CloudRain {...props} />;
    case 'cloud-drizzle':
      return <CloudDrizzle {...props} />;
    case 'cloud-lightning':
      return <CloudLightning {...props} />;
    case 'wind':
      return <Wind {...props} />;
    case 'snowflake':
        return <Snowflake {...props} />;
    default:
      return <Cloud {...props} />;
  }
}
