export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-purple-500"></div>
      <div className="w-1/2 flex items-center justify-center">{children}</div>
    </div>
  );
}
