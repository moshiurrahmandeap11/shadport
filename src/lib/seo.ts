import { Metadata } from "next";

interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Generate consistent metadata for all pages.
 */
export function createMetadata(config: SeoConfig): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moshiurrahman.online";
  const fullUrl = config.url ? `${siteUrl}${config.url}` : siteUrl;
  const ogImage = config.image || `${siteUrl}/og_image.png`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: config.authors?.map((name) => ({ name })),
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      type: config.type || "website",
      siteName: "Moshiur Rahman DEAP - Full Stack Developer",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@moshiurrahman",
      title: config.title,
      description: config.description,
      images: [ogImage],
      creator: "@moshiurrahman",
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema.
 */
export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage JSON-LD schema.
 */
export function createFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
