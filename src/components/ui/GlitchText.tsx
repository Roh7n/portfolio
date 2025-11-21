"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { glitchEffect } from "@/lib/glitchText";

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
