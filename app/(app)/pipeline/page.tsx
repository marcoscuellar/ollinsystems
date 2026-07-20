import { redirect } from "next/navigation";

// Pipeline merged into Accounts — every lead now lives on its company's card.
export default function PipelinePage() {
  redirect("/accounts");
}
