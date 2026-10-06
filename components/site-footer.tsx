import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

const footerLinks = [
  { href: "/agencies", label: "Agency directory" },
  { href: "/jobs", label: "Security jobs" },
  { href: "/employers", label: "Employer help" },
  { href: "/about", label: "About & data sources" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-brand">
          <span className="brand-mark brand-mark-light" aria-hidden="true">
            <BriefcaseBusiness size={20} />
          </span>
          <div>
            <strong>Security Careers Florida</strong>
            <p>Security jobs and licensed agency directory.</p>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-legal page-shell">
        <p>
          Independent platform. Not affiliated with or endorsed by the State of
          Florida. License information is sourced from public records; confirm
          current status with the licensing authority.
        </p>
        <p>© {new Date().getFullYear()} Security Careers Florida</p>
      </div>
    </footer>
  );
}
