"use client";

import React, { useRef, useLayoutEffect, useState } from "react";

const runningSet = new WeakSet<HTMLElement>();

function glitchEffect(element: HTMLElement, duration = 200) {
  if (runningSet.has(element)) return;

  runningSet.add(element);

  const original = element.textContent ?? "";
  const chars = original.split("");
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const interval = setInterval(() => {
    element.textContent = chars.map(() => randomChar()).join("");
  }, 60);

  setTimeout(() => {
    clearInterval(interval);

    requestAnimationFrame(() => {
      element.textContent = original;
      runningSet.delete(element);
    });
  }, duration);
}

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({ children, className }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [elementWidth, setElementWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();
    setElementWidth(width);
  }, []);

  const handleHover = () => {
    if (ref.current) glitchEffect(ref.current);
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleHover}
      className={className}
      style={{
        display: "inline-block",
        width: elementWidth ? `${elementWidth}px` : "auto",
        whiteSpace: "nowrap",
        cursor: "pointer",
      }}
    >
      {children}
    </span>
  );
}
