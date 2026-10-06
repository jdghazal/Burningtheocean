# Security Careers Florida

A full-stack prototype for a Florida-only security-industry job marketplace and
licensed-agency directory. Candidates can search employers and jobs, review public
license fields, and complete a short demo application.

## What is included

- Searchable agency directory with license class, location, services, and hiring status
- Job search with keyword, location, employment type, and license filters
- Agency and job detail pages
- Working application endpoint with validation and duplicate prevention
- SQLite data model that keeps public license fields separate from employer content
- Responsive, accessible layouts for mobile and desktop
- Six fictional agencies and eight fictional jobs for product testing

All seeded records are explicitly marked as demo content. The repository does not yet
contain an official FDACS license export and must not be represented as a complete or
current list of Florida agencies.

## Local development

Requirements: Node.js 24 or later and npm.

```bash
npm install
npm run db:setup
npm run dev
```

The application runs at `http://localhost:3000`. The SQLite database is created at
`data/security-careers.db` and is ignored by Git.

Useful checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Data model

Government-sourced agency fields use the `public_` prefix and are kept separate from
employer-managed profile fields. The production importer should cover the eligible
Florida Chapter 493 agency classes (initially B, BB, and AB), record the source and
refresh time, preserve inactive records, and prevent employers from editing imported
license facts.

Before using real applicant data, replace local SQLite storage with production database
and private file-storage services, add authentication and role-based access, and complete
privacy, security, retention, and employer-claim workflows.
