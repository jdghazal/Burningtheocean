import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, Info, MapPin } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { formatSourceDate } from "@/lib/format";
import { getAgencyBySlug, jobViewHelpers } from "@/lib/queries";
import type { JobCardData } from "@/lib/view-models";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  return { title: agency?.employerDisplayName ?? agency?.publicLegalName ?? "Agency" };
}

export default async function AgencyPage({ params }: Props) {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) notFound();

  const displayName = agency.employerDisplayName ?? agency.publicLegalName;
  const jobs: JobCardData[] = agency.jobs.map((job, index) => ({
    id: job.id,
    slug: job.slug,
    title: job.title,
    agencyName: displayName,
    agencySlug: agency.slug,
    city: job.locationCity,
    county: job.locationCounty,
    employmentType: jobViewHelpers.employmentType(job.employmentType),
    schedule: jobViewHelpers.schedule(job.title),
    payMin: job.payMinCents === null ? null : job.payMinCents / 100,
    payMax: job.payMaxCents === null ? null : job.payMaxCents / 100,
    payPeriod: job.payPeriod === "ANNUAL" ? "year" : "hour",
    licenseRequired: jobViewHelpers.license(job.requiresClassD, job.requiresClassG),
    postedAt: job.publishedAt ?? job.createdAt,
    featured: index < 2,
  }));

  return (
    <div className="page-shell detail-shell">
      <article className="detail-main">
        <Link className="text-link back-link" href="/agencies">
          <ArrowLeft size={16} /> Back to directory
        </Link>
        <p className="eyebrow">Agency profile</p>
        <h1>{displayName}</h1>
        <p className="detail-lead">
          <MapPin size={17} /> {agency.publicCity}, {agency.publicCounty} County,
          Florida
        </p>
        {agency.isDemo && (
          <div className="demo-banner">
            <Info size={18} />
            <span>
              Fictional demonstration profile. This is not a real agency or Florida
              license record.
            </span>
          </div>
        )}

        <h2>About the employer</h2>
        <p>
          {agency.employerDescription ??
            "This public record has not yet been claimed by the employer."}
        </p>

        <h2>Services</h2>
        <div className="chip-row">
          {agency.services.map(({ service }) => (
            <span className="chip" key={service.id}>
              {service.name}
            </span>
          ))}
        </div>

        <h2>Open positions</h2>
        {jobs.length > 0 ? (
          <div className="profile-jobs-grid">
            {jobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        ) : (
          <p>No open positions are listed for this employer.</p>
        )}
      </article>

      <aside className="detail-sidebar">
        <section className="detail-sidebar-card">
          <h2>Public license information</h2>
          <dl className="facts-list">
            <div className="fact-row">
              <dt>Legal name</dt>
              <dd>{agency.publicLegalName}</dd>
            </div>
            <div className="fact-row">
              <dt>License class</dt>
              <dd>{agency.publicLicenseClass}</dd>
            </div>
            <div className="fact-row">
              <dt>License number</dt>
              <dd>{agency.publicLicenseNumber}</dd>
            </div>
            <div className="fact-row">
              <dt>Record status</dt>
              <dd>{agency.publicLicenseStatus}</dd>
            </div>
            <div className="fact-row">
              <dt>Source checked</dt>
              <dd>{formatSourceDate(agency.publicLastVerifiedAt)}</dd>
            </div>
          </dl>
        </section>
        <section className="detail-sidebar-card">
          <BriefcaseBusiness className="sidebar-icon" size={24} />
          <h2>Represent this agency?</h2>
          <p>
            Claiming will let an approved employer add workplace details and post
            openings. Public license fields remain locked.
          </p>
          <Link className="button button-outline full-width-button" href="/employers">
            Learn about claiming
          </Link>
        </section>
      </aside>
    </div>
  );
}
