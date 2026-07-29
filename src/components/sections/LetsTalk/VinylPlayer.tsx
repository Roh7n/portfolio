"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { INK, SOCIALS } from "./constants";
import type { Social } from "./types";
import VinylAudio from "./VinylAudio";
import { Crate } from "./Crate";
import { Turntable } from "./Turntable";
import { LinerNotes } from "./LinerNotes";
import { SidePanel } from "./SidePanel";
import { ContactForm } from "./ContactForm";
import { FlyingRecord } from "./FlyingRecord";

export function VinylPlayer() {
  const [selected, setSelected] = useState<Social | null>(null);
  const [phase, setPhase] = useState<"idle" | "out" | "settled" | "back">("idle");
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
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("settled")));
      }, 1100);
      return;
    }
    const p = measure(social);
    if (!p) return;
    setPositions(p);
    setSelected(social);
    setPhase("out");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("settled")));
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
    if (armAngle > 5 && selected && phase === "settled" && !playing) handlePlay(true);
    else setArmAngle(-25);
  };

  const handlePlay = (manual = false) => {
    if (!selected || playing) return;
    setPlaying(true);
    if (!manual) setArmAngle(20);
    try { VinylAudio.start(0.45); } catch {}
    setTimeout(() => {
      window.open(selected.url, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        try { VinylAudio.stop(); } catch {}
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
    <div ref={rootRef} className="relative w-full px-10 py-8 md:px-10 lg:px-0 sm:py-10" style={{ color: INK }}>
      {/* header */}
      <div className="border-b-2 border-black pb-5 mb-6 flex justify-between items-end gap-4 flex-wrap">
        <h1 className="text-6xl xl:text-7xl font-instrument-light tracking-tight leading-none">
          Let&apos;s talk
        </h1>
        <div
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
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
        Pick a record. Drag the tonearm onto it, or hit play — it&apos;ll take you where we can chat.
      </p>

      {/* stage: 3-col on lg → 4-col on xl, stacked on mobile */}
      <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_240px_260px] gap-5 lg:gap-6 items-stretch relative max-w-[1300px]">
        <div className="flex justify-center lg:justify-start h-full">
          <Crate
            socials={SOCIALS}
            selectedId={selected?.id ?? null}
            hideId={selected?.id && (phase === "out" || phase === "settled") ? selected.id : null}
            onPick={handlePick}
          />
        </div>

        <div className="relative flex flex-col justify-between items-start min-w-0 h-full max-w-[440px] w-full mx-auto xl:mx-0">
          <Turntable
            loadedSocial={loaded}
            playing={playing}
            onPlay={() => handlePlay()}
            armAngle={armAngle}
            onArmDrag={handleArmDrag}
            onArmRelease={handleArmRelease}
            armDragging={armDragging}
          />
          <div className="w-full flex-1 flex flex-col justify-end" style={{ maxWidth: 440 }}>
            <LinerNotes loadedSocial={loaded} />
          </div>
        </div>

        <div className="min-w-0 h-full">
          <SidePanel nowSelected={loaded} playing={playing} />
        </div>

        <div className="min-w-0 h-full lg:col-start-3 xl:col-start-4 xl:row-start-1">
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
    </div>
  );
}
