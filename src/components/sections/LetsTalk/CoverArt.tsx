import type { CSSProperties } from "react";

const base = "absolute inset-0 flex flex-col font-poppins text-ink pointer-events-none";

export function CoverArt({ id, size = "sm" }: { id: string; size?: "sm" | "lg" }) {
  const fs = size === "sm" ? 6.5 : 13;
  const bigFs = size === "sm" ? 16 : 38;
  const pad = size === "sm" ? "6px 7px" : "14px 16px";
  const baseStyle: CSSProperties = { padding: pad, fontSize: fs, letterSpacing: 0.8, lineHeight: 1.1 };

  if (id === "github")
    return (
      <div className={base} style={baseStyle}>
        <div className="flex justify-between">
          <span>001</span>
          <span>GH</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="font-instrument-light italic text-center"
            style={{ fontSize: bigFs, lineHeight: 0.9, letterSpacing: -0.5 }}
          >
            push,
            <br />
            commit
            <br />
            <span className="opacity-50">&amp; merge</span>
          </div>
        </div>
        <div className="flex justify-between opacity-50">
          <span>LP</span>
          <span>A·B</span>
        </div>
      </div>
    );

  if (id === "linkedin")
    return (
      <div
        className={base}
        style={{
          ...baseStyle,
          background: "linear-gradient(180deg,transparent 48%,rgba(23,23,23,.08) 48% 52%,transparent 52%)",
        }}
      >
        <div className="flex justify-between">
          <span>VOL</span>
          <span>002</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-instrument-light" style={{ fontSize: bigFs, lineHeight: 0.95, letterSpacing: -0.5 }}>The</div>
          <div className="font-instrument-light italic" style={{ fontSize: bigFs * 1.3, lineHeight: 0.9, letterSpacing: -1 }}>Network</div>
          <div className="font-instrument-light text-right" style={{ fontSize: bigFs, lineHeight: 0.95, letterSpacing: -0.5 }}>Sessions</div>
        </div>
        <div className="text-center opacity-60" style={{ letterSpacing: 1.4 }}>
          in/rohanbabs
        </div>
      </div>
    );

  if (id === "spotify")
    return (
      <div className={base} style={baseStyle}>
        <div className="flex justify-between">
          <span>B-SIDE</span>
          <span>003</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-[70%] aspect-square">
            {[0.2, 0.45, 0.7, 0.95].map((t, i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{ inset: `${(1 - t) * 50}%`, borderColor: `rgba(23,23,23,${0.2 - i * 0.04})` }}
              />
            ))}
            <div
              className="absolute inset-0 flex items-center justify-center font-instrument-light italic"
              style={{ fontSize: bigFs * 0.6 }}
            >
              24/7
            </div>
          </div>
        </div>
        <div className="text-center opacity-60" style={{ letterSpacing: 1.4 }}>
          on rotation
        </div>
      </div>
    );

  if (id === "leetcode")
    return (
      <div className={base} style={baseStyle}>
        <div className="flex justify-between">
          <span>EP</span>
          <span>004</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="font-instrument-light italic"
            style={{ fontSize: bigFs * 1.8, lineHeight: 0.85, letterSpacing: -2 }}
          >
            LC
          </div>
        </div>
        <div className="flex justify-between opacity-55">
          <span>SOLVE</span>
          <span>·</span>
          <span>REPEAT</span>
        </div>
      </div>
    );

  return null;
}
