export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--dream-background)]">
      <div className="w-full max-w-sm px-6">{children}</div>
    </div>
  );
}
