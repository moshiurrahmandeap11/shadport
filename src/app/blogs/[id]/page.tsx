import { fetchBlogs, fetchBlogById } from "@/lib/blogs";
import BlogContent from "@/components/BlogContent";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Generate static params for all blogs at build time
export async function generateStaticParams() {
  try {
    const response = await fetchBlogs(1);
    return response.data.map((blog) => ({
      id: blog._id,
    }));
  } catch {
    return [];
  }
}

// Generate dynamic metadata for each blog
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await fetchBlogById(id);
    const blog = response.data;

    const title = `${blog.title} | Moshiur Rahman DEAP - Full Stack Developer Blog`;
    const description =
      blog.description ||
      `Read ${blog.title} by Moshiur Rahman DEAP, best full stack developer in Bangladesh. MERN Stack, React.js, Next.js insights and tutorials.`;
    const url = `https://moshiurrahman.online/blogs/${id}`;

    return {
      title,
      description,
      keywords: [
        "moshiur rahman",
        "moshiur rahman deap",
        "web development",
        "mern stack",
        "react js",
        "next js",
        "node js",
        "javascript",
        "typescript",
        "full stack developer",
        "best developer bangladesh",
        blog.title.toLowerCase(),
        "developer tutorial",
        "coding blog",
        "web development tutorial",
        "bangladesh developer blog",
      ],
      authors: [
        { name: blog.author },
        { name: "Moshiur Rahman DEAP" },
      ],
      creator: blog.author,
      publisher: "Moshiur Rahman DEAP",
      openGraph: {
        title,
        description,
        url,
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: [blog.author],
        siteName: "Moshiur Rahman DEAP - Full Stack Developer",
        images: [
          {
            url: blog.thumbnail.url,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@moshiurrahman",
        title,
        description,
        images: [blog.thumbnail.url],
        creator: "@moshiurrahman",
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: "Blog Post | Moshiur Rahman DEAP",
      description: "Read this blog post by Moshiur Rahman DEAP, best full stack developer in Bangladesh.",
    };
  }
}

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  try {
    const response = await fetchBlogById(id);
    const blog = response.data;

    // Fetch related blogs (other blogs excluding current one)
    const allBlogsResponse = await fetchBlogs(1);
    const relatedBlogs = allBlogsResponse.data
      .filter((b) => b._id !== id)
      .slice(0, 3);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `https://moshiurrahman.online/blogs/${id}#blogpost`,
      headline: blog.title,
      description: blog.description,
      image: {
        "@type": "ImageObject",
        url: blog.thumbnail.url,
        width: 1200,
        height: 630,
      },
      url: `https://moshiurrahman.online/blogs/${id}`,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt,
      author: {
        "@type": "Person",
        "@id": "https://moshiurrahman.online/#person",
        name: blog.author,
        url: "https://moshiurrahman.online",
      },
      publisher: {
        "@type": "Person",
        "@id": "https://moshiurrahman.online/#person",
        name: "Moshiur Rahman DEAP",
        url: "https://moshiurrahman.online",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://moshiurrahman.online/blogs/${id}`,
      },
      articleSection: "Web Development",
      inLanguage: "en-US",
      keywords: [
        "moshiur rahman",
        "moshiur rahman deap",
        "web development",
        "mern stack",
        "react js",
        "next js",
        "full stack developer",
        "bangladesh developer",
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogContent blog={blog} relatedBlogs={relatedBlogs} />
      </>
    );
  } catch {
    notFound();
  }
}
