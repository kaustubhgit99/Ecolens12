"use client";

import { useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockComplaints } from "@/lib/mockData";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import Link from "next/link";
import {
  Chart,
  DoughnutController,
  LineController,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(DoughnutController, LineController, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

export default function AuthorityDashboard() {
  const donutRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLCanvasElement>(null);
  const donutChart = useRef<Chart | null>(null);
  const lineChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (donutRef.current) {
      donutChart.current?.destroy();
      donutChart.current = new Chart(donutRef.current, {
        type: "doughnut",
        data: {
          labels: ["High", "Medium", "Low"],
          datasets: [{ data: [23, 38, 21], backgroundColor: ["#EF4444", "#F59E0B", "#3B82F6"], borderWidth: 0, hoverOffset: 4 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#8B9BB4", font: { size: 11 }, padding: 12 } } } },
      });
    }
    if (lineRef.current) {
      lineChart.current?.destroy();
      lineChart.current = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: ["Jan 1", "Jan 5", "Jan 9", "Jan 13"],
          datasets: [{ label: "Resolved", data: [4, 7, 5, 9], borderColor: "#22C55E", backgroundColor: "rgba(34,197,94,.1)", tension: 0.4, fill: true, pointRadius: 0 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } } } } },
      });
    }
    return () => { donutChart.current?.destroy(); lineChart.current?.destroy(); };
  }, []);

  const urgent = mockComplaints.filter((c) => c.priority === "high");

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 22, marginBottom: 4 }}>Public Works Department</h2>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Today&apos;s overview — Jan 14, 2025</p>
        </div>
        <Link href="/authority/queue"><button className="btn btn-primary">View Queue</button></Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Assigned", value: "82", sub: "This month", color: "var(--text)" },
          { label: "Resolved Today", value: "7", sub: "Target: 8", color: "var(--green)" },
          { label: "Avg Resolution", value: "2.4d", sub: "↓ 0.3 vs last month", color: "var(--text)" },
          { label: "SLA Breach", value: "3", sub: "Needs attention", color: "var(--red)" },
        ].map((s) => (
          <div key={s.label} className="card-sm">
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 14, marginBottom: 12 }}>Priority Distribution</h3>
          <div style={{ position: "relative", height: 200 }}><canvas ref={donutRef} /></div>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 14, marginBottom: 12 }}>Resolution Rate (30 days)</h3>
          <div style={{ position: "relative", height: 200 }}><canvas ref={lineRef} /></div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 14 }}>🔴 Today&apos;s Urgent Queue</h3>
          <Link href="/authority/queue"><button className="btn btn-ghost btn-sm">Full Queue →</button></Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>ID</th><th>Title</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {urgent.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11 }}>{c.id}</td>
                  <td style={{ maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 13 }}>{c.title}</td>
                  <td><PriorityBadge priority={c.priority} /></td>
                  <td><StatusBadge status={c.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link href={`/citizen/complaints?id=${c.id}`}><button className="btn btn-secondary btn-sm">View</button></Link>
                      <button className="btn btn-primary btn-sm">Resolve</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
