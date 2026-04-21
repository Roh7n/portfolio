"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

const VP_EASE = "cubic-bezier(.22,.8,.24,1)";
const INK = "#171717";
const PAPER = "#fafaf9";

const SOCIALS = [
  {
    id: "github",
    name: "GITHUB",
    side: "SIDE A",
    track: "PUSH · COMMIT · MERGE",
    url: "https://github.com/Roh7n",
    handle: "@Roh7n",
  },
  {
    id: "linkedin",
    name: "LINKEDIN",
    side: "SIDE B",
    track: "CONNECT · NETWORK",
    url: "https://www.linkedin.com/in/rohanbabs4446/",
    handle: "in/rohanbabs4446",
  },
  {
    id: "spotify",
    name: "SPOTIFY",
    side: "SIDE A",
    track: "NOW PLAYING · 24/7",
    url: "https://open.spotify.com/user/ijadvlczrnqbc4bikpzcwd118?si=c8e1a613a35949b9",
    handle: "user/ijadvlcz…",
  },
  {
    id: "leetcode",
    name: "LEETCODE",
    side: "SIDE B",
    track: "SOLVE · REPEAT",
    url: "https://leetcode.com/u/qPPvFRjNbm/",
    handle: "u/qPPvFRjNbm",
  },
] as const;

type Social = (typeof SOCIALS)[number];

type NowPlayingData =
  | { isPlaying: false }
  | {
      isPlaying: true;
      title: string;
      artist: string;
      album: string;
      albumArt?: string;
      songUrl: string;
      progressMs: number;
      durationMs: number;
    };

/* ── WebAudio vinyl crackle ─────────────────────────────────────────── */
const VinylAudio = (() => {
  let ctx: AudioContext | null = null;
  let gainNode: GainNode | null = null;
  let src: AudioBufferSourceNode | null = null;
  let running = false;

  function buildBuf(c: AudioContext, secs = 4) {
    const rate = c.sampleRate;
    const len = Math.floor(rate * secs);
    const buf = c.createBuffer(1, len, rate);
    const d = buf.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.05 * 0.35;
      b6 = w * 0.115926;
    }
    for (let p = 0; p < secs * 6; p++) {
      const at = Math.floor(Math.random() * len);
      const w = 80 + Math.floor(Math.random() * 220);
      const amp = (0.4 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1);
      for (let j = 0; j < w && at + j < len; j++)
        d[at + j] +=
          amp * Math.exp(-j / (w * 0.25)) * (Math.random() * 0.5 + 0.5);
    }
    return buf;
  }

  return {
    async start(vol = 0.4) {
      if (running) return;
      try {
        if (!ctx)
          ctx = new (
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext
          )();
        if (ctx.state === "suspended") await ctx.resume();
        src = ctx.createBufferSource();
        src.buffer = buildBuf(ctx);
        src.loop = true;
        gainNode = ctx.createGain();
        gainNode.gain.value = 0;
        src.connect(gainNode).connect(ctx.destination);
        src.start();
        running = true;
        gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.25);
      } catch {}
    },
    stop() {
      if (!running || !ctx || !gainNode || !src) return;
      const now = ctx.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      const s = src;
      setTimeout(() => {
        try {
          s.stop();
        } catch {}
      }, 260);
      running = false;
    },
  };
})();

