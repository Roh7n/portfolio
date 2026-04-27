import { VP_EASE, INK, PAPER } from "./constants";
import type { Social } from "./types";
import { CoverArt } from "./CoverArt";

export function CrateSleeve({
  social,
  index,
  total,
  selected,
  onClick,
}: {
  social: Social;
  index: number;
  total: number;
  selected: boolean;
  onClick: () => void;
}) {
  const tilt = -1.5 + index * 0.3;
  return (
    <div
      onClick={onClick}
      className="vp-sleeve"
      style={{
        position: "relative",
        width: "100%",
        marginTop: index === 0 ? 0 : -96,
        transform: `perspective(1000px) rotateX(${48 + tilt}deg) translateY(${selected ? -14 : 0}px)`,
        transformOrigin: "center bottom",
        transition: `transform .5s ${VP_EASE}`,
        cursor: "pointer",
        zIndex: total - index,
      }}
    >
      <div
        style={{
          aspectRatio: "1/1",
          background: PAPER,
          border: "1px solid rgba(23,23,23,.15)",
          borderRadius: 10,
          boxShadow: selected
            ? "0 14px 30px rgba(0,0,0,.18),0 4px 8px rgba(0,0,0,.08)"
            : "0 6px 14px rgba(0,0,0,.10),0 2px 4px rgba(0,0,0,.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            aspectRatio: "1/1",
            background: "radial-gradient(circle at 35% 28%,#2e2e2e 0%,#0a0a0a 55%,#000 100%)",
            borderRadius: "50%",
            boxShadow: "0 3px 8px rgba(0,0,0,.25)",
            zIndex: 2,
          }}
        >
          <div style={{ position: "absolute", inset: "14%", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,.06)" }} />
          <div style={{ position: "absolute", inset: "25%", borderRadius: "50%", border: "0.5px solid rgba(255,255,255,.08)" }} />
          <div
            style={{
              position: "absolute",
              inset: "34%",
              borderRadius: "50%",
              background: PAPER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 6,
              fontWeight: 700,
              color: INK,
            }}
          >
            {social.name.slice(0, 3)}
          </div>
        </div>
        <CoverArt id={social.id} size="sm" />
        {social.id === "leetcode" && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: -6,
              transform: "rotate(12deg)",
              background: INK,
              color: PAPER,
              padding: "2px 8px",
              fontSize: 6,
              fontWeight: 700,
              fontFamily: "var(--font-geist-mono),monospace",
              letterSpacing: 1.2,
              borderRadius: 3,
              boxShadow: "0 2px 4px rgba(0,0,0,.2)",
              zIndex: 3,
            }}
          >
            STAFF PICK
          </div>
        )}
      </div>
    </div>
  );
}
