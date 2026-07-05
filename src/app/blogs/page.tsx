import { fetchBlogs } from "@/lib/blogs";
import BlogsPageClient from "./BlogsPageClient";

export default async function BlogsPage() {
  const response = await fetchBlogs(1);

  return (
    <BlogsPageClient
      initialBlogs={response.data}
      totalPages={response.pagination.totalPages}
      totalItems={response.pagination.totalItems}
    />
  );
}
