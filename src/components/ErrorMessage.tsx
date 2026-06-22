import type { WeatherError } from "@/types/weather";

interface ErrorMessageProps {
  error: WeatherError;
  message?: string | null;
}

const ERROR_CONFIG: Record<WeatherError, { title: string; description: string; icon: string }> = {
  CITY_NOT_FOUND: {
    title: "都市が見つかりません",
    description: "入力した都市名を確認してください。英語表記（例: Tokyo）で入力してください。",
    icon: "🔍",
  },
  API_ERROR: {
    title: "データの取得に失敗しました",
    description: "しばらく時間をおいて再度お試しください。",
    icon: "⚠️",
  },
  GEOLOCATION_DENIED: {
    title: "位置情報が許可されていません",
    description: "ブラウザの設定で位置情報へのアクセスを許可してください。",
    icon: "📍",
  },
  GEOLOCATION_UNAVAILABLE: {
    title: "位置情報を利用できません",
    description: "このブラウザまたはデバイスは位置情報に対応していません。",
    icon: "📡",
  },
  NETWORK_ERROR: {
    title: "ネットワークエラー",
    description: "インターネット接続を確認して再度お試しください。",
    icon: "🌐",
  },
};

export function ErrorMessage({ error, message }: ErrorMessageProps) {
  const config = ERROR_CONFIG[error];

  return (
    <div className="w-full max-w-xl mx-auto bg-red-500/20 backdrop-blur-sm rounded-2xl p-5 text-white shadow">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{config.icon}</span>
        <h3 className="font-bold text-lg">{config.title}</h3>
      </div>
      <p className="text-white/80 text-sm ml-12">{config.description}</p>
      {message && message !== config.title && (
        <p className="text-white/50 text-xs ml-12 mt-1">{message}</p>
      )}
    </div>
  );
}
