import { recyclingData } from "../data/recycling";

const tiers = [
  { label: "≥ 50%", color: "#00ff88", desc: "Excellent" },
  { label: "35–50%", color: "#88ff00", desc: "Good" },
  { label: "20–35%", color: "#ffee00", desc: "Moderate" },
  { label: "10–20%", color: "#ff8800", desc: "Low" },
  { label: "< 10%", color: "#ff3300", desc: "Critical" },
];

export default function Legend() {
  const avg = Math.round(recyclingData.reduce((s, c) => s + c.recyclingRate, 0) / recyclingData.length);
  const best = recyclingData.reduce((a, b) => (a.recyclingRate > b.recyclingRate ? a : b));
  const worst = recyclingData.reduce((a, b) => (a.recyclingRate < b.recyclingRate ? a : b));

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: 32,
        background: "rgba(5,15,30,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(100,200,255,0.12)",
        borderRadius: 12,
        padding: "16px 18px",
        color: "#fff",
        zIndex: 50,
        minWidth: 180,
      }}
    >
      <div style={{ fontSize: 10, color: "#556677", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
        Recycling Rate
      </div>
      {tiers.map((t) => (
        <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: "#aac8ff" }}>{t.label}</span>
          <span style={{ fontSize: 11, color: "#556677" }}>{t.desc}</span>
        </div>
      ))}

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 12, paddingTop: 12 }}>
        <div style={{ fontSize: 11, color: "#556677", marginBottom: 6 }}>Global stats ({recyclingData.length} countries)</div>
        <div style={{ fontSize: 12, color: "#aac8ff" }}>
          Avg: <strong style={{ color: "#fff" }}>{avg}%</strong>
        </div>
        <div style={{ fontSize: 12, color: "#aac8ff" }}>
          Best: <strong style={{ color: "#00ff88" }}>{best.country} ({best.recyclingRate}%)</strong>
        </div>
        <div style={{ fontSize: 12, color: "#aac8ff" }}>
          Lowest: <strong style={{ color: "#ff3300" }}>{worst.country} ({worst.recyclingRate}%)</strong>
        </div>
      </div>
    </div>
  );
}
