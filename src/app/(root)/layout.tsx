import Header from "@/components/shared/header";
import SideNav from "@/components/shared/navigation";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user ?? null;
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Header user={user} />
      <SideNav user={user} />
      <main className="flex-1 overflow-y-auto wrapper">{children}</main>
    </div>
  );
}
