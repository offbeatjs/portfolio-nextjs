# Portfolio (Next.js)

A fast, accessible, and SEO-friendly personal portfolio built with Next.js. This project powers my developer profile site, showcasing projects, writing, and contact links.

Live site: Coming soon
Repository: offbeatjs/portfolio-nextjs

## Features

- Next.js app with optimized SEO and Open Graph metadata
- Responsive, mobile-first UI
- Dark mode support (system-aware)
- Project and blog sections (optional MDX)
- Image optimization with next/image
- Sitemap and robots.txt
- Analytics ready (Vercel Analytics or Google Analytics)
- Easy deployment to Vercel

## Tech Stack

- Framework: Next.js (App Router)
- Language: JavaScript/TypeScript (both supported)
- Styling: Tailwind CSS or CSS Modules (project-dependent)
- Deployment: Vercel

## Getting Started

Prerequisites:
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

1) Clone the repository:
```bash
git clone https://github.com/offbeatjs/portfolio-nextjs.git
cd portfolio-nextjs
```

2) Install dependencies:
```bash
# choose one
npm install
# pnpm install
# yarn
```

3) Start the development server:
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

4) Build for production:
```bash
npm run build
```

5) Start the production server:
```bash
npm run start
```

## Scripts

Common scripts you may find in package.json:
- dev: Start local dev server
- build: Production build
- start: Run the production server
- lint: Lint the codebase
- format: Format with Prettier (if configured)
- test: Run tests (if configured)

Run a script:
```bash
npm run <script>
```

## Environment Variables

Create a .env.local file in the project root. Add variables as needed:
```bash
# The public URL of your site (used for absolute OG URLs and sitemap)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Analytics (choose one or remove)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email/contact (optional, depending on integration)
RESEND_API_KEY=...
EMAIL_FROM=...
EMAIL_TO=...
```

Note: Do not commit .env.local to version control.

## Project Structure

A typical Next.js App Router structure:
```
.
├─ app/
│  ├─ (marketing)/
│  ├─ blog/            # Optional blog routes (MDX/Contentlayer)
│  ├─ projects/        # Project listings and detail pages
│  ├─ api/             # API routes (if any)
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
├─ lib/
├─ public/             # Static assets (images, icons, og image)
├─ styles/
├─ next.config.js
└─ package.json
```

Your repository may differ; the above is a guideline.

## SEO

- Dynamically set metadata in app/layout and route segments
- Include Open Graph images (e.g., public/og.png)
- Generate sitemap at /sitemap.xml and robots.txt
- Ensure canonical URLs using NEXT_PUBLIC_SITE_URL

## Deployment

Vercel (recommended):
1) Push to GitHub: main or production branch
2) Import the repo on Vercel
3) Add environment variables in Vercel Project Settings
4) Deploy

Other platforms:
- Use npm run build and serve the .next output with a Node server or adapter appropriate to your host.

## Accessibility

- Semantic HTML
- Keyboard navigability
- Sufficient color contrast
- aria-* attributes where needed

Run automated checks with tools like:
- Lighthouse
- axe DevTools

## Contributing

- Fork the repository
- Create a feature branch
- Commit with clear messages
- Open a pull request

Before submitting:
```bash
npm run lint
npm run build
```

## Roadmap Ideas

- MDX-based blog with Contentlayer
- Project data sourced from a CMS or JSON
- RSS feed for blog
- i18n support
- Enhanced theming and animations

## License

MIT License © 2025 Yash Raj
