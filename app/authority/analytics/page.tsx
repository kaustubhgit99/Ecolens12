"use client";

import { useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockStaff } from "@/lib/mockData";
import {
  Chart, BarController, LineController, BarElement, LineElement, PointElement,
  CategoryScale, LinearScale, Filler, Tooltip, Legend,
} from "chart.js";

Chart.register(BarController, LineController, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

export default function AnalyticsPage() {
  const timeRef = useRef<HTMLCanvasElement>(null);
  const catRef  = useRef<HTMLCanvasElement>(null);
  const histRef = useRef<HTMLCanvasElement>(null);
  const charts  = useRef<Chart[]>([]);

  useEffect(() => {
    charts.current.forEach((c) => c.destroy());
    charts.current = [];

    if (timeRef.current) {
      charts.current.push(new Chart(timeRef.current, {
        type: "line",
        data: { labels: ["Jan 1","Jan 3","Jan 5","Jan 7","Jan 9","Jan 11","Jan 13"], datasets: [{ label: "Complaints", data: [8,12,7,15,9,11,13], borderColor: "#22C55E", backgroundColor: "rgba(34,197,94,.1)", tension: 0.4, fill: true, pointRadius: 3, pointBackgroundColor: "#22C55E" }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    if (catRef.current) {
      charts.current.push(new Chart(catRef.current, {
        type: "bar",
        data: { labels: ["Road","Garbage","Water","Lighting","Sewage","Noise"], datasets: [{ data: [28,19,14,11,8,5], backgroundColor: ["#3B82F6","#22C55E","#F59E0B","#8B5CF6","#EF4444","#14B8A6"], borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    if (histRef.current) {
      charts.current.push(new Chart(histRef.current, {
        type: "bar",
        data: { labels: ["<1d","1–2d","2–3d","3–5d","5–7d",">7d"], datasets: [{ label: "Complaints", data: [15,24,19,14,7,3], backgroundColor: "#3B82F6", borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    return () => charts.current.forEach((c) => c.destroy());
  }, []);

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>Department Analytics</h2>
        <div style={{ display: "flex", gap: 0, background: "var(--surface2)", borderRadius: 10, padding: 3 }}>
          {["Daily","Weekly","Monthly"].map((t, i) => (
            <button key={t} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: i === 0 ? "var(--green)" : "transparent", color: i === 0 ? "#0b1120" : "var(--text3)" }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total This Period", value: "82", color: "var(--text)" },
          { label: "Avg Resolution", value: "2.4d", color: "var(--text)" },
          { label: "SLA Compliance", value: "89%", color: "var(--green)" },
          { label: "Citizen Satisfaction", value: "4.3/5", color: "var(--text)" },
        ].map((s) => (
          <div key={s.label} className="card-sm">
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Complaints Over Time</h3>
          <div style={{ position: "relative", height: 200 }}><canvas ref={timeRef} /></div>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>By Category</h3>
          <div style={{ position: "relative", height: 200 }}><canvas ref={catRef} /></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Resolution Time Distribution</h3>
        <div style={{ position: "relative", height: 160 }}><canvas ref={histRef} /></div>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Staff Performance</h3>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>Staff Member</th><th>Assigned</th><th>Resolved</th><th>Avg Time</th><th>SLA %</th></tr></thead>
            <tbody>
              {mockStaff.map((s) => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>{s.assigned}</td>
                  <td>{s.resolved}</td>
                  <td>{s.avg}</td>
                  <td><span className={`badge ${parseInt(s.sla) >= 90 ? "badge-green" : "badge-amber"}`}>{s.sla}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
