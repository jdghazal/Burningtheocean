import { describe, expect, it } from "vitest";
import { formatPay } from "@/lib/format";
import { getAgencyCards, getJobBySlug, getJobCards } from "@/lib/queries";

describe("demo marketplace data", () => {
  it("loads the seeded agency directory with open-job counts", async () => {
    const agencies = await getAgencyCards();

    expect(agencies).toHaveLength(6);
    expect(agencies.every((agency) => agency.licenseStatus === "DEMO")).toBe(true);
    expect(agencies.reduce((sum, agency) => sum + agency.openJobCount, 0)).toBe(8);
  });

  it("joins job and employer data for a detail page", async () => {
    const jobs = await getJobCards();
    const job = await getJobBySlug("demo-armed-security-officer-orlando");

    expect(jobs).toHaveLength(8);
    expect(job?.agency.employerDisplayName).toContain("Orange Blossom");
    expect(job?.requiresClassD).toBe(true);
    expect(job?.requiresClassG).toBe(true);
  });
});

describe("pay formatting", () => {
  it("formats hourly ranges for job cards", () => {
    expect(formatPay(18, 21, "hour")).toBe("$18–$21/hour");
  });
});
