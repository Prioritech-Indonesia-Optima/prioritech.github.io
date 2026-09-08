import { ImageResponse } from "next/og"

export const alt = "Prioritech Indonesia Optima — AI & Engineering"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#2d2c2c",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(218,165,32,0.4), transparent 55%), radial-gradient(circle at 80% 80%, rgba(218,165,32,0.18), transparent 50%)",
          color: "#d9d9d9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#daa520",
              boxShadow: "0 0 24px #daa520",
            }}
          />
          <div
            style={{
              fontSize: 28,
              letterSpacing: 4,
              color: "#daa520",
              textTransform: "uppercase",
            }}
          >
            Prioritech
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, color: "#d9d9d9" }}>
            Progress. Precision.
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, color: "#daa520" }}>
            Prioritech.
          </div>
          <div style={{ fontSize: 30, color: "#a0a0a0", marginTop: 12, maxWidth: 960 }}>
            Indonesian AI & engineering. Production systems for intelligence, automation, and defense.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, color: "#a0a0a0" }}>$ prioritech.co.id</div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {["AI", "Cyber", "Quant", "Robotics", "Product"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  border: "1px solid rgba(218,165,32,0.4)",
                  borderRadius: 999,
                  fontSize: 18,
                  color: "#daa520",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
