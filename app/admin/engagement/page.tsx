"use client";

import { useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockLeaderboard } from "@/lib/mockData";
import {
  Chart, BarController, LineController, BarElement, LineElement,
  PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend,
} from "chart.js";

Chart.register(BarController, LineController, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

export default function EngagementPage() {
  const regRef = useRef<HTMLCanvasElement>(null);
  const repRef = useRef<HTMLCanvasElement>(null);
  const chartsRef = useRef<Chart[]>([]);

  useEffect(() => {
    chartsRef.current.forEach((c) => c.destroy());
    chartsRef.current = [];

    if (regRef.current) {
      chartsRef.current.push(new Chart(regRef.current, {
        type: "line",
        data: { labels: ["Aug","Sep","Oct","Nov","Dec","Jan"], datasets: [{ label: "Registrations", data: [38,52,61,48,74,64], borderColor: "#8B5CF6", backgroundColor: "rgba(139,92,246,.1)", tension: 0.4, fill: true, pointRadius: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    if (repRef.current) {
      chartsRef.current.push(new Chart(repRef.current, {
        type: "bar",
        data: { labels: ["W1","W2","W3","W4"], datasets: [{ label: "Reports", data: [68,82,71,90], backgroundColor: "rgba(34,197,94,.6)", borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#8B9BB4", font: { size: 10 } } }, y: { ticks: { color: "#8B9BB4", font: { size: 10 } }, beginAtZero: true } } },
      }));
    }
    return () => chartsRef.current.forEach((c) => c.destroy());
  }, []);

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>Citizen Engagement</h2>
        <select className="input" style={{ width: 160 }}>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>All time</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Citizens",    value: "487",   sub: "+64 this month", color: "var(--text)" },
          { label: "Active Reporters",  value: "203",   sub: "Submitted ≥1 report", color: "var(--text)" },
          { label: "Coins Issued",      value: "48.2K", sub: "", color: "var(--gold)" },
          { label: "Coins Redeemed",    value: "12.4K", sub: "26% redemption", color: "var(--text)" },
        ].map((s) => (
          <div key={s.label} className="card-sm">
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            {s.sub && <div style={{ fontSize: 11, color: "var(--green)", marginTop: 4 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>New Registrations</h3>
          <div style={{ position: "relative", height: 200 }}><canvas ref={regRef} /></div>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 12 }}>Reports Submitted Per Week</h3>
          <div style={{ position: "relative", height: 200 }}><canvas ref={repRef} /></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 16 }}>Top Contributing Citizens</h3>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>Rank</th><th>Name</th><th>District</th><th>Reports</th><th>Resolved</th><th>EcoCoins</th></tr></thead>
            <tbody>
              {mockLeaderboard.slice(0, 5).map((u) => (
                <tr key={u.rank}>
                  <td style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: u.rank === 1 ? "var(--gold)" : u.rank === 2 ? "#94A3B8" : u.rank === 3 ? "#CD7C40" : "var(--text3)" }}>
                    {u.rank <= 3 ? ["🥇","🥈","🥉"][u.rank - 1] : u.rank}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: u.color + "22", color: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{u.avatar}</div>
                      {u.name}
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text2)" }}>Koregaon Park</td>
                  <td>{u.reports}</td>
                  <td>{u.resolved}</td>
                  <td style={{ color: "var(--gold)", fontWeight: 700 }}>{u.coins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 16 }}>EcoCoin Circulation by Tier</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { label: "Bronze Tier", count: "284 citizens", pct: 58, color: "#CD7C40" },
            { label: "Silver Tier", count: "156 citizens", pct: 32, color: "#94A3B8" },
            { label: "Gold Tier",   count: "47 citizens",  pct: 10, color: "#F59E0B" },
          ].map((t) => (
            <div key={t.label} style={{ background: "var(--surface2)", borderRadius: 14, padding: "16px 20px", border: "1px solid var(--border2)" }}>
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 700, color: t.color }}>{t.count}</div>
              <div className="progress" style={{ marginTop: 10 }}>
                <div className="progress-fill" style={{ width: `${t.pct}%`, background: t.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
