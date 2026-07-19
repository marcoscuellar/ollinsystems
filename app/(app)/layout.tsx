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
      {/* App shell: full viewport height, no page-level scroll. The sidebar and
          top bar stay fixed; only <main> scrolls its own content. */}
      <div className="grid h-screen grid-cols-[236px_1fr] overflow-hidden">
        <Sidebar userEmail={session?.user?.email ?? undefined} demo={demo} />
        <div className="flex min-w-0 flex-col overflow-hidden">
          <TopBar />
          <main className="lite animate-rise flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
