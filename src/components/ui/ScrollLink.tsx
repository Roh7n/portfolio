"use client";

import { useLenis } from "@/utils/lenis";

interface ScrollLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollLink({ href, className, children }: ScrollLinkProps) {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo(href, { duration: 1.2 });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
