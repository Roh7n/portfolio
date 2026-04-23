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
  const fs = size === "sm" ? 6.5 : 13;
  const bigFs = size === "sm" ? 16 : 38;
  const pad = size === "sm" ? "6px 7px" : "14px 16px";

  const base = "absolute inset-0 flex flex-col font-mono text-ink pointer-events-none";
  const baseStyle: React.CSSProperties = { padding: pad, fontSize: fs, letterSpacing: 0.8, lineHeight: 1.1 };

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
          background:
            "linear-gradient(180deg,transparent 48%,rgba(23,23,23,.08) 48% 52%,transparent 52%)",
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
                style={{
                  inset: `${(1 - t) * 50}%`,
                  borderColor: `rgba(23,23,23,${0.2 - i * 0.04})`,
                }}
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
    <div className="w-full max-w-[250px]" style={{ perspective: 1000 }}>
      <div
        className="relative px-[18px] pt-[22px] pb-5 bg-white rounded-[14px] border border-ink/10 shadow-[0_22px_40px_rgba(0,0,0,.10),0_6px_14px_rgba(0,0,0,.06),inset_0_1px_0_rgba(255,255,255,.8)]"
        style={{ transform: "perspective(1200px) rotateY(-4deg) rotateX(1deg)" }}
      >
        <div className="absolute top-[-10px] left-[14px] bg-ink text-paper px-2.5 py-0.5 text-[9px] font-mono tracking-[1.6px] rounded-[5px]">
          THE COLLECTION
        </div>
        <div className="pt-2.5">
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
      <div className="mt-[14px] font-mono text-[9px] tracking-[1.4px] text-ink opacity-50">
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

  return (
    <div className="flex flex-col gap-[22px] pt-1">
      {/* Now Loaded */}
      <div
        className={[
          "rounded-[14px] p-[18px] text-ink relative",
          nowSelected
            ? "bg-white border border-ink/10 shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)]"
            : "bg-transparent border border-dashed border-ink/18",
        ].join(" ")}
      >
        <div className={`flex justify-between items-center ${nowSelected ? "mb-[14px]" : ""}`}>
          <div className="font-mono text-[8.5px] tracking-[1.6px] text-ink opacity-55 uppercase flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: nowSelected ? "#e25822" : INK,
                opacity: nowSelected ? 1 : 0.3,
                boxShadow: nowSelected ? "0 0 6px rgba(226,88,34,.6)" : "none",
                animation:
                  nowSelected && playing
                    ? "vp-pulse 1.2s ease-out infinite"
                    : "none",
              }}
            />
            {nowSelected ? "NOW LOADED" : "NO RECORD LOADED"}
          </div>
          <div className="font-mono text-[8.5px] tracking-[1px] opacity-40">
            {nowSelected
              ? playing
                ? "► PLAYING"
                : "SIDE " + nowSelected.side
              : "— —"}
          </div>
        </div>
        {nowSelected && (
          <div>
            <div className="font-instrument-light italic text-[22px] tracking-[-0.4px] leading-none text-ink">
              {nowSelected.name.charAt(0) +
                nowSelected.name.slice(1).toLowerCase()}
            </div>
            <div className="mt-1.5 font-mono text-[10px] tracking-[0.8px] text-ink opacity-60">
              {nowSelected.handle}
            </div>
          </div>
        )}
      </div>

      {/* Now Playing */}
      <div className="bg-white border border-ink/10 rounded-[14px] px-[18px] pt-[18px] pb-11 text-ink shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)] relative">
        <div className="flex justify-between items-center mb-4">
          <div className="font-mono text-[8.5px] tracking-[1.6px] text-ink opacity-55 uppercase flex items-center gap-1.5">
            <span
              className="inline-block w-[7px] h-[7px] rounded-full"
              style={{
                background: np ? "#1DB954" : INK,
                opacity: np ? 1 : 0.3,
                animation: np ? "vp-pulse 1.6s ease-out infinite" : "none",
              }}
            />
            {nowPlaying === null
              ? "LOADING…"
              : np
                ? "NOW PLAYING"
                : "NOT PLAYING"}
          </div>
          <div className="font-mono text-[8.5px] tracking-[1px] opacity-40">
            SPOTIFY
          </div>
        </div>
        {np ? (
          <>
            <div className="flex gap-[14px] items-start">
              <div className="w-[60px] h-[60px] shrink-0 rounded-md bg-gradient-to-br from-[#2a2a2a] to-[#0f0f0f] relative overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,.04),0_3px_8px_rgba(0,0,0,.15)]">
                {np.albumArt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={np.albumArt}
                    alt={np.album}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 50%,transparent 18%,rgba(255,255,255,.06) 19%,transparent 20%),radial-gradient(circle at 50%,transparent 30%,rgba(255,255,255,.04) 31%,transparent 32%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-instrument-light italic text-2xl text-white/85 leading-none">
                      {np.title.charAt(0)}
                    </div>
                  </>
                )}
              </div>
              <div className="flex-1 min-w-0 pt-[3px]">
                <div className="font-instrument-light text-[18px] leading-[1.15] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {np.title}
                </div>
                <div className="text-[11.5px] opacity-65 leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis">
                  {np.artist}
                </div>
                <div className="font-mono text-[8.5px] tracking-[0.8px] opacity-40 mt-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {np.album.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="mt-[18px]">
              <div className="h-0.5 bg-ink/8 rounded-sm overflow-visible relative">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-ink rounded-sm"
                  style={{ width: `${progress * 100}%` }}
                />
                <div
                  className="absolute top-[-3px] w-2 h-2 rounded-full bg-ink"
                  style={{ left: `calc(${progress * 100}% - 4px)` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[8.5px] tracking-[0.8px] opacity-50 mt-[7px]">
                <span>{fmtT(np.progressMs / 1000)}</span>
                <span>{fmtT(np.durationMs / 1000)}</span>
              </div>
            </div>
            <div className="absolute top-[18px] right-[66px] flex items-end gap-0.5 h-2.5">
              {[0, 1, 2, 3].map((i) => (
                <EqBar key={i} delay={i * 0.15} />
              ))}
            </div>
          </>
        ) : (
          <div className="font-instrument-light italic text-[15px] opacity-40 pb-2">
            {nowPlaying === null ? "Fetching…" : "Nothing on the platter."}
          </div>
        )}
      </div>

      {/* Latest Commit */}
      <div className="bg-white border border-ink/10 rounded-[14px] px-[18px] pt-[18px] pb-11 text-ink shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)] relative">
        <div className="flex justify-between items-center mb-4">
          <div className="font-mono text-[8.5px] tracking-[1.6px] text-ink opacity-55 uppercase flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink opacity-40" />
            LATEST COMMIT
          </div>
          <div className="font-mono text-[8.5px] tracking-[1px] opacity-40">
            {commit.when} AGO
          </div>
        </div>
        <div className="font-instrument-light italic text-[16px] leading-[1.35] tracking-[-0.3px] mb-4">
          &ldquo;{commit.msg}&rdquo;
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.8px] opacity-60 border-t border-ink/8 pt-3">
          <span className="px-1.5 py-0.5 bg-ink/5 rounded-[3px] text-[8.5px]">
            {commit.sha}
          </span>
          <span>·</span>
          <span>{commit.repo}</span>
        </div>
        <div className="flex gap-2.5 mt-2.5 items-center font-mono text-[9px]">
          <span className="text-[#2da44e]">+{commit.add}</span>
          <span className="text-[#cf222e]">−{commit.del}</span>
          <div className="flex-1 flex gap-px ml-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-1 opacity-60"
                style={{
                  background:
                    i / 10 < commit.add / (commit.add + commit.del)
                      ? "#2da44e"
                      : "#cf222e",
                }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => setCi((ci + 1) % commits.length)}
          className="absolute bottom-[14px] right-4 bg-transparent border-0 font-mono text-[8.5px] tracking-[1.4px] opacity-40 cursor-pointer p-1 text-ink"
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
    <div className="mt-[18px] bg-white border border-ink/10 rounded-[14px] px-6 pt-5 pb-[18px] relative shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)] text-ink overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent 0 23px,rgba(23,23,23,.025) 23px 24px)",
        }}
      />
      <div className="relative flex justify-between items-center font-mono text-[9px] tracking-[1.6px] opacity-55 mb-3">
        <span>◂ LINER NOTES</span>
        <span>{active.tag}</span>
        <span>CAT. RB-2026</span>
      </div>
      <div className="relative grid grid-cols-[140px_1fr] gap-6 items-start">
        <div>
          <div className="font-instrument-light italic text-[32px] leading-[0.95] tracking-[-1px]">
            {active.title}
          </div>
          <div className="mt-2 font-mono text-[8.5px] tracking-[1.4px] opacity-40">
            BY ROHAN · 2026
            <br />
            <span className="opacity-70">MADE IN INDIA</span>
          </div>
        </div>
        <div>
          <p className="m-0 text-[13.5px] leading-relaxed tracking-[-0.1px]">
            {active.body}
          </p>
          <div className="mt-[14px] flex items-center gap-[10px] font-mono text-[9px] tracking-[1.2px] opacity-50">
            <span className="shrink-0">— R.B.</span>
            <div className="flex-1 border-t border-ink/15" />
            <span>A/B · 33⅓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ContactForm ────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise<void>((r) => setTimeout(r, 1200));
    setStatus("sent");
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setStatus("idle");
    }, 3000);
  };

  return (
    <div className="bg-white border border-ink/10 rounded-[14px] p-5 text-ink shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent 0 23px,rgba(23,23,23,.025) 23px 24px)",
        }}
      />

      <div className="relative flex justify-between items-center font-mono text-[9px] tracking-[1.6px] opacity-55 mb-[14px]">
        <span>◂ MAIL SLOT</span>
        <span>SIDE C</span>
      </div>

      <div className="relative font-instrument-light italic text-[26px] leading-none tracking-[-0.5px] mb-5">
        Drop a note
      </div>

      <form onSubmit={handleSubmit} className="relative flex flex-col gap-[14px]">
        <div>
          <label className="font-mono text-[8.5px] tracking-[1.4px] opacity-55 block mb-1.5">
            YOUR NAME
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="First Last"
            required
            className="w-full px-[11px] py-[9px] bg-paper border border-ink/15 rounded-lg font-mono text-[11px] text-ink outline-none leading-snug box-border"
          />
        </div>

        <div>
          <label className="font-mono text-[8.5px] tracking-[1.4px] opacity-55 block mb-1.5">
            YOUR EMAIL
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            required
            className="w-full px-[11px] py-[9px] bg-paper border border-ink/15 rounded-lg font-mono text-[11px] text-ink outline-none leading-snug box-border"
          />
        </div>

        <div>
          <label className="font-mono text-[8.5px] tracking-[1.4px] opacity-55 block mb-1.5">
            YOUR MESSAGE
          </label>
          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            placeholder="Hey, let's work together…"
            required
            rows={5}
            className="w-full px-[11px] py-[9px] bg-paper border border-ink/15 rounded-lg font-mono text-[11px] text-ink outline-none leading-snug box-border resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={status !== "idle"}
          className={[
            "px-[14px] py-[11px] text-paper border-0 rounded-[10px] font-mono text-[11px] tracking-[1.6px] font-bold",
            "flex items-center justify-center gap-2 transition-colors duration-200",
            "shadow-[0_6px_14px_rgba(0,0,0,.18)]",
            status === "sent" ? "bg-[#2da44e]" : "bg-ink",
            status === "idle" ? "cursor-pointer" : "cursor-not-allowed",
            status === "sending" ? "opacity-70" : "opacity-100",
          ].join(" ")}
        >
          {status === "idle" && (
            <>
              <span className="border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-paper w-0 h-0" />
              SEND
            </>
          )}
          {status === "sending" && "SENDING…"}
          {status === "sent" && "✓ DELIVERED"}
        </button>
      </form>

      <div className="relative mt-4 font-mono text-[8px] tracking-[1.2px] opacity-35 flex justify-between">
        <span>rohanbaburaj4446@gmail.com</span>
        <span>CAT. RB-2026</span>
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
      className="relative w-full px-4 py-8 sm:px-8 sm:py-10"
      style={{ color: INK }}
    >
      {/* header */}
      <div className="border-b-2 border-black pb-5 mb-6 flex justify-between items-end gap-4 flex-wrap">
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
      <p className="mb-5 text-[15px] max-w-[520px] tracking-tight leading-relaxed opacity-75 font-poppins-light">
        Pick a record. Drag the tonearm onto it, or hit play — it&apos;ll take
        you where we can chat.
      </p>

      {/* stage: 3-col on lg → 4-col on xl, stacked on mobile */}
      <div className="grid grid-cols-1  xl:grid-cols-[200px_1fr_240px_260px] gap-5 lg:gap-6 items-start relative max-w-[1300px]">
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

        <div className="relative flex flex-col items-start min-w-0">
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

        <div className="min-w-0">
          <SidePanel nowSelected={loaded} playing={playing} />
        </div>

        {/* 4th col: xl → col 4 row 1 · lg → col 3 row 2 (below SidePanel) */}
        <div className="min-w-0 lg:col-start-3 xl:col-start-4 xl:row-start-1">
          <ContactForm />
        </div>
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
