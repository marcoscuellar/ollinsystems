import EmptyState from "@/components/EmptyState";
import ActionQueue from "@/components/action/ActionQueue";
import { isDemo } from "@/lib/demo";

// Action — the main working surface: today's ranked outreach queue.
export default function ActionPage() {
  const demo = isDemo();

  return (
    <div className="flex flex-col gap-4 px-16 py-8 xl:px-32">
      {demo ? (
        <ActionQueue />
      ) : (
        <EmptyState
          title="Your queue is empty"
          sub="Run a hunt and OLLIN prepares each contact — the buying signal, the script, and the one next action."
          cta={{ href: "/", label: "Back to Today →" }}
        />
      )}
    </div>
  );
}
