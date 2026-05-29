import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import GlobeGL from "react-globe.gl";
import {
  recyclingData,
  getColor,
  type CountryRecycling,
} from "../data/recycling";
import { WasteTradeArcs, type GlobeArc } from "../data/wasteTrade";

interface GlobePoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  country: CountryRecycling;
}

const tooltipStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 80,
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(10,20,40,0.92)",
  border: "1px solid rgba(100,200,255,0.3)",
  borderRadius: 8,
  padding: "10px 18px",
  color: "#fff",
  fontSize: 14,
  pointerEvents: "none",
  textAlign: "center",
  backdropFilter: "blur(8px)",
  whiteSpace: "nowrap",
};

export default function Globe({
  onSelect,
}: {
  onSelect: (c: CountryRecycling | null) => void;
}) {
  const globeRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [hovered, setHovered] = useState<GlobePoint | null>(null);

  const points: GlobePoint[] = useMemo(
    () =>
      recyclingData.map((c) => ({
        lat: c.lat,
        lng: c.lng,
        size: 0.4 + (c.recyclingRate ? c.recyclingRate / 100 : 0) * 1.2,
        color: getColor(c.recyclingRate ? c.recyclingRate : 0),
        country: c,
      })),
    [],
  );

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
    globe.controls().enableDamping = true;
    globe.pointOfView({ altitude: 2.2 }, 0);
  }, []);

  const handlePointHover = useCallback((point: object | null) => {
    setHovered(point as GlobePoint | null);
    if (globeRef.current) globeRef.current.controls().autoRotate = !point;
  }, []);

  const handleClick = useCallback(
    (point: object | null) => {
      if (point) onSelect((point as GlobePoint).country);
    },
    [onSelect],
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <GlobeGL
        ref={globeRef}
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#4488ff"
        atmosphereAltitude={0.18}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.015}
        pointRadius={(d) => (d as GlobePoint).size * 0.35}
        pointColor={(d) =>
          hovered === d ? "#ffffff" : (d as GlobePoint).color
        }
        pointResolution={8}
        onPointHover={handlePointHover}
        onPointClick={handleClick}
        arcsData={WasteTradeArcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={(d) => (d as GlobeArc).color.slice(0, 7)}
        arcDashLength={0.4}
        arcDashGap={0.1}
        arcDashAnimateTime={2000}
        arcStroke={(d) =>
          Math.max(0.2, Math.min(1.2, ((d as GlobeArc).tonnes_k ?? 50) / 400))
        }
        arcAltitudeAutoScale={0.3}
      />

      {hovered && (
        <div style={tooltipStyle}>
          <strong
            style={{
              color: getColor(
                hovered.country.recyclingRate
                  ? hovered.country.recyclingRate
                  : 0,
              ),
              fontSize: 16,
            }}
          >
            {hovered.country.country}
          </strong>
          <div style={{ color: "#aac8ff", marginTop: 2 }}>
            Recycling rate:{" "}
            <strong style={{ color: "#fff" }}>
              {hovered.country.recyclingRate !== undefined
                ? `${hovered.country.recyclingRate}%`
                : "N/A"}
            </strong>
          </div>
          <div style={{ color: "#778899", fontSize: 12, marginTop: 2 }}>
            Click for details
          </div>
        </div>
      )}
    </div>
  );
}
