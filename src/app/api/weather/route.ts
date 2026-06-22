import { NextRequest, NextResponse } from "next/server";
import { parseCurrentWeather, parseForecast } from "@/lib/weatherUtils";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API_ERROR", message: "API key is not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = request.nextUrl;
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  let locationQuery: string;

  if (city) {
    locationQuery = `q=${encodeURIComponent(city)}`;
  } else if (lat && lon) {
    locationQuery = `lat=${lat}&lon=${lon}`;
  } else {
    return NextResponse.json(
      { error: "CITY_NOT_FOUND", message: "city or coordinates required" },
      { status: 400 }
    );
  }

  const params = `${locationQuery}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?${params}`),
      fetch(`${BASE_URL}/forecast?${params}`),
    ]);

    if (currentRes.status === 404) {
      return NextResponse.json(
        { error: "CITY_NOT_FOUND", message: "City not found" },
        { status: 404 }
      );
    }

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json(
        { error: "API_ERROR", message: "Failed to fetch weather data" },
        { status: 500 }
      );
    }

    const [currentData, forecastData] = await Promise.all([
      currentRes.json(),
      forecastRes.json(),
    ]);

    return NextResponse.json({
      current: parseCurrentWeather(currentData),
      forecast: parseForecast(forecastData),
    });
  } catch {
    return NextResponse.json(
      { error: "NETWORK_ERROR", message: "Network error" },
      { status: 500 }
    );
  }
}
