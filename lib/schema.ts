export const SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS agencies (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  is_demo INTEGER NOT NULL DEFAULT 0,

  public_legal_name TEXT NOT NULL,
  public_license_number TEXT NOT NULL UNIQUE,
  public_license_class TEXT NOT NULL,
  public_license_status TEXT NOT NULL,
  public_address_line_1 TEXT NOT NULL,
  public_address_line_2 TEXT,
  public_city TEXT NOT NULL,
  public_county TEXT NOT NULL,
  public_state TEXT NOT NULL DEFAULT 'FL',
  public_postal_code TEXT NOT NULL,
  public_license_issued_at TEXT,
  public_license_expires_at TEXT,
  public_source_url TEXT,
  public_last_verified_at TEXT NOT NULL,

  employer_display_name TEXT,
  employer_summary TEXT,
  employer_description TEXT,
  employer_website_url TEXT,
  employer_email TEXT,
  employer_phone TEXT,
  employer_logo_url TEXT,
  employer_is_claimed INTEGER NOT NULL DEFAULT 0,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS agencies_status_idx ON agencies(public_license_status);
CREATE INDEX IF NOT EXISTS agencies_city_idx ON agencies(public_city);
CREATE INDEX IF NOT EXISTS agencies_county_idx ON agencies(public_county);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS agency_services (
  agency_id TEXT NOT NULL,
  service_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (agency_id, service_id),
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_demo INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_county TEXT NOT NULL,
  location_state TEXT NOT NULL DEFAULT 'FL',
  location_postal_code TEXT,
  workplace_type TEXT NOT NULL DEFAULT 'ONSITE',
  employment_type TEXT NOT NULL DEFAULT 'FULL_TIME',
  pay_min_cents INTEGER,
  pay_max_cents INTEGER,
  pay_period TEXT NOT NULL DEFAULT 'HOURLY',
  requires_class_d INTEGER NOT NULL DEFAULT 1,
  requires_class_g INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  published_at TEXT,
  closes_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS jobs_agency_status_idx ON jobs(agency_id, status);
CREATE INDEX IF NOT EXISTS jobs_status_published_idx ON jobs(status, published_at);
CREATE INDEX IF NOT EXISTS jobs_city_idx ON jobs(location_city);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  is_demo INTEGER NOT NULL DEFAULT 0,
  candidate_user_id TEXT,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  applicant_city TEXT,
  applicant_state TEXT NOT NULL DEFAULT 'FL',
  has_class_d INTEGER NOT NULL DEFAULT 0,
  has_class_g INTEGER NOT NULL DEFAULT 0,
  cover_letter TEXT,
  resume_storage_key TEXT,
  profile_snapshot TEXT,
  status TEXT NOT NULL DEFAULT 'SUBMITTED',
  consent_to_share_at TEXT NOT NULL,
  submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE RESTRICT,
  UNIQUE (job_id, applicant_email)
);

CREATE INDEX IF NOT EXISTS applications_job_status_idx ON applications(job_id, status);
`;
