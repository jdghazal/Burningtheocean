"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AgencyCard } from "@/components/agency-card";
import type { AgencyCardData } from "@/lib/view-models";

type Props = {
  agencies: AgencyCardData[];
  initialQuery?: string;
};

export function AgencyDirectory({ agencies, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [county, setCounty] = useState("all");
  const [licenseClass, setLicenseClass] = useState("all");
  const [hiringOnly, setHiringOnly] = useState(false);
  const [sort, setSort] = useState("name");

  const counties = useMemo(
    () => [...new Set(agencies.map((agency) => agency.county))].sort(),
    [agencies],
  );

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = agencies.filter((agency) => {
      const searchable = [
        agency.displayName,
        agency.legalName,
        agency.city,
        agency.county,
        agency.licenseNumber,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalized || searchable.includes(normalized)) &&
        (county === "all" || agency.county === county) &&
        (licenseClass === "all" || agency.licenseClass === licenseClass) &&
        (!hiringOnly || agency.hiringNow)
      );
    });

    return filtered.sort((a, b) => {
      if (sort === "city") return a.city.localeCompare(b.city);
      if (sort === "jobs") return b.openJobCount - a.openJobCount;
      return a.displayName.localeCompare(b.displayName);
    });
  }, [agencies, query, county, licenseClass, hiringOnly, sort]);

  function clearFilters() {
    setQuery("");
    setCounty("all");
    setLicenseClass("all");
    setHiringOnly(false);
  }

  return (
    <div className="directory-shell page-shell">
      <aside className="filter-panel" aria-label="Agency filters">
        <h2>
          <SlidersHorizontal size={18} /> Filters
        </h2>
        <div className="filter-group">
          <label htmlFor="agency-search">Agency, city, or license number</label>
          <div className="input-with-icon">
            <Search size={17} aria-hidden="true" />
            <input
              className="input"
              id="agency-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Tampa or B 0000000"
              type="search"
              value={query}
            />
          </div>
        </div>
        <div className="filter-group">
          <label htmlFor="agency-county">County</label>
          <select
            className="select"
            id="agency-county"
            onChange={(event) => setCounty(event.target.value)}
            value={county}
          >
            <option value="all">All counties</option>
            {counties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="license-class">License class</label>
          <select
            className="select"
            id="license-class"
            onChange={(event) => setLicenseClass(event.target.value)}
            value={licenseClass}
          >
            <option value="all">All eligible classes</option>
            <option value="B">Class B</option>
            <option value="BB">Class BB</option>
            <option value="AB">Class AB</option>
          </select>
        </div>
        <label className="checkbox-row filter-checkbox">
          <input
            checked={hiringOnly}
            onChange={(event) => setHiringOnly(event.target.checked)}
            type="checkbox"
          />
          Show agencies with open jobs
        </label>
        <button className="clear-button" onClick={clearFilters} type="button">
          Clear all filters
        </button>
      </aside>

      <section aria-labelledby="agency-results-title">
        <div className="results-toolbar">
          <strong id="agency-results-title" aria-live="polite">
            {results.length} {results.length === 1 ? "agency" : "agencies"}
          </strong>
          <label className="sort-label">
            <span>Sort by</span>
            <select
              className="select"
              onChange={(event) => setSort(event.target.value)}
              value={sort}
            >
              <option value="name">Name A–Z</option>
              <option value="city">City</option>
              <option value="jobs">Open jobs</option>
            </select>
          </label>
        </div>

        {results.length > 0 ? (
          <div className="results-list">
            {results.map((agency) => (
              <AgencyCard agency={agency} key={agency.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No agencies match these filters</h3>
            <p>Try expanding your location or clearing a filter.</p>
            <button className="button button-outline" onClick={clearFilters} type="button">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
