import type { DayForecast } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";

interface WeeklyForecastProps {
  forecast: DayForecast[];
}

interface ForecastCardProps {
  day: DayForecast;
}

function ForecastCard({ day }: ForecastCardProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[90px] text-white shadow">
      <p className="font-bold text-sm">{day.dayOfWeek}</p>
      <p className="text-white/70 text-xs mb-1">{day.date}</p>
      <WeatherIcon icon={day.icon} description={day.description} size="sm" />
      <p className="text-xs text-blue-200 mt-1">☔ {day.precipitationProbability}%</p>
      <div className="flex gap-2 mt-1 text-sm font-semibold">
        <span>{day.high}°</span>
        <span className="text-white/60">{day.low}°</span>
      </div>
    </div>
  );
}

export function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  if (forecast.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-white font-semibold mb-3 text-sm tracking-wide">週間予報</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.map((day) => (
          <ForecastCard key={day.date + day.dayOfWeek} day={day} />
        ))}
      </div>
    </div>
  );
}
