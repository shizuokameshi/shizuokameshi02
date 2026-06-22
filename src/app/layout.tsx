import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "天気予報アプリ",
  description: "都市名を検索して現在の天気と週間予報を確認できます",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
