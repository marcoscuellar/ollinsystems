import EmptyState from "@/components/EmptyState";
import ActionQueue from "@/components/action/ActionQueue";
import { isDemo } from "@/lib/demo";

// Movement — the main working surface: today's ranked outreach queue.
export default async function MovementPage() {
  const demo = await isDemo();

  return (
    <div className="flex flex-col gap-4 px-16 py-8 xl:px-32">
      {demo ? (
        <ActionQueue />
      ) : (
        <EmptyState
          title="Your queue is empty"
          sub="When Intelligence prepares an opportunity, Movement brings forward the contact, signal, message, and one next move."
          cta={{ href: "/", label: "Back to Today →" }}
        />
      )}
    </div>
  );
}
