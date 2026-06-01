# The Now Designs — Build Guide

> **Purpose**: This document is a complete dependency and architecture reference for an AI agent to build the "The Now Designs" website (Visuals, Art & Design) from scratch.

---

## 1. Project Overview

**The Now Designs** is a visual arts and design brand. The website should be a modern, image-heavy, high-performance portfolio and showcase site. Priorities are:

- Stunning visual presentation (large images, smooth animations)
- Fast page loads and SEO
- Easy content management for the site owner
- Responsive design (mobile-first)
- Accessible (WCAG 2.1 AA)

---

## 2. Recommended Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR/SSG hybrid, image optimization, file-based routing, API routes |
| **Language** | TypeScript | Type safety, better DX, fewer runtime bugs |
| **UI Library** | React 19 | Required by Next.js 15 App Router |
| **Styling** | Tailwind CSS 3.4+ | Utility-first, fast to prototype, easy to maintain |
| **Animations** | Framer Motion 11+ | Production-ready React animation library |
| **CMS** | Sanity.io (headless) | Real-time previews, media management, GROQ queries |
| **Deployment** | Vercel | Native Next.js support, global CDN, serverless functions |
| **Version Control** | GitHub + GitHub Actions | CI/CD, branch previews |

---

## 3. Core Dependencies

### 3.1 Production Dependencies

```
next                    ^15.5.0       # React meta-framework
react                   ^19.0.0       # UI library
react-dom               ^19.0.0       # React DOM renderer
tailwindcss             ^3.4.0        # Utility-first CSS framework
postcss                 ^8.4.33       # CSS post-processor (required by Tailwind)
autoprefixer            ^10.4.17      # Vendor prefixing (required by Tailwind)
framer-motion           ^11.0.0       # Animation library
@sanity/client          ^6.0.0        # Sanity CMS content fetching
@sanity/image-url       ^1.0.0        # Sanity image URL builder
next-sanity             ^9.0.0        # Next.js + Sanity integration helpers
@portabletext/react     ^3.0.0        # Render Sanity rich text (Portable Text)
```

### 3.2 Dev Dependencies

```
typescript              ^5.5.0        # TypeScript compiler
@types/node             ^20.10.0      # Node.js type definitions
@types/react            ^19.0.0       # React type definitions
@types/react-dom        ^19.0.0       # React DOM type definitions
eslint                  ^9.0.0        # Linter
eslint-config-next      ^15.5.0       # Next.js ESLint preset
prettier                ^3.2.0        # Code formatter
prettier-plugin-tailwindcss ^0.6.0    # Auto-sort Tailwind classes
```

### 3.3 Optional / Recommended Dependencies

```
sharp                   ^0.33.0       # Image optimization (Next.js uses this under the hood)
clsx                    ^2.1.0        # Conditional className utility
lucide-react            ^0.400.0      # Icon library (lightweight SVG icons)
@vercel/analytics       ^1.0.0        # Vercel web analytics
@vercel/speed-insights  ^1.0.0        # Core Web Vitals monitoring
```

---

## 4. Project Initialization Commands

Run these commands in order to scaffold the project:

```bash
# 1. Create the Next.js project
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Install animation library
npm install framer-motion

# 3. Install Sanity CMS dependencies
npm install @sanity/client @sanity/image-url next-sanity @portabletext/react

# 4. Install optional but recommended packages
npm install sharp clsx lucide-react

# 5. Install Vercel analytics (optional)
npm install @vercel/analytics @vercel/speed-insights

# 6. Install dev tooling
npm install -D prettier prettier-plugin-tailwindcss
```

---

## 5. Project Structure

