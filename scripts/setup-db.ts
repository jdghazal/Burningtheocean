import { db } from "../lib/db";

const DEMO_NOTICE =
  "DEMO DATA: This is fictional product-test content, not a real Florida agency, license, or job opening.";

const services = [
  ["unarmed-security", "Unarmed Security", "Unarmed officers for staffed posts."],
  ["armed-security", "Armed Security", "Armed officers for qualifying assignments."],
  ["event-security", "Event Security", "Access control and event support."],
  ["mobile-patrol", "Mobile Patrol", "Scheduled and responsive vehicle patrols."],
  ["residential-security", "Residential Security", "Gatehouse and community patrol services."],
  ["commercial-security", "Commercial Security", "Security staffing for commercial properties."],
] as const;

const agencies = [
  {
    id: "demo-suncoast-sentinel-security",
    slug: "demo-suncoast-sentinel-security",
    legalName: "[DEMO] Suncoast Sentinel Security LLC",
    licenseNumber: "DEMO-B-0001",
    licenseClass: "B (DEMO)",
    city: "Tampa",
    county: "Hillsborough",
    postalCode: "33602",
    address: "100 Demo Bay Avenue",
    displayName: "Suncoast Sentinel Security — Demo",
    description:
      "A fictional Tampa employer used to demonstrate commercial and event security listings.",
    services: ["unarmed-security", "event-security", "commercial-security"],
  },
  {
    id: "demo-gulf-lantern-protective-services",
    slug: "demo-gulf-lantern-protective-services",
    legalName: "[DEMO] Gulf Lantern Protective Services Inc.",
    licenseNumber: "DEMO-B-0002",
    licenseClass: "B (DEMO)",
    city: "St. Petersburg",
    county: "Pinellas",
    postalCode: "33701",
    address: "200 Fictional Pier Road",
    displayName: "Gulf Lantern Protective Services — Demo",
    description: "A fictional Pinellas County patrol provider used only in this demo.",
    services: ["unarmed-security", "mobile-patrol", "residential-security"],
  },
  {
    id: "demo-orange-blossom-security-group",
    slug: "demo-orange-blossom-security-group",
    legalName: "[DEMO] Orange Blossom Security Group LLC",
    licenseNumber: "DEMO-AB-0003",
    licenseClass: "AB (DEMO)",
    city: "Orlando",
    county: "Orange",
    postalCode: "32801",
    address: "300 Imaginary Orange Street",
    displayName: "Orange Blossom Security Group — Demo",
    description: "A fictional Central Florida company used to preview armed and event roles.",
    services: ["armed-security", "event-security", "commercial-security"],
  },
  {
    id: "demo-atlantic-palms-security",
    slug: "demo-atlantic-palms-security",
    legalName: "[DEMO] Atlantic Palms Security Company",
    licenseNumber: "DEMO-B-0004",
    licenseClass: "B (DEMO)",
    city: "Jacksonville",
    county: "Duval",
    postalCode: "32202",
    address: "400 Sample Riverwalk",
    displayName: "Atlantic Palms Security — Demo",
    description: "A fictional Jacksonville security employer used for marketplace testing.",
    services: ["unarmed-security", "commercial-security"],
  },
  {
    id: "demo-everglade-watch-services",
    slug: "demo-everglade-watch-services",
    legalName: "[DEMO] Everglade Watch Services LLC",
    licenseNumber: "DEMO-B-0005",
    licenseClass: "B (DEMO)",
    city: "Miami",
    county: "Miami-Dade",
    postalCode: "33131",
    address: "500 Placeholder Biscayne Boulevard",
    displayName: "Everglade Watch Services — Demo",
    description: "A fictional South Florida provider used to demonstrate residential roles.",
    services: ["armed-security", "residential-security", "mobile-patrol"],
  },
  {
    id: "demo-capital-coast-security",
    slug: "demo-capital-coast-security",
    legalName: "[DEMO] Capital Coast Security Partners LLC",
    licenseNumber: "DEMO-B-0006",
    licenseClass: "B (DEMO)",
    city: "Tallahassee",
    county: "Leon",
    postalCode: "32301",
    address: "600 Example Capitol Lane",
    displayName: "Capital Coast Security — Demo",
    description: "A fictional Tallahassee employer used for this demonstration database.",
    services: ["unarmed-security", "armed-security", "commercial-security"],
  },
] as const;