/* ── CoverArt ───────────────────────────────────────────────────────── */
function CoverArt({ id, size = "sm" }: { id: string; size?: "sm" | "lg" }) {
  const S = {
    padding: size === "sm" ? "6px 7px" : "14px 16px",
    fs: size === "sm" ? 6.5 : 13,
    bigFs: size === "sm" ? 16 : 38,
  };
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    padding: S.padding,
    fontFamily: "var(--font-geist-mono), monospace",
    color: INK,
    fontSize: S.fs,
    letterSpacing: 0.8,
    lineHeight: 1.1,
    pointerEvents: "none",
  };

  if (id === "github")
    return (
      <div style={base}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>001</span>
          <span>GH</span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-instrument-light), serif",
              fontSize: S.bigFs,
              fontStyle: "italic",
              lineHeight: 0.9,
              textAlign: "center",
              letterSpacing: -0.5,
            }}
          >
            push,
            <br />
            commit
            <br />
            <span style={{ opacity: 0.5 }}>&amp; merge</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.5,
          }}
        >
          <span>LP</span>
          <span>A·B</span>
        </div>
      </div>
    );
  if (id === "linkedin")
    return (
      <div
        style={{
          ...base,
          background:
            "linear-gradient(180deg,transparent 48%,rgba(23,23,23,.08) 48% 52%,transparent 52%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>VOL</span>
          <span>002</span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-instrument-light), serif",
              fontSize: S.bigFs,
              lineHeight: 0.95,
              letterSpacing: -0.5,
            }}
          >
            The
          </div>
          <div
            style={{
              fontFamily: "var(--font-instrument-light), serif",
              fontSize: S.bigFs * 1.3,
              lineHeight: 0.9,
              letterSpacing: -1,
              fontStyle: "italic",
            }}
          >
            Network
          </div>
          <div
            style={{
              fontFamily: "var(--font-instrument-light), serif",
              fontSize: S.bigFs,
              lineHeight: 0.95,
              letterSpacing: -0.5,
              textAlign: "right",
            }}
          >
            Sessions
          </div>
        </div>
        <div style={{ textAlign: "center", opacity: 0.6, letterSpacing: 1.4 }}>
          in/rohanbabs
        </div>
      </div>
    );
  if (id === "spotify")
    return (
      <div style={base}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>B-SIDE</span>
          <span>003</span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ position: "relative", width: "70%", aspectRatio: "1/1" }}
          >
            {[0.2, 0.45, 0.7, 0.95].map((t, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: `${(1 - t) * 50}%`,
                  border: `1px solid rgba(23,23,23,${0.2 - i * 0.04})`,
                  borderRadius: "50%",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-instrument-light), serif",
                fontStyle: "italic",
                fontSize: S.bigFs * 0.6,
              }}
            >
              24/7
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", opacity: 0.6, letterSpacing: 1.4 }}>
          on rotation
        </div>
      </div>
    );
  if (id === "leetcode")
    return (
      <div style={base}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>EP</span>
          <span>004</span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-instrument-light), serif",
              fontSize: S.bigFs * 1.8,
              lineHeight: 0.85,
              letterSpacing: -2,
              fontStyle: "italic",
            }}
          >
            LC
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.55,
          }}
        >
          <span>SOLVE</span>
          <span>·</span>
          <span>REPEAT</span>
        </div>
      </div>
    );
  return null;
}

