"use client";

/** Fullscreen fixed wallpaper background layer. */
export function WallpaperLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 bg-[var(--dream-background)] bg-cover bg-center bg-no-repeat"
      aria-hidden
    />
  );
}
