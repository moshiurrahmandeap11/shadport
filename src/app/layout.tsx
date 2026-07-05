import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moshiurrahman.online"),
  title: {
    default: "Moshiur Rahman DEAP | Best Full Stack Developer in Bangladesh & Fiverr",
    template: "%s | Moshiur Rahman DEAP",
  },
  description:
    "Hire Moshiur Rahman DEAP - Top-rated Full Stack Developer in Bangladesh specializing in MERN Stack, Next.js, React.js, Node.js. Best developer on Fiverr & LinkedIn. 10+ successful projects delivered.",
  keywords: [
    "moshiur rahman",
    "moshiur rahman deap",
    "best developer in bangladesh",
    "top full stack developer bangladesh",
    "mern stack developer bangladesh",
    "best developer on fiverr",
    "best developer on linkedin",
    "react js developer bangladesh",
    "next js developer bangladesh",
    "node js developer bangladesh",
    "hire developer bangladesh",
    "freelance developer bangladesh",
    "web developer bangladesh",
    "software engineer bangladesh",
    "frontend developer bangladesh",
    "backend developer bangladesh",
    "mongodb developer",
    "express js developer",
    "typescript developer",
    "tailwind css developer",
    "full stack web developer",
    "javascript developer bangladesh",
    "best web developer in bangladesh",
    "top rated developer fiverr",
    "expert developer linkedin",
    "professional developer bangladesh",
    "remote developer bangladesh",
    "full stack engineer bangladesh",
    "web application developer",
    "custom web development",
    "ecommerce developer bangladesh",
    "saas developer bangladesh",
  ],
  authors: [
    { name: "Moshiur Rahman", url: "https://moshiurrahman.online" },
    { name: "Moshiur Rahman DEAP", url: "https://moshiurrahman.online" },
  ],
  creator: "Moshiur Rahman DEAP",
  publisher: "Moshiur Rahman DEAP",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moshiurrahman.online",
    siteName: "Moshiur Rahman DEAP - Full Stack Developer",
    title: "Moshiur Rahman DEAP | Best Full Stack Developer in Bangladesh & Fiverr",
    description:
      "Hire Moshiur Rahman DEAP - Top-rated Full Stack Developer in Bangladesh specializing in MERN Stack, Next.js, React.js, Node.js. Best developer on Fiverr & LinkedIn.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Moshiur Rahman DEAP - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@moshiurrahman",
    title: "Moshiur Rahman DEAP | Best Full Stack Developer in Bangladesh & Fiverr",
    description:
      "Hire Moshiur Rahman DEAP - Top-rated Full Stack Developer in Bangladesh specializing in MERN Stack, Next.js, React.js, Node.js.",
    images: ["/twitter-image"],
    creator: "@moshiurrahman",
  },
  alternates: {
    canonical: "https://moshiurrahman.online",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Web Development Portfolio",
  other: {
    "msvalidate.01": "your-bing-verification-code",
    "p:domain_verify": "your-pinterest-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://moshiurrahman.online" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://moshiurrahman.online/#person",
                  name: "Moshiur Rahman DEAP",
                  alternateName: ["Moshiur Rahman", "Moshiur Rahman Developer", "Moshiur Rahman DEAP Developer"],
                  url: "https://moshiurrahman.online",
                  image: "https://moshiurrahman.online/opengraph-image",
                  jobTitle: "Full Stack Developer",
                  description:
                    "Best Full Stack Developer in Bangladesh specializing in MERN Stack, Next.js, React.js, Node.js. Top-rated developer on Fiverr and LinkedIn.",
                  knowsAbout: [
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                    "Express.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Full Stack Development",
                    "Web Development",
                    "MERN Stack",
                    "JavaScript",
                    "Frontend Development",
                    "Backend Development",
                  ],
                  sameAs: [
                    "https://www.linkedin.com/in/moshiur-rahman",
                    "https://github.com/moshiur-rahman",
                  ],
                  worksFor: {
                    "@type": "Organization",
                    name: "Freelance",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "Bangladesh",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://moshiurrahman.online/#website",
                  url: "https://moshiurrahman.online",
                  name: "Moshiur Rahman DEAP - Full Stack Developer Portfolio",
                  description:
                    "Portfolio of Moshiur Rahman DEAP, the best full stack developer in Bangladesh. Hire for MERN stack, Next.js, React.js projects.",
                  publisher: {
                    "@id": "https://moshiurrahman.online/#person",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://moshiurrahman.online/blogs?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://moshiurrahman.online/#webpage",
                  url: "https://moshiurrahman.online",
                  name: "Moshiur Rahman DEAP | Best Full Stack Developer in Bangladesh",
                  isPartOf: {
                    "@id": "https://moshiurrahman.online/#website",
                  },
                  about: {
                    "@id": "https://moshiurrahman.online/#person",
                  },
                  primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: "https://moshiurrahman.online/opengraph-image",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          <SmoothScroll>
            <Navbar />
            <div className="pt-16">
              {children}
            </div>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
