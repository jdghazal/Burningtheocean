import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Clock3, Info, MapPin } from "lucide-react";
import { ApplicationForm } from "@/components/application-form";
import { formatPay, formatPostedAt } from "@/lib/format";
import { getJobBySlug, jobViewHelpers } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  return { title: job?.title ?? "Security job" };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || job.status !== "PUBLISHED") notFound();

  const employerName = job.agency.employerDisplayName ?? job.agency.publicLegalName;

  return (
    <div className="page-shell detail-shell">
      <article className="detail-main">
        <Link className="text-link back-link" href="/jobs">
          <ArrowLeft size={16} /> Back to jobs
        </Link>
        <p className="eyebrow">{formatPostedAt(job.publishedAt ?? job.createdAt)}</p>
        <h1>{job.title}</h1>
        <Link className="detail-company" href={`/agencies/${job.agency.slug}`}>
          <Building2 size={17} /> {employerName}
        </Link>
        <div className="detail-meta-row">
          <span>
            <MapPin size={17} /> {job.locationCity}, FL
          </span>
          <span>
            <Clock3 size={17} /> {jobViewHelpers.employmentType(job.employmentType)}
          </span>
        </div>
        {job.isDemo && (
          <div className="demo-banner">
            <Info size={18} />
            <span>
              Fictional demonstration listing. Applying only exercises the local
              prototype workflow.
            </span>
          </div>
        )}

        <h2>About this role</h2>
        <p>{job.description}</p>

        <h2>What this role calls for</h2>
        <ul className="requirements-list">
          <li>{jobViewHelpers.license(job.requiresClassD, job.requiresClassG)}</li>
          <li>Reliable transportation to the assigned Florida worksite</li>
          <li>Clear written communication for daily activity reports</li>
          <li>Professional, service-focused interaction with clients and visitors</li>
        </ul>

        <h2>Apply for this position</h2>
        <p>
          This compact demo application shows the candidate flow without collecting
          a résumé or sensitive identity documents.
        </p>
        <ApplicationForm jobId={job.id} />
      </article>

      <aside className="detail-sidebar">
        <section className="detail-sidebar-card job-summary-card">
          <h2>Position summary</h2>
          <dl className="facts-list">
            <div className="fact-row">
              <dt>Pay</dt>
              <dd>
                {formatPay(
                  job.payMinCents === null ? null : job.payMinCents / 100,
                  job.payMaxCents === null ? null : job.payMaxCents / 100,
                  job.payPeriod === "ANNUAL" ? "year" : "hour",
                )}
              </dd>
            </div>
            <div className="fact-row">
              <dt>Type</dt>
              <dd>{jobViewHelpers.employmentType(job.employmentType)}</dd>
            </div>
            <div className="fact-row">
              <dt>Schedule</dt>
              <dd>{jobViewHelpers.schedule(job.title)}</dd>
            </div>
            <div className="fact-row">
              <dt>Credential</dt>
              <dd>{jobViewHelpers.license(job.requiresClassD, job.requiresClassG)}</dd>
            </div>
            <div className="fact-row">
              <dt>Location</dt>
              <dd>
                {job.locationCity}, {job.locationCounty} County
              </dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>
  );
}
