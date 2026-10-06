import type { Metadata } from "next";
import { Info } from "lucide-react";
import { AgencyDirectory } from "@/components/agency-directory";
import { getAgencyCards } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Licensed agency directory",
  description: "Search Florida security agencies by name, location, and license class.",
};

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ q = "" }, agencies] = await Promise.all([searchParams, getAgencyCards()]);

  return (
    <>
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">Public records + employer profiles</p>
          <h1>Florida licensed security agencies</h1>
          <p>
            Search public agency records and discover security employers currently
            hiring across Florida.
          </p>
          <div className="demo-banner">
            <Info size={18} aria-hidden="true" />
            <span>
              This prototype contains clearly labeled fictional records. Official
              FDACS data has not been imported yet.
            </span>
          </div>
        </div>
      </section>
      <AgencyDirectory agencies={agencies} initialQuery={q} />
    </>
  );
}
