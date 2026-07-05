import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            MR
          </div>
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Moshiur Rahman DEAP
        </div>
        <div
          style={{
            fontSize: "36px",
            color: "#a0a0a0",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          Full Stack Developer | MERN Stack Expert | Best Developer in Bangladesh & Fiverr
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "12px 24px",
              borderRadius: "30px",
              color: "white",
              fontSize: "24px",
            }}
          >
            React.js
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "12px 24px",
              borderRadius: "30px",
              color: "white",
              fontSize: "24px",
            }}
          >
            Next.js
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "12px 24px",
              borderRadius: "30px",
              color: "white",
              fontSize: "24px",
            }}
          >
            Node.js
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "12px 24px",
              borderRadius: "30px",
              color: "white",
              fontSize: "24px",
            }}
          >
            MongoDB
          </span>
        </div>
        <div
          style={{
            marginTop: "40px",
            fontSize: "24px",
            color: "#667eea",
            fontWeight: "bold",
          }}
        >
          moshiurrahman.online
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