/* ── Record (vinyl disc) ────────────────────────────────────────────── */
function VinylRecord({
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
        filter:
          "drop-shadow(0 14px 20px rgba(0,0,0,.28)) drop-shadow(0 3px 5px rgba(0,0,0,.16))",
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 0.5}
          fill={`url(#vb${size})`}
        />
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1}
          fill={`url(#vr${size})`}
        />
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          fill={`url(#vs${size})`}
          mask={`url(#vm${size})`}
        />
        <circle cx={size / 2} cy={size / 2} r={labelR} fill="#fafaf7" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={labelR}
          fill="none"
          stroke="rgba(23,23,23,.15)"
          strokeWidth={0.5}
        />
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
              fontFamily: "var(--font-geist-mono),monospace",
              color: INK,
              lineHeight: 1.1,
            }}
          >
            <div
              style={{
                fontSize: labelR * 0.28,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              {label.name}
            </div>
            <div
              style={{
                fontSize: labelR * 0.14,
                marginTop: labelR * 0.06,
                opacity: 0.55,
                letterSpacing: 1.2,
              }}
            >
              {label.side}
            </div>
            <div
              style={{
                marginTop: labelR * 0.1,
                width: "50%",
                height: 1,
                background: INK,
                opacity: 0.2,
              }}
            />
            <div
              style={{
                fontSize: labelR * 0.12,
                marginTop: labelR * 0.08,
                letterSpacing: 1,
                opacity: 0.7,
                padding: "0 6px",
              }}
            >
              {label.track}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── CrateSleeve ────────────────────────────────────────────────────── */
function CrateSleeve({
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
            background:
              "radial-gradient(circle at 35% 28%,#2e2e2e 0%,#0a0a0a 55%,#000 100%)",
            borderRadius: "50%",
            boxShadow: "0 3px 8px rgba(0,0,0,.25)",
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "14%",
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "25%",
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,.08)",
            }}
          />
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

/* ── Crate ──────────────────────────────────────────────────────────── */
function Crate({
  socials,
  selectedId,
  onPick,
  hideId,
}: {
  socials: typeof SOCIALS;
  selectedId: string | null;
  onPick: (s: Social) => void;
  hideId: string | null;
}) {
  return (
    <div style={{ width: "100%", maxWidth: 220, perspective: 1000 }}>
      <div
        style={{
          position: "relative",
          padding: "22px 18px 20px",
          background: "#fff",
          borderRadius: 14,
          border: "1px solid rgba(23,23,23,.10)",
          boxShadow:
            "0 22px 40px rgba(0,0,0,.10),0 6px 14px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.8)",
          transform: "perspective(1200px) rotateY(-4deg) rotateX(1deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -10,
            left: 14,
            background: INK,
            color: PAPER,
            padding: "2px 10px",
            fontSize: 9,
            fontFamily: "var(--font-geist-mono),monospace",
            letterSpacing: 1.6,
            borderRadius: 5,
          }}
        >
          THE COLLECTION
        </div>
        <div style={{ paddingTop: 10 }}>
          {socials.map((s, i) => (
            <div
              key={s.id}
              style={{ visibility: hideId === s.id ? "hidden" : "visible" }}
            >
              <CrateSleeve
                social={s}
                index={i}
                total={socials.length}
                selected={selectedId === s.id}
                onClick={() => onPick(s)}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: "var(--font-geist-mono),monospace",
          fontSize: 9,
          letterSpacing: 1.4,
          color: INK,
          opacity: 0.5,
        }}
      >
        ← TAP A RECORD
      </div>
    </div>
  );
}

/* ── Turntable ──────────────────────────────────────────────────────── */
function Turntable({
  loadedSocial,
  playing,
  onPlay,
  armAngle,
  onArmDrag,
  onArmRelease,
  armDragging,
}: {
  loadedSocial: Social | null;
  playing: boolean;
  onPlay: () => void;
  armAngle: number;
  onArmDrag: (a: number) => void;
  onArmRelease: () => void;
  armDragging: boolean;
}) {
  const armRef = useRef<HTMLDivElement>(null);

  const handleArmDown = (e: React.PointerEvent) => {
    if (!loadedSocial || playing) return;
    e.preventDefault();
    const base = armRef.current?.getBoundingClientRect();
    if (!base) return;
    const pivotX = base.right,
      pivotY = base.top;
    const onMove = (ev: PointerEvent) => {
      let ang =
        (Math.atan2(-(ev.clientX - pivotX), ev.clientY - pivotY) * 180) /
        Math.PI;
      onArmDrag(Math.max(-30, Math.min(30, ang)));
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      onArmRelease();
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 440,
        position: "relative",
        transform: "perspective(1400px) rotateX(2deg) rotateY(2deg)",
      }}
    >
      <div
        style={{
          background: PAPER,
          borderRadius: 18,
          border: "1px solid rgba(23,23,23,.10)",
          boxShadow:
            "0 24px 40px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(23,23,23,.06)",
          padding: 22,
          display: "grid",
          gridTemplateColumns: "1fr 140px",
          gap: 18,
          alignItems: "start",
          position: "relative",
        }}
      >
        {/* platter */}
        <div style={{ position: "relative", aspectRatio: "1/1" }}>
          <div
            data-vp-platter
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 30%,#efece5 0%,#e4e0d6 55%,#d4cfc2 100%)",
              boxShadow:
                "inset 0 4px 10px rgba(0,0,0,.10),inset 0 -2px 6px rgba(0,0,0,.08),0 2px 4px rgba(255,255,255,.6)",
              border: "1px solid rgba(23,23,23,.08)",
            }}
          >
            {[0.12, 0.28, 0.45, 0.65, 0.82].map((t, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: `${t * 50}%`,
                  borderRadius: "50%",
                  border: "1px solid rgba(23,23,23,.04)",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 7,
                height: 7,
                marginLeft: -3.5,
                marginTop: -3.5,
                background: INK,
                borderRadius: "50%",
                zIndex: 2,
                boxShadow: "0 0 0 1px rgba(0,0,0,.3),0 2px 3px rgba(0,0,0,.2)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: -4,
              bottom: -4,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(23,23,23,.15)",
              boxShadow:
                "0 3px 6px rgba(0,0,0,.10),inset 0 1px 0 rgba(255,255,255,.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 8,
              fontWeight: 700,
              color: INK,
            }}
          >
            33⅓
          </div>
        </div>

        {/* tonearm + controls */}
        <div style={{ position: "relative", height: "100%", minHeight: 200 }}>
          <div
            ref={armRef}
            style={{
              position: "absolute",
              top: 8,
              right: 4,
              width: 18,
              height: 18,
              background: "radial-gradient(circle at 35% 35%,#3a3a3a,#0e0e0e)",
              borderRadius: "50%",
              zIndex: 3,
              boxShadow:
                "0 2px 4px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.2)",
            }}
          />
          <div
            onPointerDown={handleArmDown}
            style={{
              position: "absolute",
              top: 12,
              right: 8,
              width: 14,
              height: 150,
              transformOrigin: "top right",
              transform: `rotate(${armAngle}deg)`,
              transition: armDragging ? "none" : `transform 1.1s ${VP_EASE}`,
              zIndex: 2,
              cursor:
                loadedSocial && !playing
                  ? armDragging
                    ? "grabbing"
                    : "grab"
                  : "default",
              paddingLeft: 6,
              paddingRight: 6,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 6,
                width: 2.5,
                height: 140,
                background: "linear-gradient(to bottom,#2a2a2a,#111)",
                borderRadius: 2,
                boxShadow: "0 1px 2px rgba(0,0,0,.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: -6,
                width: 26,
                height: 14,
                background: "linear-gradient(to bottom,#2a2a2a,#0a0a0a)",
                borderRadius: 3,
                boxShadow: "0 2px 3px rgba(0,0,0,.3)",
              }}
            />
          </div>
          {/* pitch slider */}
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 36,
              width: 12,
              height: 100,
              borderRadius: 6,
              background: "#fff",
              border: "1px solid rgba(23,23,23,.12)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -4,
                right: -4,
                top: "50%",
                height: 8,
                borderRadius: 3,
                background: "linear-gradient(to bottom,#2a2a2a,#0a0a0a)",
                transform: "translateY(-50%)",
                boxShadow: "0 1px 2px rgba(0,0,0,.25)",
              }}
            />
            {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: -6,
                  right: -6,
                  top: `${t * 100}%`,
                  height: 1,
                  background: INK,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
          {/* power lamp */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 4,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: playing ? "#1db954" : "#fff",
                border: "1px solid rgba(23,23,23,.2)",
                boxShadow: playing
                  ? "0 0 8px rgba(29,185,84,.7)"
                  : "inset 0 1px 1px rgba(0,0,0,.08)",
                transition: "all .2s",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono),monospace",
                fontSize: 8,
                letterSpacing: 1.2,
                color: INK,
              }}
            >
              {playing ? "ON AIR" : "STANDBY"}
            </span>
          </div>
          {/* PLAY */}
          <button
            onClick={onPlay}
            disabled={!loadedSocial}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "11px 14px",
              background: loadedSocial ? INK : PAPER,
              color: loadedSocial ? PAPER : INK,
              border: loadedSocial ? "none" : "1px solid rgba(23,23,23,.15)",
              borderRadius: 10,
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 11,
              letterSpacing: 1.6,
              fontWeight: 700,
              cursor: loadedSocial ? "pointer" : "not-allowed",
              opacity: loadedSocial ? 1 : 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all .15s",
              boxShadow: loadedSocial ? "0 6px 14px rgba(0,0,0,.20)" : "none",
            }}
          >
            <span
              style={{
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: `8px solid ${loadedSocial ? PAPER : INK}`,
              }}
            />
            {playing ? "PLAYING…" : "PLAY"}
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-instrument-light),serif",
            fontSize: 10,
            letterSpacing: 3,
            fontStyle: "italic",
            color: INK,
            opacity: 0.6,
          }}
        >
          model 7 · direct drive
        </div>
      </div>
    </div>
  );
}

