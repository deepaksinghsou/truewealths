# True Wealths CMS Website

Minimal, trust-first financial advisory website built with Next.js App Router + Tailwind with admin CMS editing hooks for InsForge MCP datastore/auth.

## Pages
- Home
- About
- Services
- How We Work
- Contact
- Legal

## Admin
- `/admin/login` for secure admin login (email/password)
- `/admin` for content management
- Admin can edit home/about/services/contact/legal content

## InsForge MCP integration
Set environment variables:

```bash
INSFORGE_BASE_URL=https://<your-insforge-server>
INSFORGE_API_KEY=<api-key>
ADMIN_SESSION_SECRET=<strong-random-secret>
ADMIN_EMAIL=<fallback-admin-email>
ADMIN_PASSWORD=<fallback-admin-password>
```

When InsForge env vars are not configured or unavailable, the app falls back to in-memory content for local development. Admin authentication can still work using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Run
```bash
npm install
npm run dev
```
