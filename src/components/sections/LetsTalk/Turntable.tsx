"use client";

import React, { useRef } from "react";
import { VP_EASE, INK, PAPER } from "./constants";
import type { Social } from "./types";

export function Turntable({
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
    const pivotX = base.right, pivotY = base.top;
    const onMove = (ev: PointerEvent) => {
      const ang = (Math.atan2(-(ev.clientX - pivotX), ev.clientY - pivotY) * 180) / Math.PI;
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
              background: "radial-gradient(circle at 35% 30%,#efece5 0%,#e4e0d6 55%,#d4cfc2 100%)",
              boxShadow:
                "inset 0 4px 10px rgba(0,0,0,.10),inset 0 -2px 6px rgba(0,0,0,.08),0 2px 4px rgba(255,255,255,.6)",
              border: "1px solid rgba(23,23,23,.08)",
            }}
          >
            {[0.12, 0.28, 0.45, 0.65, 0.82].map((t, i) => (
              <div
                key={i}
                style={{ position: "absolute", inset: `${t * 50}%`, borderRadius: "50%", border: "1px solid rgba(23,23,23,.04)" }}
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
              boxShadow: "0 3px 6px rgba(0,0,0,.10),inset 0 1px 0 rgba(255,255,255,.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-poppins), sans-serif",
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
              boxShadow: "0 2px 4px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.2)",
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
              cursor: loadedSocial && !playing ? (armDragging ? "grabbing" : "grab") : "default",
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
                style={{ position: "absolute", left: -6, right: -6, top: `${t * 100}%`, height: 1, background: INK, opacity: 0.3 }}
              />
            ))}
          </div>
          {/* power lamp */}
          <div style={{ position: "absolute", top: 8, left: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: playing ? "#1db954" : "#fff",
                border: "1px solid rgba(23,23,23,.2)",
                boxShadow: playing ? "0 0 8px rgba(29,185,84,.7)" : "inset 0 1px 1px rgba(0,0,0,.08)",
                transition: "all .2s",
              }}
            />
            <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: 8, letterSpacing: 1.2, color: INK }}>
              {playing ? "ON AIR" : "STANDBY"}
            </span>
          </div>
          {/* PLAY button */}
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
              fontFamily: "var(--font-poppins), sans-serif",
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
              animation: loadedSocial && !playing ? "play-bounce 2s infinite" : "none",
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
