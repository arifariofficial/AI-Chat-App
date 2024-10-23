export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[-100px] flex min-h-screen items-center justify-center bg-backgroundSecondary sm:bg-background">
      {children}
    </div>
  );
}
