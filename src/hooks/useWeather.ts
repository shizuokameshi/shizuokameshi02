"use client";

import { useState, useCallback } from "react";
import type { WeatherData, WeatherError } from "@/types/weather";

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  errorMessage: string | null;
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
    errorMessage: null,
  });

  const fetchByCity = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setState({ data: null, loading: true, error: null, errorMessage: null });

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}`);
      const json = await res.json();

      if (!res.ok) {
        setState({
          data: null,
          loading: false,
          error: json.error as WeatherError,
          errorMessage: json.message,
        });
        return;
      }

      setState({ data: json, loading: false, error: null, errorMessage: null });
    } catch {
      setState({
        data: null,
        loading: false,
        error: "NETWORK_ERROR",
        errorMessage: "ネットワークエラーが発生しました",
      });
    }
  }, []);

  const fetchByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        data: null,
        loading: false,
        error: "GEOLOCATION_UNAVAILABLE",
        errorMessage: "このブラウザは位置情報に対応していません",
      });
      return;
    }

    setState({ data: null, loading: true, error: null, errorMessage: null });

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude, longitude } = coords;
          const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
          const json = await res.json();

          if (!res.ok) {
            setState({
              data: null,
              loading: false,
              error: json.error as WeatherError,
              errorMessage: json.message,
            });
            return;
          }

          setState({ data: json, loading: false, error: null, errorMessage: null });
        } catch {
          setState({
            data: null,
            loading: false,
            error: "NETWORK_ERROR",
            errorMessage: "ネットワークエラーが発生しました",
          });
        }
      },
      () => {
        setState({
          data: null,
          loading: false,
          error: "GEOLOCATION_DENIED",
          errorMessage: "位置情報へのアクセスが許可されていません",
        });
      }
    );
  }, []);

  return { ...state, fetchByCity, fetchByLocation };
}
