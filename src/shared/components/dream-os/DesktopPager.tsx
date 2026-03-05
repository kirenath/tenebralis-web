"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface DesktopPagerProps {
  children: React.ReactNode[];
  onPageChange?: (page: number) => void;
}

/**
 * Three-page horizontal scroll container using CSS scroll-snap.
 * Reports the current page index via onPageChange.
 */
export function DesktopPager({ children, onPageChange }: DesktopPagerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  // Notify parent whenever page changes — runs after render, avoiding setState-during-render
  useEffect(() => {
    onPageChange?.(page);
  }, [page, onPageChange]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pageWidth = el.offsetWidth;
    const newPage = Math.round(el.scrollLeft / pageWidth);
    setPage(newPage);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Navigate to page 1 (center) on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({ left: el.offsetWidth, behavior: "instant" });
    });
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {children.map((child, i) => (
        <div
          key={i}
          className="flex w-full shrink-0 snap-center items-center justify-center"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
