"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { JobCard } from "@/components/job-card";
import type { JobCardData } from "@/lib/view-models";

type Props = {
  jobs: JobCardData[];
  initialQuery?: string;
  initialLocation?: string;
};

export function JobDirectory({ jobs, initialQuery = "", initialLocation = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [employmentType, setEmploymentType] = useState("all");
  const [license, setLicense] = useState("all");
  const [sort, setSort] = useState("newest");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();
    const filtered = jobs.filter((job) => {
      const searchable = `${job.title} ${job.agencyName}`.toLowerCase();
      const searchableLocation = `${job.city} ${job.county}`.toLowerCase();
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (!normalizedLocation || searchableLocation.includes(normalizedLocation)) &&
        (employmentType === "all" || job.employmentType === employmentType) &&
        (license === "all" || job.licenseRequired.includes(license))
      );
    });

    return filtered.sort((a, b) => {
      if (sort === "pay") return (b.payMax ?? 0) - (a.payMax ?? 0);
      if (sort === "title") return a.title.localeCompare(b.title);
      return b.postedAt.getTime() - a.postedAt.getTime();
    });
  }, [jobs, query, location, employmentType, license, sort]);

  function clearFilters() {
    setQuery("");
    setLocation("");
    setEmploymentType("all");
    setLicense("all");
  }

  return (
    <div className="directory-shell page-shell">
      <aside className="filter-panel" aria-label="Job filters">
        <h2>
          <SlidersHorizontal size={18} /> Filters
        </h2>
        <div className="filter-group">
          <label htmlFor="job-search">Role or agency</label>
          <div className="input-with-icon">
            <Search size={17} aria-hidden="true" />
            <input
              className="input"
              id="job-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Security officer"
              type="search"
              value={query}
            />
          </div>
        </div>
        <div className="filter-group">
          <label htmlFor="job-location">City or county</label>
          <input
            className="input"
            id="job-location"
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Orlando"
            type="search"
            value={location}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="employment-type">Employment type</label>
          <select
            className="select"
            id="employment-type"
            onChange={(event) => setEmploymentType(event.target.value)}
            value={employmentType}
          >
            <option value="all">All types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="required-license">Required license</label>
          <select
            className="select"
            id="required-license"
            onChange={(event) => setLicense(event.target.value)}
            value={license}
          >
            <option value="all">Any credential</option>
            <option value="Class D">Class D</option>
            <option value="Class G">Class G</option>
          </select>
        </div>
        <button className="clear-button" onClick={clearFilters} type="button">
          Clear all filters
        </button>
      </aside>

      <section aria-labelledby="job-results-title">
        <div className="results-toolbar">
          <strong id="job-results-title" aria-live="polite">
            {results.length} open {results.length === 1 ? "position" : "positions"}
          </strong>
          <label className="sort-label">
            <span>Sort by</span>
            <select
              className="select"
              onChange={(event) => setSort(event.target.value)}
              value={sort}
            >
              <option value="newest">Newest</option>
              <option value="pay">Highest pay</option>
              <option value="title">Job title</option>
            </select>
          </label>
        </div>
        {results.length > 0 ? (
          <div className="results-list">
            {results.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No jobs match these filters</h3>
            <p>Try a nearby city or remove one of your filters.</p>
            <button className="button button-outline" onClick={clearFilters} type="button">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
