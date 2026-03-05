"use client";

import { useState } from "react";
import { StatusBar } from "./StatusBar";
import { DockBar } from "./DockBar";
import { DesktopPager } from "./DesktopPager";
import { AppIconGrid, DESKTOP_PAGES } from "./AppIconGrid";
import { PageIndicator } from "./PageIndicator";
import { WallpaperLayer } from "./WallpaperLayer";

/**
 * The Dream OS main shell — simulates a phone-like operating system.
 * Wraps StatusBar, three-page desktop pager, page indicator, and dock bar.
 */
export function DreamOsShell() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <WallpaperLayer />

      {/* Phone container — centred + max-width on desktop */}
      <div className="relative mx-auto flex h-dvh max-w-[480px] flex-col overflow-hidden bg-white/40 shadow-2xl backdrop-blur-sm dark:bg-black/40 md:rounded-3xl md:my-4 md:h-[calc(100dvh-2rem)] md:border md:border-white/20">
        <StatusBar />

        {/* Desktop pager fills remaining space */}
        <DesktopPager onPageChange={setCurrentPage}>
          {DESKTOP_PAGES.map((items, i) => (
            <AppIconGrid key={i} items={items} />
          ))}
        </DesktopPager>

        <PageIndicator total={DESKTOP_PAGES.length} current={currentPage} />

        <DockBar />
      </div>
    </>
  );
}