/* ── Grain overlay ──────────────────────────────────────────────────── */
function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "multiply",
        opacity: 0.12,
        zIndex: 50,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        backgroundSize: "220px 220px",
      }}
    />
  );
}

/* ── Flying record ──────────────────────────────────────────────────── */
function FlyingRecord({
  social,
  phase,
  from,
  to,
  size,
}: {
  social: Social | null;
  phase: string;
  from: { x: number; y: number } | null;
  to: { x: number; y: number } | null;
  size: number;
}) {
  const isOut = phase === "settled" || phase === "out";
  const pos = isOut ? to : from;
  if (!social || !from || !to) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: size,
        height: size,
        transform: `translate(${pos!.x}px,${pos!.y}px) rotate(${isOut ? 180 : 0}deg)`,
        transition: `transform 1.05s ${VP_EASE}`,
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <VinylRecord size={size} label={social} spinning={phase === "settled"} />
    </div>
  );
}

/* ── EQ bar ─────────────────────────────────────────────────────────── */
function EqBar({ delay }: { delay: number }) {
  return (
    <div
      style={{
        width: 2,
        height: "100%",
        background: "#1DB954",
        borderRadius: 1,
        animation: `vp-eq 0.8s ease-in-out ${delay}s infinite`,
        transformOrigin: "bottom",
      }}
    />
  );
}

