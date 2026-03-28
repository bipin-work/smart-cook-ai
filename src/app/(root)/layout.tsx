import SideNav from "@/components/shared/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-row">
      <SideNav />
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
