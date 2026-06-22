import type { CurrentWeather as CurrentWeatherType } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

interface StatItemProps {
  label: string;
  value: string;
  icon: string;
}

function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-white/70 text-xs">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-white w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <p className="text-white/80 text-sm">{weather.country}</p>
        </div>
        <WeatherIcon icon={weather.icon} description={weather.description} size="lg" />
      </div>

      <div className="flex items-end gap-3 mb-1">
        <span className="text-7xl font-thin">{weather.temperature}°</span>
        <span className="text-2xl mb-3 capitalize text-white/90">{weather.description}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 sm:grid-cols-4">
        <StatItem label="体感温度" value={`${weather.feelsLike}°C`} icon="🌡️" />
        <StatItem label="湿度" value={`${weather.humidity}%`} icon="💧" />
        <StatItem label="風速" value={`${weather.windSpeed} km/h`} icon="💨" />
      </div>
    </div>
  );
}
