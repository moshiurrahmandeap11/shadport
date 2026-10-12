# Moshiur Rahman DEAP — Full Stack Developer Portfolio & CMS

[![Live Website](https://img.shields.io/badge/Live_Site-moshiur.pro-orange?style=for-the-badge)](https://moshiur.pro)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

The official personal portfolio website and blog publishing CMS platform for **Moshiur Rahman DEAP**, top-rated Full Stack Developer specializing in the MERN Stack, Next.js, React.js, and Node.js.

---

## 🌟 Highlights & Key Features

- **⚡ Modern Architecture:** Built on **Next.js 16 (App Router)** and **React 19** with the Babel React Compiler enabled for auto-memoization.
- **🎨 Premium Visual Experience:**
  - **GSAP 3.15 + ScrollTrigger:** Text split typography reveals, stacking pinned project cards, and horizontal workflow scrolling.
  - **Lenis Smooth Scroll:** Momentum-based buttery-smooth scrolling physics.
  - **Circular Ripple Theme Toggle:** Smooth fullscreen circular mask light/dark transition.
- **📝 Self-Contained Blog CMS:**
  - Custom WYSIWYG Quill rich text editor with media and video embedding.
  - Automatic slug generator and reading time estimator.
  - RSS 2.0 feed available at `/feed.xml`.
- **🛡️ Secure Admin Portal:**
  - Protected admin panel at `/admin/moshiur`.
  - Rate limiting & lockout after 5 consecutive failed attempts.
  - Client inquiries inbox with one-click **CSV Export**.
- **🚀 SEO & Performance:**
  - Automated dynamic Edge OpenGraph & Twitter image generation (`@vercel/og`).
  - Complete JSON-LD Schemas: `Person`, `WebSite`, `WebPage`, `ProfilePage`, `CreativeWork`, `Blog`, `BlogPosting`, `FAQPage`.
  - Auto-generated `sitemap.xml` and privacy-tuned `robots.txt`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.2.10 (App Router), React 19.2.4 |
| **Styling** | Tailwind CSS v4, HeroUI, Lucide React, Simple Icons |
| **Animation** | GSAP 3.15, GSAP ScrollTrigger, Lenis 1.3, Framer Motion 12 |
| **State & Data** | TanStack React Query v5, Zod Schema Validation |
| **Editor** | Quill 2.0.3 Rich Text Editor |
| **Icons & Fonts** | Lucide React, React Icons, Google Geist Sans & Mono |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/moshiurrahmandeap11/shadport.git

# Navigate to project directory
cd shadport

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Public API & Site URL
NEXT_PUBLIC_SITE_URL=https://moshiur.pro
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Admin Credentials
NEXT_PUBLIC_ADMIN_EMAIL=admin@moshiur.pro
ADMIN_PASSWORD_HASH=your_secure_password
JWT_SECRET=your_secret_jwt_key_here

# Contact / Resume
NEXT_PUBLIC_RESUME_URL=/resume.pdf
NEXT_PUBLIC_BOOKING_URL=https://calendly.com/...
```

### Running Locally

```bash
# Start development server
npm run dev

# Run ESLint check
npm run lint

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📬 Contact & Hire

- **Website:** [https://moshiur.pro](https://moshiur.pro)
- **Email:** [contact@moshiur.pro](mailto:contact@moshiur.pro)
- **LinkedIn:** [Moshiur Rahman DEAP](https://linkedin.com/in/moshiurrahmandeap)
- **GitHub:** [@moshiurrahmandeap11](https://github.com/moshiurrahmandeap11)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
