import { VP_EASE } from "./constants";
import type { Social } from "./types";
import { VinylRecord } from "./VinylRecord";

export function FlyingRecord({
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
