import { db } from "@/lib/db";
import type { AgencyCardData, JobCardData } from "@/lib/view-models";

type AgencyListRow = {
  id: string;
  slug: string;
  public_legal_name: string;
  public_license_number: string;
  public_license_class: string;
  public_license_status: string;
  public_city: string;
  public_county: string;
  public_last_verified_at: string;
  employer_display_name: string | null;
  employer_description: string | null;
  employer_summary: string | null;
  employer_is_claimed: number;
  services: string;
  open_job_count: number;
};

type JobRow = {
  id: string;
  agency_id: string;
  slug: string;
  is_demo: number;
  title: string;
  summary: string;
  description: string;
  location_city: string;
  location_county: string;
  location_state: string;
  location_postal_code: string | null;
  workplace_type: string;
  employment_type: string;
  pay_min_cents: number | null;
  pay_max_cents: number | null;
  pay_period: string;
  requires_class_d: number;
  requires_class_g: number;
  status: string;
  published_at: string | null;
  closes_at: string | null;
  created_at: string;
  updated_at: string;
};

type AgencyRow = {
  id: string;
  slug: string;
  is_demo: number;
  public_legal_name: string;
  public_license_number: string;
  public_license_class: string;
  public_license_status: string;
  public_address_line_1: string;
  public_address_line_2: string | null;
  public_city: string;
  public_county: string;
  public_state: string;
  public_postal_code: string;
  public_license_issued_at: string | null;
  public_license_expires_at: string | null;
  public_source_url: string | null;
  public_last_verified_at: string;
  employer_display_name: string | null;
  employer_summary: string | null;
  employer_description: string | null;
  employer_website_url: string | null;
  employer_email: string | null;
  employer_phone: string | null;
  employer_logo_url: string | null;
  employer_is_claimed: number;
  created_at: string;
  updated_at: string;
};

export type JobDetail = {
  id: string;
  agencyId: string;
  slug: string;
  isDemo: boolean;
  title: string;
  summary: string;
  description: string;
  locationCity: string;
  locationCounty: string;
  locationState: string;
  locationPostalCode: string | null;
  workplaceType: string;
  employmentType: string;
  payMinCents: number | null;
  payMaxCents: number | null;
  payPeriod: string;
  requiresClassD: boolean;
  requiresClassG: boolean;
  status: string;
  publishedAt: Date | null;
  closesAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function friendlyEmploymentType(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("-");
}

function scheduleForTitle(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("weekend")) return "Weekends";
  if (normalized.includes("mobile patrol")) return "Overnight";
  if (normalized.includes("event")) return "Flexible shifts";
  if (normalized.includes("gate")) return "Day or evening";
  return "Full schedule";
}

function requiredLicense(requiresClassD: boolean, requiresClassG: boolean) {
  if (requiresClassD && requiresClassG) return "Class D + G required";
  if (requiresClassG) return "Class G required";
  if (requiresClassD) return "Class D required";
  return "No license listed";
}

