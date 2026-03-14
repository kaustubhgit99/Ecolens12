"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const HOTSPOTS = [
  { x: "20%", y: "30%", size: 60, color: "#EF4444", count: 14, label: "Shivajinagar" },
  { x: "45%", y: "20%", size: 44, color: "#F59E0B", count: 8,  label: "Baner" },
  { x: "65%", y: "45%", size: 52, color: "#EF4444", count: 11, label: "Hadapsar" },
  { x: "30%", y: "60%", size: 36, color: "#3B82F6", count: 5,  label: "Kothrud" },
  { x: "55%", y: "70%", size: 28, color: "#22C55E", count: 3,  label: "Wanowrie" },
  { x: "75%", y: "25%", size: 40, color: "#F59E0B", count: 7,  label: "Viman Nagar" },
  { x: "15%", y: "70%", size: 32, color: "#F59E0B", count: 6,  label: "Katraj" },
];

const LAYERS = ["All Issues", "Road Damage", "Garbage", "Sewage", "Lighting"];
const TIME_FILTERS = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

export default function HeatmapPage() {
  const [activeLayer, setActiveLayer] = useState("All Issues");
  const [timeFilter, setTimeFilter] = useState("Last 30 days");

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>Issue Heatmap</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <select className="input" style={{ width: 160 }} value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            {TIME_FILTERS.map((t) => <option key={t}>{t}</option>)}
          </select>
          <button className="btn btn-secondary btn-sm">Export PNG</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {LAYERS.map((l) => (
          <div key={l} className={`filter-chip ${activeLayer === l ? "active" : ""}`} onClick={() => setActiveLayer(l)}>{l}</div>
        ))}
      </div>

      {/* Map */}
      <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", position: "relative", height: 420, marginBottom: 16 }}>
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3 }} />

        {/* Hotspot bubbles */}
        {HOTSPOTS.map((h) => (
          <div key={h.label}>
            <div
              style={{ position: "absolute", left: h.x, top: h.y, width: h.size, height: h.size, borderRadius: "50%", background: h.color, opacity: 0.4, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transform: "translate(-50%,-50%)", transition: "opacity .2s" }}
              title={`${h.label}: ${h.count} issues`}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "white", opacity: 1 }}>{h.count}</span>
            </div>
            <div style={{ position: "absolute", left: `calc(${h.x} + ${h.size / 2 + 6}px)`, top: h.y, transform: "translateY(-50%)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, padding: "3px 7px", fontSize: 11, color: "var(--text2)", whiteSpace: "nowrap" }}>
              {h.label}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6, fontWeight: 600 }}>Issue Density</div>
          {[["High", 14, "#EF4444"], ["Medium", 8, "#F59E0B"], ["Low", 3, "#22C55E"]].map(([l, n, c]) => (
            <div key={String(l)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: String(c), opacity: 0.7 }} />
              <span style={{ fontSize: 11 }}>{l} ({n}+)</span>
            </div>
          ))}
        </div>

        {/* Active filter label */}
        <div style={{ position: "absolute", top: 12, left: 12, background: "var(--greenbg)", border: "1px solid var(--green3)", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "var(--green)", fontWeight: 600 }}>
          {activeLayer} · {timeFilter}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <div className="card-sm" style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 700, color: "var(--red)" }}>Shivajinagar</div>
          <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>Highest density area (14 issues)</div>
        </div>
        <div className="card-sm" style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 700, color: "var(--amber)" }}>Road Damage</div>
          <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>Most reported category</div>
        </div>
        <div className="card-sm" style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 700, color: "var(--green)" }}>54</div>
          <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>Total active issues on map</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
