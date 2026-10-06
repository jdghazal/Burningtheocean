import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import type { JobCardData } from "@/lib/view-models";
import { formatPay, formatPostedAt } from "@/lib/format";

export function JobCard({ job }: { job: JobCardData }) {
  const initials = job.agencyName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <article className="job-card">
      <div className="job-card-topline">
        <div className="company-avatar" aria-hidden="true">
          {initials}
        </div>
        <span className="posted-time">{formatPostedAt(job.postedAt)}</span>
      </div>
      <div>
        <p className="eyebrow">{job.agencyName}</p>
        <h3>
          <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
        </h3>
      </div>
      <div className="job-meta">
        <span>
          <MapPin size={15} /> {job.city}, FL
        </span>
        <span>
          <Clock3 size={15} /> {job.schedule}
        </span>
      </div>
      <div className="chip-row">
        <span className="chip chip-sand">
          {formatPay(job.payMin, job.payMax, job.payPeriod)}
        </span>
        <span className="chip">{job.employmentType}</span>
        <span className="chip">{job.licenseRequired}</span>
      </div>
      <Link className="card-link" href={`/jobs/${job.slug}`}>
        View position <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
