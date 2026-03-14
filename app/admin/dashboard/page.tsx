"use client";

import { useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Chart, BarController, LineController, PieController,
  BarElement, LineElement, ArcElement, PointElement,
  CategoryScale, LinearScale, Filler, Tooltip, Legend,
} from "chart.js";

Chart.register(BarController, LineController, PieController, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

export default function AdminDashboard() {
  const deptRef = useRef<HTMLCanvasElement>(null);
  const pieRef  = useRef<HTMLCanvasElement>(null);
  const momRef  = useRef<HTMLCanvasElement>(null);
  const chartsRef = useRef<Chart[]>([]);

  useEffect(() => {
    chartsRef.current.forEach((c) => c.destroy());
    chartsRef.current = [];

    if (deptRef.current) {
      chartsRef.current.push(new Chart(deptRef.current, {
        type: "bar",
        data: {
          labels: ["Public Works","Sanitation","Water","Electrical","Environment"],
          datasets: [
            { label: "Assigned", data: [82,64,45,38,29], backgroundColor: "rgba(59,130,246,.6)", borderRadius: 3 },
            { label: "Resolved", data: [61,58,43,33,22], backgroundColor: "rgba(34,197,94,.6)", borderRadius: 3 },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#8B9BB4", font: { size: 10 }, padding: 8 } } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 9 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    if (pieRef.current) {
      chartsRef.current.push(new Chart(pieRef.current, {
        type: "pie",
        data: { labels: ["Road","Garbage","Water","Lighting","Sewage","Noise","Other"], datasets: [{ data: [32,21,16,12,9,6,4], backgroundColor: ["#3B82F6","#22C55E","#14B8A6","#F59E0B","#8B5CF6","#EF4444","#6B7280"], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#8B9BB4", font: { size: 10 }, padding: 8 } } } },
      }));
    }
    if (momRef.current) {
      chartsRef.current.push(new Chart(momRef.current, {
        type: "line",
        data: {
          labels: ["Aug","Sep","Oct","Nov","Dec","Jan"],
          datasets: [
            { label: "Submitted", data: [180,204,238,215,267,311], borderColor: "#3B82F6", tension: 0.4, pointRadius: 0 },
            { label: "Resolved",  data: [142,178,201,198,234,268], borderColor: "#22C55E", tension: 0.4, pointRadius: 0 },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#8B9BB4", font: { size: 10 }, padding: 8 } } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    return () => chartsRef.current.forEach((c) => c.destroy());
  }, []);

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 22, marginBottom: 4 }}>Pune City Metrics</h2>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Executive overview — January 2025</p>
        </div>
        <button className="btn btn-secondary">Download Report</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Complaints", value: "1,284", color: "var(--text)" },
          { label: "Resolved",         value: "953",   color: "var(--green)" },
          { label: "In Progress",      value: "187",   color: "var(--blue)" },
          { label: "Pending",          value: "144",   color: "var(--amber)" },
          { label: "Avg Resolution",   value: "2.8d",  color: "var(--text)" },
        ].map((s) => (
          <div key={s.label} className="card-sm">
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Department Comparison</h3>
          <div style={{ position: "relative", height: 240 }}><canvas ref={deptRef} /></div>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Category Breakdown</h3>
          <div style={{ position: "relative", height: 240 }}><canvas ref={pieRef} /></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Month-over-Month Trend</h3>
        <div style={{ position: "relative", height: 180 }}><canvas ref={momRef} /></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <div className="card-sm">
          <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8 }}>Top Performing Dept</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 16, fontWeight: 700 }}>Water Supply</div>
          <div style={{ fontSize: 12, color: "var(--green)", marginTop: 4 }}>96% SLA compliance</div>
        </div>
        <div className="card-sm">
          <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8 }}>Needs Attention</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 16, fontWeight: 700, color: "var(--amber)" }}>Roads Dept</div>
          <div style={{ fontSize: 12, color: "var(--amber)", marginTop: 4 }}>72% SLA compliance</div>
        </div>
        <div className="card-sm">
          <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8 }}>Active Citizens</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 16, fontWeight: 700 }}>487</div>
          <div style={{ fontSize: 12, color: "var(--green)", marginTop: 4 }}>+64 this month</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
