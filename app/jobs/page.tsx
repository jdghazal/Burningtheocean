import type { Metadata } from "next";
import { Info } from "lucide-react";
import { JobDirectory } from "@/components/job-directory";
import { getJobCards } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Florida security jobs",
  description: "Search armed, unarmed, event, patrol, and supervisor security jobs.",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  const [{ q = "", location = "" }, jobs] = await Promise.all([
    searchParams,
    getJobCards(),
  ]);

  return (
    <>
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">Florida security opportunities</p>
          <h1>Find work that fits your license and schedule</h1>
          <p>
            Explore security roles by employer, location, shift, and required
            credentials.
          </p>
          <div className="demo-banner">
            <Info size={18} aria-hidden="true" />
            <span>All positions shown in this prototype are fictional demo listings.</span>
          </div>
        </div>
      </section>
      <JobDirectory initialLocation={location} initialQuery={q} jobs={jobs} />
    </>
  );
}
