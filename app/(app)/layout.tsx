import { auth } from "@/auth";
import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import SyncProvider from "@/components/SyncProvider";
import { DEMO_COOKIE } from "@/lib/demo";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const demo = cookies().get(DEMO_COOKIE)?.value === "1";

  return (
    <>
      <SyncProvider authed={Boolean(session?.user)} />
      <div className="grid min-h-screen grid-cols-[236px_1fr]">
        <Sidebar userEmail={session?.user?.email ?? undefined} demo={demo} />
        <div className="min-w-0">
          <TopBar />
          <main className="animate-rise">{children}</main>
        </div>
      </div>
    </>
  );
}
