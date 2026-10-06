import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, FileSearch, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "For security employers",
  description: "Claim an agency profile, publish security jobs, and review applicants.",
};

export default function EmployersPage() {
  return (
    <>
      <section className="employer-hero">
        <div className="page-shell employer-hero-grid">
          <div>
            <p className="hero-kicker">Built for Florida security employers</p>
            <h1>Spend less time filling every open post.</h1>
            <p>
              Present your agency clearly, reach candidates with the right license,
              and manage applications in one focused hiring workspace.
            </p>
            <div className="hero-button-row">
              <Link className="button button-light" href="#early-access">
                Join employer early access
              </Link>
              <Link className="button employer-outline-button" href="/agencies">
                Find your agency profile
              </Link>
            </div>
          </div>
          <div className="employer-preview-card">
            <p className="eyebrow">Employer workspace preview</p>
            <div className="preview-stat-row">
              <span>Active jobs</span>
              <strong>4</strong>
            </div>
            <div className="preview-stat-row">
              <span>New applicants</span>
              <strong>18</strong>
            </div>
            <div className="preview-stat-row">
              <span>Interviews this week</span>
              <strong>6</strong>
            </div>
            <div className="preview-pipeline">
              <span style={{ width: "78%" }} />
            </div>
            <small>Illustrative product preview</small>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">One focused hiring process</p>
              <h2>From public record to new hire</h2>
            </div>
          </div>
          <div className="employer-features">
            <article>
              <BadgeCheck size={24} />
              <h3>Claim your agency profile</h3>
              <p>
                Connect your employer-managed profile to the correct public license
                record after an administrative review.
              </p>
            </article>
            <article>
              <BriefcaseBusiness size={24} />
              <h3>Post focused job listings</h3>
              <p>
                Describe shifts, pay, worksite, and Class D or G requirements so
                applicants understand the role before applying.
              </p>
            </article>
            <article>
              <UsersRound size={24} />
              <h3>Review qualified applicants</h3>
              <p>
                Move candidates through a simple hiring pipeline and keep the team
                aligned on next steps.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="early-access">
        <div className="early-access-card page-shell">
          <FileSearch size={30} />
          <div>
            <p className="eyebrow">Early access</p>
            <h2>Employer accounts are the next product milestone.</h2>
            <p>
              The current prototype demonstrates the public directory, jobs, and
              applicant flow. Authentication, agency claims, and employer dashboards
              will be added before real listings open.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
