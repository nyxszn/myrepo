export function CarArt({
  accent,
  label,
  luxury,
  tall,
}: {
  accent: string;
  label: string;
  luxury?: boolean;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-br ${accent} ${
        tall ? "h-64" : "h-40"
      }`}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
      {luxury && (
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
          Luxury
        </span>
      )}
      <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white/80">
        {label}
      </span>
      <svg
        viewBox="0 0 240 90"
        className={`relative ${tall ? "w-3/4" : "w-4/5"} drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]`}
        fill="none"
      >
        <path
          d="M12 62h216c4 0 6-3 6-7v-8c0-6-4-10-10-12l-33-6-24-16c-4-3-8-4-13-4H85c-6 0-11 2-15 6L52 30l-30 6C12 38 6 44 6 52v3c0 4 2 7 6 7z"
          fill="rgba(0,0,0,0.45)"
        />
        <path
          d="M78 20h44v14H64l14-14zM130 20h32c4 0 7 1 10 3l16 11h-58V20z"
          fill="rgba(255,255,255,0.35)"
        />
        <circle cx="66" cy="63" r="13" fill="#0b0b0c" />
        <circle cx="66" cy="63" r="5" fill="rgba(255,255,255,0.6)" />
        <circle cx="180" cy="63" r="13" fill="#0b0b0c" />
        <circle cx="180" cy="63" r="5" fill="rgba(255,255,255,0.6)" />
      </svg>
    </div>
  );
}
