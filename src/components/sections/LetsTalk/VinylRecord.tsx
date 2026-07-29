import { INK } from "./constants";
import type { Social } from "./types";

export function VinylRecord({
  size = 180,
  label,
  spinning = false,
}: {
  size?: number;
  label?: Social;
  spinning?: boolean;
}) {
  const labelR = size * 0.22;
  const grooves = Array.from({ length: 20 }, (_, i) => {
    const r = labelR + 5 + i * ((size / 2 - labelR - 8) / 20);
    return (
      <circle
        key={i}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.045)"
        strokeWidth={0.5}
      />
    );
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        borderRadius: "50%",
        animation: spinning ? "vp-spin 1.8s linear infinite" : "none",
        filter: "drop-shadow(0 14px 20px rgba(0,0,0,.28)) drop-shadow(0 3px 5px rgba(0,0,0,.16))",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block", borderRadius: "50%" }}
      >
        <defs>
          <radialGradient id={`vb${size}`} cx="32%" cy="28%" r="82%">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="35%" stopColor="#161616" />
            <stop offset="70%" stopColor="#060606" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <radialGradient id={`vr${size}`} cx="70%" cy="75%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id={`vs${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,.18)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <mask id={`vm${size}`}>
            <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill="#fff" />
            <circle cx={size / 2} cy={size / 2} r={labelR} fill="#000" />
          </mask>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 0.5} fill={`url(#vb${size})`} />
        {grooves}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth={1}
          strokeDasharray={`${size * 0.4} ${size * 3}`}
          transform={`rotate(-40 ${size / 2} ${size / 2})`}
        />
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill={`url(#vr${size})`} />
        <rect x="0" y="0" width={size} height={size} fill={`url(#vs${size})`} mask={`url(#vm${size})`} />
        <circle cx={size / 2} cy={size / 2} r={labelR} fill="#fafaf7" />
        <circle cx={size / 2} cy={size / 2} r={labelR} fill="none" stroke="rgba(23,23,23,.15)" strokeWidth={0.5} />
        <circle cx={size / 2} cy={size / 2} r={size * 0.012} fill={INK} />
      </svg>
      {label && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: labelR * 2,
              height: labelR * 2,
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "var(--font-poppins), sans-serif",
              color: INK,
              lineHeight: 1.1,
            }}
          >
            <div style={{ fontSize: labelR * 0.28, fontWeight: 700, letterSpacing: 0.5 }}>
              {label.name}
            </div>
            <div style={{ fontSize: labelR * 0.14, marginTop: labelR * 0.06, opacity: 0.55, letterSpacing: 1.2 }}>
              {label.side}
            </div>
            <div style={{ marginTop: labelR * 0.1, width: "50%", height: 1, background: INK, opacity: 0.2 }} />
            <div style={{ fontSize: labelR * 0.12, marginTop: labelR * 0.08, letterSpacing: 1, opacity: 0.7, padding: "0 6px" }}>
              {label.track}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
