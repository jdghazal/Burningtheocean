export type AgencyCardData = {
  id: string;
  slug: string;
  legalName: string;
  displayName: string;
  city: string;
  county: string;
  licenseClass: string;
  licenseNumber: string;
  licenseStatus: string;
  sourceCheckedAt: Date;
  claimed: boolean;
  hiringNow: boolean;
  services: string[];
  openJobCount: number;
  description: string;
};

export type JobCardData = {
  id: string;
  slug: string;
  title: string;
  agencyName: string;
  agencySlug: string;
  city: string;
  county: string;
  employmentType: string;
  schedule: string;
  payMin: number | null;
  payMax: number | null;
  payPeriod: string;
  licenseRequired: string;
  postedAt: Date;
  featured: boolean;
};
