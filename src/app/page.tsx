"use client";

import { useWeather } from "@/hooks/useWeather";
import { SearchBar } from "@/components/SearchBar";
import { CurrentWeather } from "@/components/CurrentWeather";
import { WeeklyForecast } from "@/components/WeeklyForecast";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function HomePage() {
  const { data, loading, error, fetchByCity, fetchByLocation } = useWeather();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 px-4 py-8 sm:py-12">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="text-center text-white mb-2">
          <h1 className="text-2xl font-bold tracking-wide">🌤 天気予報</h1>
          <p className="text-white/70 text-sm mt-1">都市名を入力して天気を確認</p>
        </div>

        <SearchBar
          onSearch={fetchByCity}
          onLocate={fetchByLocation}
          loading={loading}
        />

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage error={error} />
        )}

        {!loading && data && (
          <>
            <CurrentWeather weather={data.current} />
            <WeeklyForecast forecast={data.forecast} />
          </>
        )}

        {!loading && !data && !error && (
          <div className="text-center text-white/60 mt-8">
            <p className="text-4xl mb-3">🌍</p>
            <p className="text-sm">都市名を入力するか、現在地ボタンを押してください</p>
          </div>
        )}
      </div>
    </main>
  );
}
