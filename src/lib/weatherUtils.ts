import type { CurrentWeather, DayForecast } from "@/types/weather";

const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

export function parseCurrentWeather(data: Record<string, unknown>): CurrentWeather {
  const main = data.main as Record<string, number>;
  const weather = (data.weather as Record<string, unknown>[])[0];
  const wind = data.wind as Record<string, number>;
  const sys = data.sys as Record<string, string>;

  return {
    city: data.name as string,
    country: sys.country,
    temperature: Math.round(main.temp),
    feelsLike: Math.round(main.feels_like),
    humidity: main.humidity,
    windSpeed: Math.round(wind.speed * 3.6),
    description: weather.description as string,
    icon: weather.icon as string,
    weatherId: weather.id as number,
  };
}

export function parseForecast(data: Record<string, unknown>): DayForecast[] {
  const list = data.list as Record<string, unknown>[];

  const dailyMap = new Map<string, {
    highs: number[];
    lows: number[];
    descriptions: string[];
    icons: string[];
    pops: number[];
    date: Date;
  }>();

  for (const item of list) {
    const dt = new Date((item.dt as number) * 1000);
    const dateKey = dt.toISOString().split("T")[0];

    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, {
        highs: [],
        lows: [],
        descriptions: [],
        icons: [],
        pops: [],
        date: dt,
      });
    }

    const entry = dailyMap.get(dateKey)!;
    const main = item.main as Record<string, number>;
    const weather = (item.weather as Record<string, unknown>[])[0];

    entry.highs.push(main.temp_max);
    entry.lows.push(main.temp_min);
    entry.descriptions.push(weather.description as string);
    entry.icons.push(weather.icon as string);
    entry.pops.push((item.pop as number) ?? 0);
  }

  const today = new Date().toISOString().split("T")[0];
  const entries = Array.from(dailyMap.entries())
    .filter(([key]) => key > today)
    .slice(0, 7);

  return entries.map(([, entry]) => {
    const midIndex = Math.floor(entry.icons.length / 2);
    return {
      date: entry.date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }),
      dayOfWeek: DAY_NAMES[entry.date.getDay()],
      high: Math.round(Math.max(...entry.highs)),
      low: Math.round(Math.min(...entry.lows)),
      description: entry.descriptions[midIndex] ?? entry.descriptions[0],
      icon: entry.icons[midIndex] ?? entry.icons[0],
      precipitationProbability: Math.round(Math.max(...entry.pops) * 100),
    };
  });
}
