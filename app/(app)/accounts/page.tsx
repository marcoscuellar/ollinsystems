import EmptyState from "@/components/EmptyState";
import AccountsGrid from "@/components/accounts/AccountsGrid";
import { isDemo } from "@/lib/demo";

// Accounts — one card per client company; each opens in place to full intel.
export default async function AccountsPage() {
  const demo = await isDemo();

  return (
    <div className="flex flex-col gap-4 px-16 py-8 xl:px-32">
      {demo ? (
        <AccountsGrid />
      ) : (
        <EmptyState
          title="No accounts yet"
          sub="Accounts arrive from Intelligence with the brief already written — signals, contacts, and last touches."
          cta={{ href: "/hunt", label: "Open Movement →" }}
        />
      )}
    </div>
  );
}
