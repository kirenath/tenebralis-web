import { DreamOsShell } from "@/shared/components/dream-os/DreamOsShell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* DreamOS desktop is the default view; child pages overlay it */}
      {children}
    </>
  );
}
