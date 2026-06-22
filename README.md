# 天気予報アプリ

都市名を入力すると、現在の天気と週間予報を確認できるWebアプリです。

## 機能

- **都市名検索**: 都市名（英語）を入力して天気を検索
- **現在の天気**: 気温・体感温度・湿度・風速を表示
- **週間予報**: 最高/最低気温・降水確率を日ごとに表示
- **現在地取得**: ブラウザの位置情報から自動取得
- **エラー表示**: 都市未発見・API障害・位置情報拒否などをわかりやすく案内

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **天気API**: [OpenWeatherMap](https://openweathermap.org/api)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. APIキーの設定

[OpenWeatherMap](https://openweathermap.org/appid) で無料アカウントを作成し、APIキーを取得します。

`.env.local.example` をコピーして `.env.local` を作成:

```bash
cp .env.local.example .env.local
```

`.env.local` を編集してAPIキーを設定:

```
OPENWEATHER_API_KEY=あなたのAPIキー
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 使い方

1. 検索バーに都市名を英語で入力（例: `Tokyo`, `Osaka`, `Shizuoka`）
2. 🔍 ボタンまたは Enter キーで検索
3. 📍 ボタンで現在地の天気を取得

## ファイル構成

```
src/
├── app/
│   ├── api/weather/route.ts  # 天気APIプロキシ（APIキー保護）
│   ├── page.tsx              # メインページ
│   ├── layout.tsx            # ルートレイアウト
│   └── globals.css           # グローバルスタイル
├── components/
│   ├── SearchBar.tsx         # 検索バー・現在地ボタン
│   ├── CurrentWeather.tsx    # 現在の天気カード
│   ├── WeeklyForecast.tsx    # 週間予報
│   ├── WeatherIcon.tsx       # 天気アイコン
│   ├── ErrorMessage.tsx      # エラー表示
│   └── LoadingSpinner.tsx    # ローディング表示
├── hooks/
│   └── useWeather.ts         # 天気データ取得フック
├── types/
│   └── weather.ts            # TypeScript型定義
└── lib/
    └── weatherUtils.ts       # APIレスポンスのパース処理
```

## 使用API

- `GET /data/2.5/weather` — 現在の天気（都市名 or 緯度経度）
- `GET /data/2.5/forecast` — 5日間/3時間毎の予報（日ごとに集計して週間表示）

APIキーはサーバーサイドの `/api/weather` ルートのみで使用し、ブラウザには公開されません。