function fmtT(s: number) {
  s = Math.floor(s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/* ── Side panel ─────────────────────────────────────────────────────── */
function SidePanel({
  nowSelected,
  playing,
}: {
  nowSelected: Social | null;
  playing: boolean;
}) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    const fetchNow = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data: NowPlayingData = await res.json();
        setNowPlaying(data);
      } catch {}
    };
    fetchNow();
    const id = setInterval(fetchNow, 30_000);
    return () => clearInterval(id);
  }, []);

  const commits = [
    {
      repo: "portfolio",
      msg: "feat: ship vinyl contact section",
      when: "2h",
      sha: "a4f1e8c",
      add: 184,
      del: 23,
    },
    {
      repo: "portfolio",
      msg: "refactor(hero): trim scroll handlers",
      when: "1d",
      sha: "7c2d9b0",
      add: 42,
      del: 58,
    },
    {
      repo: "notes-app",
      msg: "fix: markdown paste strips inline styles",
      when: "3d",
      sha: "0e5a6f2",
      add: 12,
      del: 4,
    },
  ];

  const [ci, setCi] = useState(0);
  const commit = commits[ci];
  const np = nowPlaying?.isPlaying ? nowPlaying : null;
  const progress = np ? np.progressMs / np.durationMs : 0;

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid rgba(23,23,23,.10)",
    borderRadius: 14,
    padding: "18px 18px 44px",
    color: INK,
    boxShadow:
      "0 1px 0 rgba(23,23,23,.02),0 10px 24px -18px rgba(23,23,23,.25)",
    position: "relative",
  };
  const lbl: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono),monospace",
    fontSize: 8.5,
    letterSpacing: 1.6,
    color: INK,
    opacity: 0.55,
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 6,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        paddingTop: 4,
      }}
    >
      {/* Now Loaded */}
      <div
        style={{
          ...card,
          padding: "18px",
          background: nowSelected ? "#fff" : "transparent",
          border: nowSelected
            ? "1px solid rgba(23,23,23,.10)"
            : "1px dashed rgba(23,23,23,.18)",
          boxShadow: nowSelected ? card.boxShadow : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: nowSelected ? 14 : 0,
          }}
        >
          <div style={lbl}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: nowSelected ? "#e25822" : INK,
                opacity: nowSelected ? 1 : 0.3,
                boxShadow: nowSelected ? "0 0 6px rgba(226,88,34,.6)" : "none",
                animation:
                  nowSelected && playing
                    ? "vp-pulse 1.2s ease-out infinite"
                    : "none",
                display: "inline-block",
              }}
            />
            {nowSelected ? "NOW LOADED" : "NO RECORD LOADED"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 8.5,
              letterSpacing: 1,
              opacity: 0.4,
            }}
          >
            {nowSelected
              ? playing
                ? "► PLAYING"
                : "SIDE " + nowSelected.side
              : "— —"}
          </div>
        </div>
        {nowSelected && (
          <div>
            <div
              style={{
                fontFamily: "var(--font-instrument-light),serif",
                fontSize: 22,
                letterSpacing: -0.4,
                lineHeight: 1,
                color: INK,
                fontStyle: "italic",
              }}
            >
              {nowSelected.name.charAt(0) +
                nowSelected.name.slice(1).toLowerCase()}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: "var(--font-geist-mono),monospace",
                fontSize: 10,
                letterSpacing: 0.8,
                color: INK,
                opacity: 0.6,
              }}
            >
              {nowSelected.handle}
            </div>
          </div>
        )}
      </div>

      {/* Now Playing */}
      <div style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={lbl}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: np ? "#1DB954" : INK,
                opacity: np ? 1 : 0.3,
                display: "inline-block",
                animation: np ? "vp-pulse 1.6s ease-out infinite" : "none",
              }}
            />
            {nowPlaying === null
              ? "LOADING…"
              : np
                ? "NOW PLAYING"
                : "NOT PLAYING"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 8.5,
              letterSpacing: 1,
              opacity: 0.4,
            }}
          >
            SPOTIFY
          </div>
        </div>
        {np ? (
          <>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  flexShrink: 0,
                  borderRadius: 6,
                  background: "linear-gradient(135deg,#2a2a2a 0%,#0f0f0f 100%)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,.04),0 3px 8px rgba(0,0,0,.15)",
                }}
              >
                {np.albumArt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={np.albumArt}
                    alt={np.album}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(circle at 50%,transparent 18%,rgba(255,255,255,.06) 19%,transparent 20%),radial-gradient(circle at 50%,transparent 30%,rgba(255,255,255,.04) 31%,transparent 32%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-instrument-light),serif",
                        fontStyle: "italic",
                        fontSize: 24,
                        color: "rgba(255,255,255,.85)",
                        lineHeight: 1,
                      }}
                    >
                      {np.title.charAt(0)}
                    </div>
                  </>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
                <div
                  style={{
                    fontFamily: "var(--font-instrument-light),serif",
                    fontSize: 18,
                    lineHeight: 1.15,
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {np.title}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    opacity: 0.65,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {np.artist}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono),monospace",
                    fontSize: 8.5,
                    letterSpacing: 0.8,
                    opacity: 0.4,
                    marginTop: 6,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {np.album.toUpperCase()}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  height: 2,
                  background: "rgba(23,23,23,.08)",
                  borderRadius: 2,
                  overflow: "visible",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress * 100}%`,
                    background: INK,
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: `calc(${progress * 100}% - 4px)`,
                    top: -3,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: INK,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-geist-mono),monospace",
                  fontSize: 8.5,
                  letterSpacing: 0.8,
                  opacity: 0.5,
                  marginTop: 7,
                }}
              >
                <span>{fmtT(np.progressMs / 1000)}</span>
                <span>{fmtT(np.durationMs / 1000)}</span>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 18,
                right: 66,
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                height: 10,
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <EqBar key={i} delay={i * 0.15} />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              fontFamily: "var(--font-instrument-light),serif",
              fontStyle: "italic",
              fontSize: 15,
              opacity: 0.4,
              paddingBottom: 8,
            }}
          >
            {nowPlaying === null ? "Fetching…" : "Nothing on the platter."}
          </div>
        )}
      </div>

      {/* Latest Commit */}
      <div style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={lbl}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: INK,
                opacity: 0.4,
                display: "inline-block",
              }}
            />
            LATEST COMMIT
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 8.5,
              letterSpacing: 1,
              opacity: 0.4,
            }}
          >
            {commit.when} AGO
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-instrument-light),serif",
            fontStyle: "italic",
            fontSize: 16,
            lineHeight: 1.35,
            letterSpacing: -0.3,
            marginBottom: 16,
          }}
        >
          &ldquo;{commit.msg}&rdquo;
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-geist-mono),monospace",
            fontSize: 9,
            letterSpacing: 0.8,
            opacity: 0.6,
            borderTop: "1px solid rgba(23,23,23,.08)",
            paddingTop: 12,
          }}
        >
          <span
            style={{
              padding: "2px 6px",
              background: "rgba(23,23,23,.05)",
              borderRadius: 3,
              fontSize: 8.5,
            }}
          >
            {commit.sha}
          </span>
          <span>·</span>
          <span>{commit.repo}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 10,
            alignItems: "center",
            fontFamily: "var(--font-geist-mono),monospace",
            fontSize: 9,
          }}
        >
          <span style={{ color: "#2da44e" }}>+{commit.add}</span>
          <span style={{ color: "#cf222e" }}>−{commit.del}</span>
          <div style={{ flex: 1, display: "flex", gap: 1, marginLeft: 4 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 4,
                  background:
                    i / 10 < commit.add / (commit.add + commit.del)
                      ? "#2da44e"
                      : "#cf222e",
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => setCi((ci + 1) % commits.length)}
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            background: "transparent",
            border: "none",
            fontFamily: "var(--font-geist-mono),monospace",
            fontSize: 8.5,
            letterSpacing: 1.4,
            opacity: 0.4,
            cursor: "pointer",
            padding: 4,
            color: INK,
          }}
        >
          ↻ PREV
        </button>
      </div>
    </div>
  );
}

/* ── Liner Notes ────────────────────────────────────────────────────── */
function LinerNotes({ loadedSocial }: { loadedSocial: Social | null }) {
  const perRecord: Record<string, string> = {
    github:
      "Shipping small things often beats shipping big things rarely. Most of what I build lives here, open and messy.",
    linkedin:
      "The long-form résumé, for people who still read those. Currently open to new roles and collaborations.",
    spotify:
      "What's playing while I work. The playlist changes, the discipline doesn't — four hours, one track on loop.",
    leetcode:
      "Sharpening the saw. I solve one a day, not to prove anything, but because the mind is a muscle.",
  };
  const active = loadedSocial
    ? {
        title:
          "On " +
          loadedSocial.name.charAt(0) +
          loadedSocial.name.slice(1).toLowerCase(),
        body: perRecord[loadedSocial.id],
        tag: "TRACK NOTES",
      }
    : {
        title: "Side B",
        body: "I make interfaces that feel like objects — things you want to touch, not just click. Background in design systems, a weakness for serifs, and a long-running argument with my own attention span.",
        tag: "MANIFESTO",
      };

  return (
    <div
      style={{
        marginTop: 18,
        background: "#fff",
        border: "1px solid rgba(23,23,23,.10)",
        borderRadius: 14,
        padding: "20px 24px 18px",
        position: "relative",
        boxShadow:
          "0 1px 0 rgba(23,23,23,.02),0 10px 24px -18px rgba(23,23,23,.25)",
        color: INK,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg,transparent 0 23px,rgba(23,23,23,.025) 23px 24px)",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-geist-mono),monospace",
          fontSize: 9,
          letterSpacing: 1.6,
          opacity: 0.55,
          marginBottom: 12,
          position: "relative",
        }}
      >
        <span>◂ LINER NOTES</span>
        <span>{active.tag}</span>
        <span>CAT. RB-2026</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          gap: 24,
          alignItems: "start",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-instrument-light),serif",
              fontStyle: "italic",
              fontSize: 32,
              lineHeight: 0.95,
              letterSpacing: -1,
            }}
          >
            {active.title}
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 8.5,
              letterSpacing: 1.4,
              opacity: 0.4,
            }}
          >
            BY ROHAN · 2026
            <br />
            <span style={{ opacity: 0.7 }}>MADE IN INDIA</span>
          </div>
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              lineHeight: 1.6,
              letterSpacing: -0.1,
            }}
          >
            {active.body}
          </p>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-geist-mono),monospace",
              fontSize: 9,
              letterSpacing: 1.2,
              opacity: 0.5,
            }}
          >
            <span style={{ flexShrink: 0 }}>— R.B.</span>
            <div
              style={{ flex: 1, borderTop: "1px solid rgba(23,23,23,.15)" }}
            />
            <span>A/B · 33⅓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── VinylPlayer (state & layout) ───────────────────────────────────── */
function VinylPlayer() {
  const [selected, setSelected] = useState<Social | null>(null);
  const [phase, setPhase] = useState<"idle" | "out" | "settled" | "back">(
    "idle",
  );
  const [armAngle, setArmAngle] = useState(-25);
  const [armDragging, setArmDragging] = useState(false);
  const [playing, setPlaying] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const crateSlotRefs = useRef<Record<string, Element>>({});
  const platterRef = useRef<Element | null>(null);
  const [positions, setPositions] = useState<{
    from: { x: number; y: number } | null;
    to: { x: number; y: number } | null;
    size: number;
  }>({ from: null, to: null, size: 180 });

  const measure = useCallback((s: Social) => {
    if (!rootRef.current || !platterRef.current) return null;
    const slEl = crateSlotRefs.current[s.id];
    if (!slEl) return null;
    const root = rootRef.current.getBoundingClientRect();
    const sleeve = slEl.getBoundingClientRect();
    const platter = platterRef.current.getBoundingClientRect();
    const size = Math.min(platter.width, platter.height) * 0.92;
    return {
      from: {
        x: sleeve.left - root.left + (sleeve.width - size) / 2,
        y: sleeve.top - root.top + sleeve.height * 0.05,
      },
      to: {
        x: platter.left - root.left + (platter.width - size) / 2,
        y: platter.top - root.top + (platter.height - size) / 2,
      },
      size,
    };
  }, []);

  const handlePick = (social: Social) => {
    if (playing) return;
    if (selected?.id === social.id && phase === "settled") {
      setPhase("back");
      setTimeout(() => {
        setSelected(null);
        setPhase("idle");
      }, 1100);
      return;
    }
    if (selected && phase === "settled") {
      setPhase("back");
      setTimeout(() => {
        const p = measure(social);
        if (!p) return;
        setPositions(p);
        setSelected(social);
        setPhase("out");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("settled")),
        );
      }, 1100);
      return;
    }
    const p = measure(social);
    if (!p) return;
    setPositions(p);
    setSelected(social);
    setPhase("out");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("settled")),
    );
  };

  useEffect(() => {
    const onR = () => {
      if (selected) {
        const p = measure(selected);
        if (p) setPositions(p);
      }
    };
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [selected, measure]);

  const handleArmDrag = (ang: number) => {
    setArmDragging(true);
    setArmAngle(ang);
  };
  const handleArmRelease = () => {
    setArmDragging(false);
    if (armAngle > 5 && selected && phase === "settled" && !playing)
      handlePlay(true);
    else setArmAngle(-25);
  };

  const handlePlay = (manual = false) => {
    if (!selected || playing) return;
    setPlaying(true);
    if (!manual) setArmAngle(20);
    try {
      VinylAudio.start(0.45);
    } catch {}
    setTimeout(() => {
      window.open(selected.url, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        try {
          VinylAudio.stop();
        } catch {}
        setArmAngle(-25);
        setPlaying(false);
      }, 400);
    }, 1400);
  };

  // Re-bind crate sleeve & platter refs after every render
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.querySelectorAll(".vp-sleeve").forEach((el, i) => {
      const s = SOCIALS[i];
      if (s) crateSlotRefs.current[s.id] = el;
    });
    const p = rootRef.current.querySelector("[data-vp-platter]");
    if (p) platterRef.current = p;
  });

  const loaded = phase === "settled" ? selected : null;

  return (
    <div
      ref={rootRef}
      className="relative w-full px-5 py-10 sm:px-10 sm:py-12"
      style={{ color: INK }}
    >
      {/* header */}
      <div className="border-b-2 border-black pb-5 mb-7 flex justify-between items-end gap-4 flex-wrap">
        <h1 className="text-6xl xl:text-7xl font-instrument-light tracking-tight leading-none">
          Let&apos;s talk
        </h1>
        <div
          style={{
            fontFamily: "var(--font-geist-mono),monospace",
            fontSize: 10,
            letterSpacing: 1.6,
            opacity: 0.5,
            paddingBottom: 6,
          }}
        >
          EST. 2026 · SIDE A/B · 33⅓ RPM
        </div>
      </div>

      {/* intro */}
      <p className="mb-6 text-[15px] max-w-[520px] tracking-tight leading-relaxed opacity-75 font-poppins-light">
        Pick a record. Drag the tonearm onto it, or hit play — it&apos;ll take
        you where we can chat.
      </p>

      {/* stage: 3-column on lg, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(180px,220px)_1fr_240px] gap-7 items-start relative">
        <div className="flex justify-center lg:justify-start">
          <Crate
            socials={SOCIALS}
            selectedId={selected?.id ?? null}
            hideId={
              selected?.id && (phase === "out" || phase === "settled")
                ? selected.id
                : null
            }
            onPick={handlePick}
          />
        </div>

        <div className="relative flex flex-col items-center lg:items-start">
          <Turntable
            loadedSocial={loaded}
            playing={playing}
            onPlay={() => handlePlay()}
            armAngle={armAngle}
            onArmDrag={handleArmDrag}
            onArmRelease={handleArmRelease}
            armDragging={armDragging}
          />
          <div className="w-full" style={{ maxWidth: 440 }}>
            <LinerNotes loadedSocial={loaded} />
          </div>
        </div>

        <SidePanel nowSelected={loaded} playing={playing} />
      </div>

      <FlyingRecord
        social={selected}
        phase={phase}
        from={positions.from}
        to={positions.to}
        size={positions.size}
      />
      {/* <Grain /> */}
    </div>
  );
}

/* ── Section wrapper ────────────────────────────────────────────────── */
export default function LetsTalk() {
  return (
    <section id="contact" className="min-h-screen mt-15 w-full overflow-hidden">
      <VinylPlayer />
    </section>
  );
}
