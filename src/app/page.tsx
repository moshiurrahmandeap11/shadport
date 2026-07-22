import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";
import HighlightText from "@/components/HighlightText";
import WorkProcess from "@/components/WorkProcess";
import WhyChooseMe from "@/components/WhyChooseMe";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Moshiur Rahman DEAP | Best Full Stack Developer in Bangladesh & Fiverr",
  description:
    "Hire Moshiur Rahman DEAP - Top-rated Full Stack Developer in Bangladesh specializing in MERN Stack, Next.js, React.js, Node.js. Best developer on Fiverr & LinkedIn. 10+ successful projects delivered. Available for hire.",
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
    "full stack web developer",
    "javascript developer bangladesh",
    "typescript developer",
    "mongodb developer",
    "express js developer",
    "best web developer in bangladesh",
    "top rated developer fiverr",
    "expert developer linkedin",
    "professional developer bangladesh",
    "remote developer bangladesh",
  ],
  openGraph: {
    title: "Moshiur Rahman DEAP | Best Full Stack Developer in Bangladesh & Fiverr",
    description:
      "Hire Moshiur Rahman DEAP - Top-rated Full Stack Developer in Bangladesh. MERN Stack, Next.js, React.js, Node.js expert. 10+ projects delivered.",
    url: "https://moshiurrahman.online",
    type: "website",
    siteName: "Moshiur Rahman DEAP - Full Stack Developer",
    images: [
      {
        url: "https://moshiurrahman.online/opengraph-image",
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
      "Hire Moshiur Rahman DEAP - Top-rated Full Stack Developer in Bangladesh. MERN Stack, Next.js, React.js, Node.js expert.",
    images: ["https://moshiurrahman.online/twitter-image"],
    creator: "@moshiurrahman",
  },
  alternates: {
    canonical: "https://moshiurrahman.online",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://moshiurrahman.online/#profilepage",
            url: "https://moshiurrahman.online",
            name: "Moshiur Rahman DEAP - Full Stack Developer Portfolio",
            description:
              "Portfolio of Moshiur Rahman DEAP, the best full stack developer in Bangladesh. Specializes in MERN Stack, Next.js, React.js, Node.js.",
            mainEntity: {
              "@type": "Person",
              "@id": "https://moshiurrahman.online/#person",
              name: "Moshiur Rahman DEAP",
              alternateName: ["Moshiur Rahman", "Moshiur Rahman Developer"],
              jobTitle: "Full Stack Developer",
              description:
                "Best Full Stack Developer in Bangladesh. MERN Stack expert with 10+ successful projects.",
              url: "https://moshiurrahman.online",
              image: "https://moshiurrahman.online/opengraph-image",
              sameAs: [
                "https://www.linkedin.com/in/moshiur-rahman",
                "https://github.com/moshiur-rahman",
              ],
              knowsAbout: [
                "React.js",
                "Next.js",
                "Node.js",
                "MongoDB",
                "Express.js",
                "TypeScript",
                "Tailwind CSS",
                "Full Stack Development",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "Bangladesh",
              },
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            },
            hasPart: [
              {
                "@type": "CreativeWork",
                name: "BookShelf - Full Stack Web Application",
                description: "Modern full-stack web application for digital books",
                url: "https://moshiurrahman.online/projects/book-shelf",
              },
              {
                "@type": "CreativeWork",
                name: "BD BOOK - Social Media Platform",
                description: "AI-powered social media platform for Bangladesh",
                url: "https://moshiurrahman.online/projects/bd-book",
              },
              {
                "@type": "CreativeWork",
                name: "Career Crafter - AI Career Guidance",
                description: "AI-powered career guidance platform",
                url: "https://moshiurrahman.online/projects/career-crafter",
              },
            ],
          }),
        }}
      />
      <div className="flex flex-col flex-1 bg-background font-sans">
        <HeroBanner />
        <HighlightText />
        <WorkProcess />
        <WhyChooseMe />
        <TechStack />
        <Works />
        <Testimonials />
        <ContactCTA />
      </div>
    </>
  );
}
