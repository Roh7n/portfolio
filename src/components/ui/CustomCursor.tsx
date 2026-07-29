"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Keep track of exact mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Keep track of circle position for the trailing effect
  const circle = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;
    
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const animate = () => {
      // Instantly move the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      // Smoothly interpolate the circle towards the mouse
      const ease = 0.15; // Lower is slower/more trailing
      circle.current.x += (mouse.current.x - circle.current.x) * ease;
      circle.current.y += (mouse.current.y - circle.current.y) * ease;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circle.current.x}px, ${circle.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // Initialize positions to center of screen or current mouse if available
    circle.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}} />
      <div
        ref={circleRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] border border-white rounded-full transition-all duration-300 ease-out will-change-transform mix-blend-difference ${
          isHovering ? "w-10 h-10 bg-white/20" : "w-6 h-6 bg-transparent"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] will-change-transform mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)", marginLeft: "-3px", marginTop: "-3px" }}
      />
    </>
  );
}