```
thenowdesigns/
├── public/                    # Static assets (favicon, og-image, etc.)
│   ├── fonts/                 # Custom fonts (if self-hosting)
│   └── images/                # Static images (logo, fallbacks)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (html, body, fonts, metadata)
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Tailwind directives + global styles
│   │   ├── portfolio/
│   │   │   ├── page.tsx       # Portfolio gallery page
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Individual project page
│   │   ├── about/
│   │   │   └── page.tsx       # About / bio page
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact page
│   │   └── api/               # API routes (contact form, etc.)
│   │       └── contact/
│   │           └── route.ts
│   ├── components/            # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedWork.tsx
│   │   │   └── Testimonials.tsx
│   │   └── portfolio/
│   │       ├── ProjectGrid.tsx
│   │       └── ProjectCard.tsx
│   ├── lib/                   # Utility functions and configs
│   │   ├── sanity/
│   │   │   ├── client.ts      # Sanity client configuration
│   │   │   ├── queries.ts     # GROQ queries
│   │   │   └── image.ts       # Image URL helper
│   │   └── utils.ts           # General utility functions
│   └── types/                 # TypeScript type definitions
│       └── index.ts
├── sanity/                    # Sanity Studio (optional embedded)
│   ├── schemas/
│   │   ├── project.ts         # Portfolio project schema
│   │   ├── category.ts        # Project category schema
│   │   └── siteSettings.ts    # Global settings schema
│   └── sanity.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local                 # Environment variables (NEVER commit)
```

---

## 6. Environment Variables

Create a `.env.local` file (never commit this):

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token

# Contact Form (if using a service like Resend)
RESEND_API_KEY=your_resend_key

# Site
NEXT_PUBLIC_SITE_URL=https://thenowdesigns.com
```

---

## 7. Key Configuration Files

### 7.1 `tailwind.config.ts`

Extend the default theme with brand colors, custom fonts, and animation utilities:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf5ff",
          // ... define full brand palette
          900: "#1a0533",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 7.2 `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

### 7.3 Sanity Client (`src/lib/sanity/client.ts`)

```ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

---

## 8. Pages to Build

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero section, featured work carousel, about teaser, CTA |
| **Portfolio** | `/portfolio` | Filterable grid/masonry of all projects |
| **Project Detail** | `/portfolio/[slug]` | Full project showcase with images, description, details |
| **About** | `/about` | Bio, skills, process, philosophy |
| **Contact** | `/contact` | Contact form with validation |

---

## 9. Key Features to Implement

### 9.1 Image Handling
- Use `next/image` for all images (automatic optimization, lazy loading, responsive sizes)
- Sanity images via `@sanity/image-url` for dynamic content
- WebP/AVIF format support (built into Next.js)
- Blur placeholder for loading states (`blurDataURL`)

### 9.2 Animations
- Page transitions with Framer Motion `AnimatePresence`
- Scroll-triggered reveals using `whileInView`
- Hover effects on portfolio cards
- Smooth image gallery transitions

### 9.3 SEO & Metadata
- Use Next.js `metadata` export in each page for title, description, Open Graph
- Generate `sitemap.xml` and `robots.txt` using Next.js built-in support
- Structured data (JSON-LD) for creative works

### 9.4 Performance Targets
- Lighthouse score ≥ 90 on all categories
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Use `next/font` for zero-layout-shift font loading

### 9.5 Contact Form
- Client-side validation
- Server-side API route (`/api/contact`) to send emails
- Consider Resend, SendGrid, or Nodemailer for email delivery
- Rate limiting and honeypot for spam prevention

---

## 10. Sanity CMS Schemas

### Project Schema (core content type)

```ts
// sanity/schemas/project.ts
export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Description", type: "text" },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "categories", title: "Categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] },
    { name: "date", title: "Date", type: "date" },
    { name: "featured", title: "Featured", type: "boolean" },
  ],
};
```

---

## 11. Deployment Checklist

1. **Vercel**: Connect GitHub repo → auto-deploy on push to `main`
2. **Environment variables**: Set all `.env.local` vars in Vercel dashboard
3. **Domain**: Configure custom domain in Vercel
4. **Sanity CORS**: Add production URL to Sanity project CORS origins
5. **Analytics**: Enable Vercel Analytics in dashboard
6. **Preview deployments**: Automatic on every PR

---

## 12. Commands Reference

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 13. Design Principles for This Site

- **Minimal, clean layout** — let the artwork be the hero
- **Large imagery** — full-bleed images, generous whitespace
- **Smooth interactions** — subtle animations that feel polished, not distracting
- **Dark/light mode** — consider supporting both via Tailwind `dark:` utilities
- **Typography** — use a refined display font for headings, clean sans-serif for body
- **Mobile-first** — design for small screens first, scale up

---

*This guide was researched on June 1, 2026. Always check for the latest stable versions before installing.*
