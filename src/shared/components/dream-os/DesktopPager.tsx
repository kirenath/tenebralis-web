"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface DesktopPagerProps {
  children: React.ReactNode[];
  onPageChange?: (page: number) => void;
}

/**
 * Three-page horizontal scroll container using CSS scroll-snap.
 * Supports both touch swiping and mouse drag-to-scroll.
 * Reports the current page index via onPageChange.
 */
export function DesktopPager({ children, onPageChange }: DesktopPagerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  // Mouse drag state (refs to avoid re-renders)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

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

  // --- Mouse drag-to-scroll handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    scrollLeftStart.current = el.scrollLeft;
    // Temporarily disable scroll-snap during drag for smooth feel
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) {
      hasDragged.current = true;
    }
    el.scrollLeft = scrollLeftStart.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    // Re-enable scroll-snap so it settles to nearest page
    el.style.scrollSnapType = "x mandatory";
    el.style.cursor = "";
    // Snap to nearest page
    const pageWidth = el.offsetWidth;
    const targetPage = Math.round(el.scrollLeft / pageWidth);
    el.scrollTo({ left: targetPage * pageWidth, behavior: "smooth" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      handleMouseUp();
    }
  }, [handleMouseUp]);

  // Prevent click events from firing after a drag (e.g. accidentally opening an app)
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      hasDragged.current = false;
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{ scrollbarWidth: "none", cursor: "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClickCapture={handleClick}
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