const jobs = [
  {
    slug: "demo-unarmed-security-officer-tampa",
    agencyId: "demo-suncoast-sentinel-security",
    title: "Unarmed Security Officer — Demo",
    summary: "Evening commercial security post in Tampa.",
    city: "Tampa",
    county: "Hillsborough",
    zip: "33602",
    type: "FULL_TIME",
    min: 1800,
    max: 2100,
    classG: 0,
  },
  {
    slug: "demo-event-security-officer-tampa",
    agencyId: "demo-suncoast-sentinel-security",
    title: "Weekend Event Security Officer — Demo",
    summary: "Part-time event access-control role.",
    city: "Tampa",
    county: "Hillsborough",
    zip: "33607",
    type: "PART_TIME",
    min: 1900,
    max: 2200,
    classG: 0,
  },
  {
    slug: "demo-mobile-patrol-officer-st-petersburg",
    agencyId: "demo-gulf-lantern-protective-services",
    title: "Mobile Patrol Officer — Demo",
    summary: "Overnight patrol route in Pinellas County.",
    city: "St. Petersburg",
    county: "Pinellas",
    zip: "33701",
    type: "FULL_TIME",
    min: 2000,
    max: 2300,
    classG: 0,
  },
  {
    slug: "demo-event-security-officer-orlando",
    agencyId: "demo-orange-blossom-security-group",
    title: "Event Security Officer — Demo",
    summary: "Flexible-shift venue security role in Orlando.",
    city: "Orlando",
    county: "Orange",
    zip: "32801",
    type: "PART_TIME",
    min: 1900,
    max: 2300,
    classG: 0,
  },
  {
    slug: "demo-armed-security-officer-orlando",
    agencyId: "demo-orange-blossom-security-group",
    title: "Armed Security Officer — Demo",
    summary: "Armed commercial post for qualified applicants.",
    city: "Orlando",
    county: "Orange",
    zip: "32805",
    type: "FULL_TIME",
    min: 2400,
    max: 2800,
    classG: 1,
  },
  {
    slug: "demo-commercial-security-officer-jacksonville",
    agencyId: "demo-atlantic-palms-security",
    title: "Commercial Security Officer — Demo",
    summary: "Daytime lobby and access-control position.",
    city: "Jacksonville",
    county: "Duval",
    zip: "32202",
    type: "FULL_TIME",
    min: 1850,
    max: 2150,
    classG: 0,
  },
  {
    slug: "demo-residential-gate-officer-miami",
    agencyId: "demo-everglade-watch-services",
    title: "Residential Gate Officer — Demo",
    summary: "Gatehouse role at a fictional Miami community.",
    city: "Miami",
    county: "Miami-Dade",
    zip: "33133",
    type: "FULL_TIME",
    min: 2100,
    max: 2400,
    classG: 0,
  },
  {
    slug: "demo-security-shift-supervisor-tallahassee",
    agencyId: "demo-capital-coast-security",
    title: "Security Shift Supervisor — Demo",
    summary: "Lead role supporting a small fictional security team.",
    city: "Tallahassee",
    county: "Leon",
    zip: "32301",
    type: "FULL_TIME",
    min: 2300,
    max: 2700,
    classG: 0,
  },
] as const;

const insertService = db.prepare(`
  INSERT INTO services (id, slug, name, description)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(slug) DO UPDATE SET name = excluded.name, description = excluded.description
`);

const insertAgency = db.prepare(`
  INSERT INTO agencies (
    id, slug, is_demo, public_legal_name, public_license_number,
    public_license_class, public_license_status, public_address_line_1,
    public_city, public_county, public_state, public_postal_code,
    public_license_issued_at, public_license_expires_at, public_last_verified_at,
    employer_display_name, employer_summary, employer_description,
    employer_email, employer_is_claimed
  ) VALUES (?, ?, 1, ?, ?, ?, 'DEMO', ?, ?, ?, 'FL', ?, ?, ?, ?, ?, ?, ?, ?, 0)
`);

const insertAgencyService = db.prepare(
  "INSERT INTO agency_services (agency_id, service_id) VALUES (?, ?)",
);

const insertJob = db.prepare(`
  INSERT INTO jobs (
    id, agency_id, slug, is_demo, title, summary, description,
    location_city, location_county, location_state, location_postal_code,
    workplace_type, employment_type, pay_min_cents, pay_max_cents, pay_period,
    requires_class_d, requires_class_g, status, published_at, closes_at
  ) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, 'FL', ?, 'ONSITE', ?, ?, ?, 'HOURLY', 1, ?, 'PUBLISHED', ?, ?)
`);

db.exec("BEGIN IMMEDIATE");
try {
  db.exec("DELETE FROM applications WHERE is_demo = 1");
  db.exec("DELETE FROM jobs WHERE is_demo = 1");
  db.exec(
    "DELETE FROM agency_services WHERE agency_id IN (SELECT id FROM agencies WHERE is_demo = 1)",
  );
  db.exec("DELETE FROM agencies WHERE is_demo = 1");

  for (const [slug, name, description] of services) {
    insertService.run(`service-${slug}`, slug, name, description);
  }

  for (const agency of agencies) {
    insertAgency.run(
      agency.id,
      agency.slug,
      agency.legalName,
      agency.licenseNumber,
      agency.licenseClass,
      agency.address,
      agency.city,
      agency.county,
      agency.postalCode,
      "2026-01-01T00:00:00.000Z",
      "2027-12-31T23:59:59.000Z",
      "2026-10-01T00:00:00.000Z",
      agency.displayName,
      DEMO_NOTICE,
      agency.description,
      `demo+${agency.slug}@example.com`,
    );

    for (const serviceSlug of agency.services) {
      insertAgencyService.run(agency.id, `service-${serviceSlug}`);
    }
  }

  for (const job of jobs) {
    insertJob.run(
      job.slug,
      job.agencyId,
      job.slug,
      job.title,
      job.summary,
      `${DEMO_NOTICE} ${job.summary}`,
      job.city,
      job.county,
      job.zip,
      job.type,
      job.min,
      job.max,
      job.classG,
      "2026-10-01T12:00:00.000Z",
      "2026-12-31T23:59:59.000Z",
    );
  }

  db.exec("COMMIT");
  console.info(
    `Seeded ${agencies.length} fictional demo agencies and ${jobs.length} fictional demo jobs.`,
  );
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
}
