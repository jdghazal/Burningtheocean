import Link from "next/link";
import { BriefcaseBusiness, Menu, UserRound } from "lucide-react";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/agencies", label: "Browse Agencies" },
  { href: "/employers", label: "For Employers" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="Security Careers Florida home">
          <span className="brand-mark" aria-hidden="true">
            <BriefcaseBusiness size={21} strokeWidth={2.2} />
          </span>
          <span>
            <strong>Security Careers</strong>
            <small>Florida</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="sign-in-link" href="/candidate">
            <UserRound size={17} />
            Sign in
          </Link>
          <Link className="button button-small button-primary" href="/employers">
            Post a job
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <Menu size={24} />
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/candidate">Sign in</Link>
            <Link href="/employers">Post a job</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
