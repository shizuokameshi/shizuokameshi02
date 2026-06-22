export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  weatherId: number;
}

export interface DayForecast {
  date: string;
  dayOfWeek: string;
  high: number;
  low: number;
  description: string;
  icon: string;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: DayForecast[];
}

export type WeatherError =
  | "CITY_NOT_FOUND"
  | "API_ERROR"
  | "GEOLOCATION_DENIED"
  | "GEOLOCATION_UNAVAILABLE"
  | "NETWORK_ERROR";
