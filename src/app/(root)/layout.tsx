import Header from "@/components/shared/header";
import SideNav from "@/components/shared/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Header />
      <SideNav />
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
