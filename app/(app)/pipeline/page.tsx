import EmptyState from "@/components/EmptyState";
import PipelineList from "@/components/pipeline/PipelineList";
import { isDemo } from "@/lib/demo";

// Pipeline — the master list of every lead across every account.
export default function PipelinePage() {
  const demo = isDemo();

  return (
    <div className="flex flex-col gap-4 px-16 py-8 xl:px-32">
      {demo ? (
        <PipelineList />
      ) : (
        <EmptyState
          title="No leads yet"
          sub="Every lead OLLIN sources — or that you upload — lands here across all your accounts."
          cta={{ href: "/hunt", label: "Open Action →" }}
        />
      )}
    </div>
  );
}
