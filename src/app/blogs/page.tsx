import { Metadata } from "next";
import { fetchBlogs } from "@/lib/blogs";
import BlogsPageClient from "./BlogsPageClient";

export const metadata: Metadata = {
  title: "Blogs | Moshiur Rahman DEAP - Full Stack Developer Insights & Tutorials",
  description:
    "Read Moshiur Rahman DEAP's blog for web development insights, MERN Stack tutorials, React.js tips, Next.js guides, and full stack development best practices. Best developer in Bangladesh sharing knowledge.",
  keywords: [
    "moshiur rahman blog",
    "moshiur rahman deap blog",
    "web development blog",
    "mern stack tutorials",
    "react js blog",
    "next js tutorials",
    "node js guides",
    "full stack development tips",
    "javascript tutorials",
    "typescript guides",
    "mongodb tutorials",
    "web developer blog bangladesh",
    "developer insights",
    "coding tutorials",
    "software engineering blog",
    "best developer blog bangladesh",
    "full stack developer tutorials",
  ],
  openGraph: {
    title: "Blogs | Moshiur Rahman DEAP - Full Stack Developer Insights",
    description:
      "Web development insights, MERN Stack tutorials, React.js tips, and Next.js guides from Moshiur Rahman DEAP - Best developer in Bangladesh.",
    url: "https://moshiurrahman.online/blogs",
    type: "website",
    siteName: "Moshiur Rahman DEAP - Full Stack Developer",
    images: [
      {
        url: "https://moshiurrahman.online/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Moshiur Rahman DEAP Blog - Web Development Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@moshiurrahman",
    title: "Blogs | Moshiur Rahman DEAP - Full Stack Developer Insights",
    description:
      "Web development insights, MERN Stack tutorials, React.js tips from Moshiur Rahman DEAP.",
    images: ["https://moshiurrahman.online/twitter-image"],
    creator: "@moshiurrahman",
  },
  alternates: {
    canonical: "https://moshiurrahman.online/blogs",
  },
};

export default async function BlogsPage() {
  const response = await fetchBlogs(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://moshiurrahman.online/blogs#blog",
            url: "https://moshiurrahman.online/blogs",
            name: "Moshiur Rahman DEAP Blog",
            description:
              "Web development insights, MERN Stack tutorials, React.js tips, and Next.js guides from Moshiur Rahman DEAP.",
            publisher: {
              "@type": "Person",
              "@id": "https://moshiurrahman.online/#person",
              name: "Moshiur Rahman DEAP",
            },
            author: {
              "@type": "Person",
              "@id": "https://moshiurrahman.online/#person",
              name: "Moshiur Rahman DEAP",
            },
            blogPost: response.data.map((blog) => ({
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.description,
              url: `https://moshiurrahman.online/blogs/${blog._id}`,
              image: blog.thumbnail.url,
              datePublished: blog.createdAt,
              dateModified: blog.updatedAt,
              author: {
                "@type": "Person",
                name: blog.author,
              },
            })),
          }),
        }}
      />
      <BlogsPageClient
        initialBlogs={response.data}
        totalPages={response.pagination.totalPages}
        totalItems={response.pagination.totalItems}
      />
    </>
  );
}
