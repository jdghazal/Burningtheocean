import Link from "next/link";
import { ArrowUpRight, Briefcase, Building2, MapPin } from "lucide-react";
import type { AgencyCardData } from "@/lib/view-models";
import { formatSourceDate } from "@/lib/format";

export function AgencyCard({ agency }: { agency: AgencyCardData }) {
  return (
    <article className="agency-card">
      <div className="agency-card-heading">
        <div className="agency-icon" aria-hidden="true">
          <Building2 size={22} />
        </div>
        <div>
          <h3>
            <Link href={`/agencies/${agency.slug}`}>{agency.displayName}</Link>
          </h3>
          <p>
            <MapPin size={14} /> {agency.city}, {agency.county} County
          </p>
        </div>
      </div>

      <div className="license-line">
        <span>Class {agency.licenseClass}</span>
        <span aria-hidden="true">·</span>
        <span>{agency.licenseNumber}</span>
        <span className="status-dot">Demo record</span>
      </div>

      <p className="agency-description">{agency.description}</p>

      <div className="chip-row">
        {agency.services.slice(0, 3).map((service) => (
          <span className="chip" key={service}>
            {service}
          </span>
        ))}
      </div>

      <div className="agency-card-footer">
        <small>Sample source date {formatSourceDate(agency.sourceCheckedAt)}</small>
        {agency.openJobCount > 0 && (
          <span className="hiring-label">
            <Briefcase size={14} /> {agency.openJobCount} open role
            {agency.openJobCount === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <Link className="card-link" href={`/agencies/${agency.slug}`}>
        View agency <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
