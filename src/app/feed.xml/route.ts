import { fetchBlogs } from "@/lib/blogs";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moshiurrahman.online";

  let blogs: { _id: string; title: string; description: string; createdAt: string }[] = [];
  try {
    const response = await fetchBlogs(1);
    blogs = response.data;
  } catch {
    // Fallback to empty feed if API is unavailable
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Moshiur Rahman DEAP - Full Stack Developer Blog</title>
    <link>${siteUrl}</link>
    <description>Web development insights, MERN Stack tutorials, React.js tips, and Next.js guides from Moshiur Rahman DEAP - Best developer in Bangladesh.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/og_image.png</url>
      <title>Moshiur Rahman DEAP Blog</title>
      <link>${siteUrl}</link>
    </image>
    ${blogs
      .map(
        (blog) => `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${siteUrl}/blogs/${blog._id}</link>
      <guid>${siteUrl}/blogs/${blog._id}</guid>
      <description>${escapeXml(blog.description)}</description>
      <pubDate>${new Date(blog.createdAt).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
