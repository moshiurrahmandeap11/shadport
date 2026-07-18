import { ImageResponse } from "next/og";
import { fetchBlogById } from "@/lib/blogs";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let title = "Blog Post";
  let author = "Moshiur Rahman DEAP";

  try {
    const response = await fetchBlogById(id);
    title = response.data.title;
    author = response.data.author;
  } catch {
    // Fallback to default
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>M</span>
          </div>
          <span style={{ color: "#f97316", fontSize: "20px", fontWeight: "600" }}>
            Moshiur Rahman DEAP
          </span>
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "900",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "30px",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span style={{ color: "#9ca3af", fontSize: "20px" }}>By {author}</span>
          <span style={{ color: "#4b5563" }}>|</span>
          <span style={{ color: "#f97316", fontSize: "18px", fontWeight: "500" }}>
            Full Stack Developer Blog
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "20px",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "16px" }}>MERN Stack</span>
          <span style={{ color: "#6b7280", fontSize: "16px" }}>Next.js</span>
          <span style={{ color: "#6b7280", fontSize: "16px" }}>React.js</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
