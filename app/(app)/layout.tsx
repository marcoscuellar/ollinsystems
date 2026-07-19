import { auth } from "@/auth";
import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import SupportWidget from "@/components/SupportWidget";
import SyncProvider from "@/components/SyncProvider";
import { DEMO_COOKIE } from "@/lib/demo";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const demo = cookies().get(DEMO_COOKIE)?.value === "1";

  return (
    <>
      <SyncProvider authed={Boolean(session?.user)} />
      {/* App shell: the sidebar carries navigation context; only main scrolls. */}
      <div className="grid h-screen grid-cols-[auto_1fr] overflow-hidden">
        <Sidebar userEmail={session?.user?.email ?? undefined} demo={demo} />
        <div className="flex min-w-0 flex-col overflow-hidden">
          <main className="lite animate-rise flex-1 overflow-y-auto">{children}</main>
        </div>
        <div className="fixed bottom-5 right-5 z-20 rounded-full bg-white p-1 shadow-[0_12px_35px_-16px_rgba(10,16,14,.5)]">
          <SupportWidget />
        </div>
      </div>
    </>
  );
}
