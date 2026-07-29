"use client";

import React, { useState } from "react";
import { INK, PAPER } from "./constants";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white border border-ink/10 rounded-[14px] p-5 text-ink shadow-[0_1px_0_rgba(23,23,23,.02),0_10px_24px_-18px_rgba(23,23,23,.25)] relative overflow-hidden h-full flex flex-col justify-between">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent 0 23px,rgba(23,23,23,.025) 23px 24px)",
        }}
      />

      <div className="relative flex justify-between items-center font-poppins text-[9px] tracking-[1.6px] opacity-55 mb-4">
        <span>◂ MAIL SLOT</span>
        <span>SIDE C</span>
      </div>

      <div className="relative font-instrument-light italic text-[26px] leading-none tracking-[-0.5px] mb-4">
        Drop a note
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 flex-1 justify-between"
      >
        <div>
          <label className="font-poppins text-[8.5px] tracking-[1.4px] opacity-55 block mb-1.5">
            YOUR NAME
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="First Last"
            required
            className="w-full px-[11px] py-[9px] bg-paper border border-ink/15 rounded-lg font-poppins text-[11px] text-ink outline-none leading-snug box-border"
          />
        </div>

        <div>
          <label className="font-poppins text-[8.5px] tracking-[1.4px] opacity-55 block mb-1.5">
            YOUR EMAIL
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            required
            className="w-full px-[11px] py-[9px] bg-paper border border-ink/15 rounded-lg font-poppins text-[11px] text-ink outline-none leading-snug box-border"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-poppins text-[8.5px] tracking-[1.4px] opacity-55 block mb-1.5">
            YOUR MESSAGE
          </label>
          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            placeholder="Hey, let's work together…"
            required
            rows={4}
            className="w-full px-[11px] py-[9px] bg-paper border border-ink/15 rounded-lg font-poppins text-[11px] text-ink outline-none leading-snug box-border resize-y flex-1 min-h-[90px]"
          />
        </div>

        <button
          type="submit"
          disabled={status !== "idle"}
          className={[
            "px-[14px] py-[11px] text-paper border-0 rounded-[10px] font-poppins text-[11px] tracking-[1.6px] font-bold",
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

      <div className="relative mt-4 font-poppins text-[8px] tracking-[1.2px] opacity-35 flex justify-between">
        <span>rohanbaburaj4446@gmail.com</span>
        <span>CAT. RB-2026</span>
      </div>
    </div>
  );
}
