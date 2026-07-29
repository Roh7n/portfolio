import type { Social } from "./types";
import type { SOCIALS } from "./constants";
import { CrateSleeve } from "./CrateSleeve";

export function Crate({
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
    <div className="w-full max-w-[250px] h-full flex flex-col justify-between" style={{ perspective: 1000 }}>
      <div
        className="relative px-[18px] pt-[22px] pb-5 bg-white rounded-[14px] border border-ink/10 shadow-[0_22px_40px_rgba(0,0,0,.10),0_6px_14px_rgba(0,0,0,.06),inset_0_1px_0_rgba(255,255,255,.8)] flex-1 flex flex-col justify-between"
        style={{ transform: "perspective(1200px) rotateY(-4deg) rotateX(1deg)" }}
      >
        <div className="absolute top-[-10px] left-[14px] bg-ink text-paper px-2.5 py-0.5 text-[9px] font-poppins tracking-[1.6px] rounded-[5px]">
          THE COLLECTION
        </div>
        <div className="pt-2.5 flex-1 flex flex-col justify-around">
          {socials.map((s, i) => (
            <div key={s.id} style={{ visibility: hideId === s.id ? "hidden" : "visible" }}>
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
      <div className="mt-4 font-poppins text-[9px] tracking-[1.4px] text-ink opacity-50 shrink-0">
        ← TAP A RECORD
      </div>
    </div>
  );
}
