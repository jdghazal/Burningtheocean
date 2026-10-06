import type { Metadata } from "next";
import { Database, LockKeyhole, RefreshCw } from "lucide-react";

export const metadata: Metadata = { title: "About and data sources" };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">About the platform</p>
          <h1>A focused marketplace for Florida&apos;s security workforce</h1>
          <p>
            Security Careers Florida brings agency research and specialized job
            search into one clear, independent experience.
          </p>
        </div>
      </section>
      <section className="section section-white">
        <div className="page-shell about-grid">
          <article>
            <Database size={24} />
            <h2>Public licensing data</h2>
            <p>
              The production directory is designed for public agency-license records
              from Florida&apos;s licensing authority. The current prototype contains
              fictional records only while the authorized import source is confirmed.
            </p>
          </article>
          <article>
            <RefreshCw size={24} />
            <h2>Clear record freshness</h2>
            <p>
              Imported fields will carry a source and last-checked date. Expired or
              changed records will be preserved for auditability rather than silently
              removed.
            </p>
          </article>
          <article>
            <LockKeyhole size={24} />
            <h2>Separate employer content</h2>
            <p>
              Public license facts stay locked. Approved employers can add workplace
              details and jobs without editing government-sourced fields.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
