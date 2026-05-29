import {
  type CountryRecycling,
  getColor,
  recyclingData,
} from "../data/recycling";

interface Props {
  selected: CountryRecycling | null;
  onClose: () => void;
}

function Bar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          fontSize: 12,
          color: "#aac8ff",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#fff" }}>{value}%</span>
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: 4,
          height: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: color,
            borderRadius: 4,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

function Rank({ country }: { country: CountryRecycling }) {
  const sorted = [...recyclingData].sort(
    (a, b) => b.recyclingRate - a.recyclingRate,
  );
  const rank = sorted.findIndex((c) => c.code === country.code) + 1;
  return (
    <span style={{ color: "#aac8ff", fontSize: 13 }}>
      Ranked <strong style={{ color: "#fff" }}>#{rank}</strong> of{" "}
      {sorted.length} countries
    </span>
  );
}

export default function Sidebar({ selected, onClose }: Props) {
  if (!selected) return null;

  const color = getColor(selected.recyclingRate);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 320,
        height: "100vh",
        background: "rgba(5,15,30,0.92)",
        backdropFilter: "blur(16px)",
        borderLeft: "1px solid rgba(100,200,255,0.15)",
        padding: "28px 24px",
        color: "#fff",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        overflowY: "auto",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "none",
          border: "none",
          color: "#778899",
          cursor: "pointer",
          fontSize: 20,
          lineHeight: 1,
          padding: 4,
        }}
      >
        ✕
      </button>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            color: "#556677",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          Country Detail
        </div>
        <h2 style={{ margin: 0, fontSize: 22, color: "#fff" }}>
          {selected.country}
        </h2>
        <div style={{ marginTop: 4 }}>
          <Rank country={selected} />
        </div>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${color}44`,
          borderRadius: 12,
          padding: "18px 20px",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#778899",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Overall Recycling Rate
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color,
            lineHeight: 1.1,
            margin: "8px 0 2px",
          }}
        >
          {selected.recyclingRate}%
        </div>
        <div style={{ fontSize: 13, color: "#aac8ff" }}>
          {selected.totalTonnes.toLocaleString()}k tonnes/year
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            color: "#556677",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          By Material
        </div>
        <Bar label="Plastic" value={selected.plasticRate} color="#4488ff" />
        <Bar
          label="Paper & Cardboard"
          value={selected.paperRate}
          color="#88ccff"
        />
        <Bar label="Glass" value={selected.glassRate} color="#44ffcc" />
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(100,200,255,0.08)",
          borderRadius: 8,
          padding: "14px 14px",
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#556677",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Data Source
        </div>
        <a
          href={selected.sourceUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 12,
            color: "#4499ff",
            lineHeight: 1.5,
            textDecoration: "none",
            wordBreak: "break-word",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {selected.source} ↗
        </a>
        <div style={{ fontSize: 11, color: "#445566" }}>
          Reference year:{" "}
          <strong style={{ color: "#667788" }}>{selected.year}</strong>
        </div>
        {selected.sourceNote && (
          <div
            style={{
              fontSize: 11,
              color: "#556677",
              lineHeight: 1.6,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: 8,
              marginTop: 2,
            }}
          >
            {selected.sourceNote}
          </div>
        )}
      </div>
    </div>
  );
}
