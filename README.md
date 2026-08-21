# Gini Health — Waitlist landing page

The production landing page for **[gini.health](https://gini.health)**.

Built with **Next.js**. Join Now signups are sent to the same Google Sheet as before via a Google Apps Script web app.

## Waitlist / Google Sheet

Submissions POST to the Apps Script endpoint configured in `src/lib/waitlist.ts` (override with `NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT`).

| Column | Source |
|--------|--------|
| Date | Apps Script |
| Email | Join Now modal |
| First Name | — |
| Reason | — |
| Referred By | `?ref=` URL param |
| User Agent | Browser |

Reference implementation: [`apps-script.gs`](apps-script.gs)

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
```

## Deployment

Hosted on **Vercel**, linked to this repo. **Every push to `main` deploys to gini.health.**

```bash
git push origin main
```

Custom domain `gini.health` is configured in Vercel (apex → Vercel A record).
