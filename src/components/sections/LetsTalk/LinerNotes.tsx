import type { Social } from "./types";

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

export function LinerNotes({ loadedSocial }: { loadedSocial: Social | null }) {
  const active = loadedSocial
    ? {
        title: "On " + loadedSocial.name.charAt(0) + loadedSocial.name.slice(1).toLowerCase(),
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
        style={{ background: "repeating-linear-gradient(0deg,transparent 0 23px,rgba(23,23,23,.025) 23px 24px)" }}
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
          <p className="m-0 text-[13.5px] leading-relaxed tracking-[-0.1px]">{active.body}</p>
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
