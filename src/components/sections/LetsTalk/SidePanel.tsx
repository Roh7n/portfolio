"use client";

import { useState, useEffect } from "react";
import { INK } from "./constants";
import type { Social, NowPlayingData } from "./types";
import { EqBar } from "./EqBar";

function fmtT(s: number) {
  s = Math.floor(s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const commits = [
  { repo: "portfolio", msg: "feat: ship vinyl contact section", when: "2h", sha: "a4f1e8c", add: 184, del: 23 },
  { repo: "portfolio", msg: "refactor(hero): trim scroll handlers", when: "1d", sha: "7c2d9b0", add: 42, del: 58 },
  { repo: "notes-app", msg: "fix: markdown paste strips inline styles", when: "3d", sha: "0e5a6f2", add: 12, del: 4 },
];

export function SidePanel({
  nowSelected,
  playing,
}: {
  nowSelected: Social | null;
  playing: boolean;
}) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [ci, setCi] = useState(0);

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

  const commit = commits[ci];
  const np = nowPlaying?.isPlaying ? nowPlaying : null;
  const progress = np ? np.progressMs / np.durationMs : 0;

  return (
    <div className="flex flex-col justify-between gap-[18px] h-full pt-1">
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
          <div className="font-poppins text-[8.5px] tracking-[1.6px] text-ink opacity-55 uppercase flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: nowSelected ? "#e25822" : INK,
                opacity: nowSelected ? 1 : 0.3,
                boxShadow: nowSelected ? "0 0 6px rgba(226,88,34,.6)" : "none",
                animation: nowSelected && playing ? "vp-pulse 1.2s ease-out infinite" : "none",
              }}
            />
            {nowSelected ? "NOW LOADED" : "NO RECORD LOADED"}
          </div>
          <div className="font-poppins text-[8.5px] tracking-[1px] opacity-40">
            {nowSelected ? (playing ? "► PLAYING" : "SIDE " + nowSelected.side) : "— —"}
          </div>
        </div>
        {nowSelected && (
          <div>
            <div className="font-instrument-light italic text-[22px] tracking-[-0.4px] leading-none text-ink">
              {nowSelected.name.charAt(0) + nowSelected.name.slice(1).toLowerCase()}
            </div>
            <div className="mt-1.5 font-poppins text-[10px] tracking-[0.8px] text-ink opacity-60">
              {nowSelected.handle}
            </div>
          </div>
        )}
      </div>

      {/* Now Playing */}
      <div className="bg-white border border-ink/10 rounded-[14px] px-[18px] pt-[18px] pb-11 text-ink shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)] relative">
        <div className="flex justify-between items-center mb-4">
          <div className="font-poppins text-[8.5px] tracking-[1.6px] text-ink opacity-55 uppercase flex items-center gap-1.5">
            <span
              className="inline-block w-[7px] h-[7px] rounded-full"
              style={{
                background: np ? "#1DB954" : INK,
                opacity: np ? 1 : 0.3,
                animation: np ? "vp-pulse 1.6s ease-out infinite" : "none",
              }}
            />
            {nowPlaying === null ? "LOADING…" : np ? "NOW PLAYING" : "NOT PLAYING"}
          </div>
          <div className="font-poppins text-[8.5px] tracking-[1px] opacity-40">SPOTIFY</div>
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
                <div className="font-poppins text-[8.5px] tracking-[0.8px] opacity-40 mt-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {np.album.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="mt-[18px]">
              <div className="h-0.5 bg-ink/8 rounded-sm overflow-visible relative">
                <div className="absolute left-0 top-0 bottom-0 bg-ink rounded-sm" style={{ width: `${progress * 100}%` }} />
                <div className="absolute top-[-3px] w-2 h-2 rounded-full bg-ink" style={{ left: `calc(${progress * 100}% - 4px)` }} />
              </div>
              <div className="flex justify-between font-poppins text-[8.5px] tracking-[0.8px] opacity-50 mt-[7px]">
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
          <div className="font-poppins text-[8.5px] tracking-[1.6px] text-ink opacity-55 uppercase flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink opacity-40" />
            LATEST COMMIT
          </div>
          <div className="font-poppins text-[8.5px] tracking-[1px] opacity-40">{commit.when} AGO</div>
        </div>
        <div className="font-instrument-light italic text-[16px] leading-[1.35] tracking-[-0.3px] mb-4">
          &ldquo;{commit.msg}&rdquo;
        </div>
        <div className="flex items-center gap-2 font-poppins text-[9px] tracking-[0.8px] opacity-60 border-t border-ink/8 pt-3">
          <span className="px-1.5 py-0.5 bg-ink/5 rounded-[3px] text-[8.5px]">{commit.sha}</span>
          <span>·</span>
          <span>{commit.repo}</span>
        </div>
        <div className="flex gap-2.5 mt-2.5 items-center font-poppins text-[9px]">
          <span className="text-[#2da44e]">+{commit.add}</span>
          <span className="text-[#cf222e]">−{commit.del}</span>
          <div className="flex-1 flex gap-px ml-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-1 opacity-60"
                style={{ background: i / 10 < commit.add / (commit.add + commit.del) ? "#2da44e" : "#cf222e" }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => setCi((ci + 1) % commits.length)}
          className="absolute bottom-[14px] right-4 bg-transparent border-0 font-poppins text-[8.5px] tracking-[1.4px] opacity-40 cursor-pointer p-1 text-ink"
        >
          ↻ PREV
        </button>
      </div>
    </div>
  );
}
