import { fetchBlogs, fetchBlogById } from "@/lib/blogs";
import BlogContent from "@/components/BlogContent";
import { notFound } from "next/navigation";

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

    return <BlogContent blog={blog} relatedBlogs={relatedBlogs} />;
  } catch {
    notFound();
  }
}
