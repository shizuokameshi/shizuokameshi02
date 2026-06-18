export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-white/80">
      <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
      <p className="text-sm">天気情報を取得中...</p>
    </div>
  );
}
