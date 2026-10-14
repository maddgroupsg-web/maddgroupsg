export function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  );
}

export function GoogleWordmark({ height = 22 }: { height?: number }) {
  // "Google" wordmark in brand colours (text-based, no external asset)
  return (
    <span className="inline-flex items-baseline font-semibold tracking-tight" style={{ fontSize: height, lineHeight: 1, fontFamily: "Product Sans, Inter, system-ui, sans-serif" }} aria-label="Google">
      <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

export function Stars({ value, size = 16, className = "" }: { value: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(value) ? "#FBBC05" : "none"} stroke={i <= Math.round(value) ? "#FBBC05" : "rgba(255,255,255,0.35)"} strokeWidth="1.5"><path d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.3 6 20.6l1.3-6.6L2.4 9.4l6.7-.8z" /></svg>
      ))}
    </span>
  );
}
