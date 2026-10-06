import type { Metadata } from "next";
import Link from "next/link";
import { BookmarkCheck, FileUser, SearchCheck } from "lucide-react";

export const metadata: Metadata = { title: "Candidate workspace" };

export default function CandidatePage() {
  return (
    <section className="section section-white candidate-page">
      <div className="page-shell narrow-shell">
        <p className="eyebrow">Candidate workspace preview</p>
        <h1>Build your profile once. Choose what to send each time.</h1>
        <p className="large-copy">
          Candidate accounts are planned for the next milestone. You can already
          explore the complete demo job search and submit a local test application.
        </p>
        <div className="candidate-feature-list">
          <div>
            <FileUser size={22} />
            <span>Reusable experience and credential profile</span>
          </div>
          <div>
            <BookmarkCheck size={22} />
            <span>Saved jobs and application tracking</span>
          </div>
          <div>
            <SearchCheck size={22} />
            <span>Florida-only employer and job discovery</span>
          </div>
        </div>
        <Link className="button button-primary" href="/jobs">
          Explore demo jobs
        </Link>
      </div>
    </section>
  );
}
