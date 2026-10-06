import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Database,
  FileCheck2,
  MapPin,
  Search,
  UserRoundCheck,
} from "lucide-react";
import { AgencyCard } from "@/components/agency-card";
import { JobCard } from "@/components/job-card";
import { getAgencyCards, getJobCards } from "@/lib/queries";

const regions = [
  ["Tampa Bay", "Hillsborough · Pinellas · Pasco", "Tampa"],
  ["South Florida", "Miami-Dade · Broward · Palm Beach", "Miami"],
  ["Central Florida", "Orange · Osceola · Seminole", "Orlando"],
  ["Northeast Florida", "Duval · St. Johns · Clay", "Jacksonville"],
  ["Southwest Florida", "Lee · Collier · Charlotte", "Fort Myers"],
  ["Florida Panhandle", "Leon · Escambia · Bay", "Tallahassee"],
] as const;

export default async function HomePage() {
  const [agencies, jobs] = await Promise.all([getAgencyCards(), getJobCards()]);

  return (
    <>
      <section className="hero">
        <div className="hero-grid page-shell">
          <div className="hero-copy">
            <p className="hero-kicker">Florida&apos;s security career marketplace</p>
            <h1>Find your next security job in Florida.</h1>
            <p>
              Search opportunities from security employers across the state and
              explore Florida&apos;s licensed agency directory.
            </p>
            <form action="/jobs" className="hero-search">
              <label className="search-field">
                <Search size={19} aria-hidden="true" />
                <span className="sr-only">Job title, keyword, or company</span>
                <input name="q" placeholder="Job title, keyword, or company" />
              </label>
              <label className="search-field">
                <MapPin size={19} aria-hidden="true" />
                <span className="sr-only">City or county</span>
                <input name="location" placeholder="City or county" />
              </label>
              <button className="button button-primary" type="submit">
                Search jobs
              </button>
            </form>
            <div className="hero-quick-links">
              <span>Popular:</span>
              <Link href="/jobs?q=unarmed">Unarmed</Link>
              <Link href="/jobs?q=armed">Armed</Link>
              <Link href="/jobs?q=event">Event security</Link>
              <Link href="/jobs?location=Orlando">Orlando</Link>
            </div>
          </div>

          <aside className="hero-sidecard" aria-label="Agency directory preview">
            <span className="mini-label">
              <Database size={14} /> Directory preview
            </span>
            <h2>Research an employer before you apply.</h2>
            <p>
              Search by agency name, city, county, or public license number.
            </p>
            <div className="sidecard-row">
              <span>Eligible agency classes</span>
              <strong>B · BB · AB</strong>
            </div>
            <div className="sidecard-row">
              <span>Current prototype</span>
              <strong>{agencies.length} demo records</strong>
            </div>
            <Link className="button button-outline full-width-button" href="/agencies">
              Browse agency directory <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="scope-strip" aria-label="Platform features">
        <div className="scope-strip-inner page-shell">
          <div className="scope-item">
            <MapPin size={19} /> Florida-focused opportunities
          </div>
          <div className="scope-item">
            <BadgeCheck size={19} /> Searchable public records
          </div>
          <div className="scope-item">
            <FileCheck2 size={19} /> One profile for faster applications
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Fresh opportunities</p>
              <h2>Security jobs across Florida</h2>
              <p>Explore the demo marketplace by role, schedule, license, and location.</p>
            </div>
            <Link className="text-link" href="/jobs">
              See all jobs <ArrowRight size={17} />
            </Link>
          </div>
          <div className="jobs-grid">
            {jobs.slice(0, 3).map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore the state</p>
              <h2>Browse jobs by region</h2>
            </div>
          </div>
          <div className="regions-grid">
            {regions.map(([name, counties, query]) => (
              <Link className="region-card" href={`/jobs?location=${encodeURIComponent(query)}`} key={name}>
                <strong>{name}</strong>
                <span>{counties}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Know the employer</p>
              <h2>Browse security agencies</h2>
              <p>
                Research security agencies by name, location, and public license
                information before applying.
              </p>
            </div>
            <Link className="text-link" href="/agencies">
              Open the directory <ArrowRight size={17} />
            </Link>
          </div>
          <div className="agencies-grid">
            {agencies.slice(0, 3).map((agency) => (
              <AgencyCard agency={agency} key={agency.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A simpler job search</p>
              <h2>How it works</h2>
            </div>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">1</span>
              <Search size={22} />
              <h3>Search jobs and employers</h3>
              <p>Filter Florida-only opportunities and compare agency profiles.</p>
            </article>
            <article className="step-card">
              <span className="step-number">2</span>
              <UserRoundCheck size={22} />
              <h3>Build one candidate profile</h3>
              <p>Keep your experience, availability, and licenses ready to share.</p>
            </article>
            <article className="step-card">
              <span className="step-number">3</span>
              <FileCheck2 size={22} />
              <h3>Apply and stay organized</h3>
              <p>Send focused applications and follow each opportunity in one place.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="employer-callout page-shell">
          <div>
            <p className="hero-kicker">For Florida security agencies</p>
            <h2>Hiring security professionals?</h2>
            <p>
              Claim your agency profile, publish openings, and review qualified
              applicants in one focused marketplace.
            </p>
          </div>
          <Link className="button button-light" href="/employers">
            Get started as an employer <Building2 size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
