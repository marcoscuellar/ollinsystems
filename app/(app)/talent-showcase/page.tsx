import ComingSoon from "@/components/ComingSoon";

export default function TalentShowcasePage() {
  return (
    <ComingSoon
      eyebrow="COMING SOON"
      title="Talent Showcase"
      sub="Bench-ready candidates rolling off assignments, matched to open reqs across your accounts. This full surface is being designed — for now, this week's talent appears on Today."
      cta={{ href: "/", label: "Back to Today" }}
    />
  );
}
