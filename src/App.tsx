import { useState } from "react";
import Globe from "./components/Globe";
import Sidebar from "./components/Sidebar";
import { type CountryRecycling } from "./data/recycling";

export default function App() {
  const [selected, setSelected] = useState<CountryRecycling | null>(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#020c1b",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px 32px",
          background:
            "linear-gradient(to bottom, rgba(2,12,27,0.9) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: 0.5,
          }}
        >
          Recycling Monitor
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5577aa" }}>
          Recycling rates by country — click a point to explore
        </p>
      </div>

      <Globe onSelect={setSelected} />
      <Sidebar selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
