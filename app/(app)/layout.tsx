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
        <div className="flex min-w-0 flex-col">
          <TopBar />
          <main className="lite animate-rise flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