function toJobDetail(row: JobRow): JobDetail {
  return {
    id: row.id,
    agencyId: row.agency_id,
    slug: row.slug,
    isDemo: Boolean(row.is_demo),
    title: row.title,
    summary: row.summary,
    description: row.description,
    locationCity: row.location_city,
    locationCounty: row.location_county,
    locationState: row.location_state,
    locationPostalCode: row.location_postal_code,
    workplaceType: row.workplace_type,
    employmentType: row.employment_type,
    payMinCents: row.pay_min_cents,
    payMaxCents: row.pay_max_cents,
    payPeriod: row.pay_period,
    requiresClassD: Boolean(row.requires_class_d),
    requiresClassG: Boolean(row.requires_class_g),
    status: row.status,
    publishedAt: row.published_at ? new Date(row.published_at) : null,
    closesAt: row.closes_at ? new Date(row.closes_at) : null,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

function toJobCard(row: JobRow & { agency_slug: string; agency_name: string }): JobCardData {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    agencyName: row.agency_name,
    agencySlug: row.agency_slug,
    city: row.location_city,
    county: row.location_county,
    employmentType: friendlyEmploymentType(row.employment_type),
    schedule: scheduleForTitle(row.title),
    payMin: row.pay_min_cents === null ? null : row.pay_min_cents / 100,
    payMax: row.pay_max_cents === null ? null : row.pay_max_cents / 100,
    payPeriod: row.pay_period === "ANNUAL" ? "year" : "hour",
    licenseRequired: requiredLicense(Boolean(row.requires_class_d), Boolean(row.requires_class_g)),
    postedAt: new Date(row.published_at ?? row.created_at),
    featured: false,
  };
}

export async function getAgencyCards(): Promise<AgencyCardData[]> {
  const rows = db
    .prepare(
      `
        SELECT
          a.id, a.slug, a.public_legal_name, a.public_license_number,
          a.public_license_class, a.public_license_status, a.public_city,
          a.public_county, a.public_last_verified_at, a.employer_display_name,
          a.employer_description, a.employer_summary, a.employer_is_claimed,
          COALESCE(GROUP_CONCAT(DISTINCT s.name), '') AS services,
          (
            SELECT COUNT(*) FROM jobs j
            WHERE j.agency_id = a.id AND j.status = 'PUBLISHED'
          ) AS open_job_count
        FROM agencies a
        LEFT JOIN agency_services ags ON ags.agency_id = a.id
        LEFT JOIN services s ON s.id = ags.service_id
        GROUP BY a.id
        ORDER BY COALESCE(a.employer_display_name, a.public_legal_name)
      `,
    )
    .all() as unknown as AgencyListRow[];

  return rows.map((agency) => ({
    id: agency.id,
    slug: agency.slug,
    legalName: agency.public_legal_name,
    displayName: agency.employer_display_name ?? agency.public_legal_name,
    city: agency.public_city,
    county: agency.public_county,
    licenseClass: agency.public_license_class.split(" ")[0],
    licenseNumber: agency.public_license_number,
    licenseStatus: agency.public_license_status,
    sourceCheckedAt: new Date(agency.public_last_verified_at),
    claimed: Boolean(agency.employer_is_claimed),
    hiringNow: agency.open_job_count > 0,
    services: agency.services ? agency.services.split(",") : [],
    openJobCount: agency.open_job_count,
    description:
      agency.employer_description ??
      agency.employer_summary ??
      "Public license record awaiting an employer profile.",
  }));
}

export async function getJobCards(): Promise<JobCardData[]> {
  const rows = db
    .prepare(
      `
        SELECT j.*, a.slug AS agency_slug,
          COALESCE(a.employer_display_name, a.public_legal_name) AS agency_name
        FROM jobs j
        JOIN agencies a ON a.id = j.agency_id
        WHERE j.status = 'PUBLISHED'
        ORDER BY j.published_at DESC, j.title
      `,
    )
    .all() as unknown as Array<JobRow & { agency_slug: string; agency_name: string }>;

  return rows.map((row, index) => ({ ...toJobCard(row), featured: index < 3 }));
}

export async function getAgencyBySlug(slug: string) {
  const row = db.prepare("SELECT * FROM agencies WHERE slug = ?").get(slug) as
    | (AgencyRow & Record<string, unknown>)
    | undefined;
  if (!row) return null;

  const services = db
    .prepare(
      `
        SELECT s.id, s.name FROM services s
        JOIN agency_services ags ON ags.service_id = s.id
        WHERE ags.agency_id = ? ORDER BY s.name
      `,
    )
    .all(row.id) as unknown as Array<{ id: string; name: string }>;
  const jobRows = db
    .prepare("SELECT * FROM jobs WHERE agency_id = ? AND status = 'PUBLISHED' ORDER BY published_at DESC")
    .all(row.id) as unknown as JobRow[];

  return {
    id: row.id,
    slug: row.slug,
    isDemo: Boolean(row.is_demo),
    publicLegalName: row.public_legal_name,
    publicLicenseNumber: row.public_license_number,
    publicLicenseClass: row.public_license_class,
    publicLicenseStatus: row.public_license_status,
    publicAddressLine1: row.public_address_line_1,
    publicAddressLine2: row.public_address_line_2,
    publicCity: row.public_city,
    publicCounty: row.public_county,
    publicState: row.public_state,
    publicPostalCode: row.public_postal_code,
    publicLicenseIssuedAt: row.public_license_issued_at
      ? new Date(row.public_license_issued_at)
      : null,
    publicLicenseExpiresAt: row.public_license_expires_at
      ? new Date(row.public_license_expires_at)
      : null,
    publicSourceUrl: row.public_source_url,
    publicLastVerifiedAt: new Date(row.public_last_verified_at),
    employerDisplayName: row.employer_display_name,
    employerSummary: row.employer_summary,
    employerDescription: row.employer_description,
    employerWebsiteUrl: row.employer_website_url,
    employerEmail: row.employer_email,
    employerPhone: row.employer_phone,
    employerLogoUrl: row.employer_logo_url,
    employerIsClaimed: Boolean(row.employer_is_claimed),
    services: services.map((service) => ({ service })),
    jobs: jobRows.map(toJobDetail),
  };
}

export async function getJobBySlug(slug: string) {
  const row = db
    .prepare(
      `
        SELECT j.*, a.slug AS agency_slug, a.public_legal_name AS agency_legal_name,
          a.employer_display_name AS agency_display_name
        FROM jobs j JOIN agencies a ON a.id = j.agency_id
        WHERE j.slug = ?
      `,
    )
    .get(slug) as unknown as
    | (JobRow & {
        agency_slug: string;
        agency_legal_name: string;
        agency_display_name: string | null;
      })
    | undefined;
  if (!row) return null;

  return {
    ...toJobDetail(row),
    agency: {
      slug: row.agency_slug,
      publicLegalName: row.agency_legal_name,
      employerDisplayName: row.agency_display_name,
    },
  };
}

export const jobViewHelpers = {
  employmentType: friendlyEmploymentType,
  schedule: scheduleForTitle,
  license: requiredLicense,
};
