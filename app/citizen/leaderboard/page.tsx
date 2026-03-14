"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockLeaderboard } from "@/lib/mockData";

const TABS = ["Weekly", "Monthly", "All Time"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Weekly");

  const top3 = [mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]];
  const trophies = ["🥈", "🥇", "🥉"];

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>🏆 Leaderboard</h2>
        <div style={{ display: "flex", gap: 0, background: "var(--surface2)", borderRadius: 10, padding: 3 }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, border: "none", background: activeTab === t ? "var(--green)" : "transparent", color: activeTab === t ? "#0b1120" : "var(--text3)", transition: "all 0.15s" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {top3.map((u, i) => (
          <div key={u.rank} className="card" style={{ textAlign: "center", border: i === 1 ? "1px solid var(--gold)" : "1px solid var(--border)" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{trophies[i]}</div>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: u.color + "22", color: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, margin: "0 auto 8px" }}>{u.avatar}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{u.name}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>{u.coins}🪙</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{u.reports} reports · {u.resolved} resolved</div>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Rank</th><th>Citizen</th><th>Reports</th><th>Resolved</th><th>EcoCoins</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((u) => (
                <tr key={u.rank} style={{ background: u.isMe ? "var(--greenbg)" : "transparent" }}>
                  <td style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: u.rank === 1 ? "var(--gold)" : u.rank === 2 ? "#94A3B8" : u.rank === 3 ? "#CD7C40" : "var(--text3)" }}>
                    {u.rank <= 3 ? ["🥇", "🥈", "🥉"][u.rank - 1] : u.rank}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: u.color + "22", color: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{u.avatar}</div>
                      {u.name} {u.isMe && <span className="badge badge-green" style={{ fontSize: 9 }}>You</span>}
                    </div>
                  </td>
                  <td>{u.reports}</td>
                  <td>{u.resolved}</td>
                  <td style={{ color: "var(--gold)", fontWeight: 700 }}>{u.coins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: "var(--greenbg)", border: "1px solid var(--green3)", borderRadius: 10, padding: 12, marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <span>📍</span>
          <span style={{ fontSize: 13 }}>You are ranked <strong>#7</strong> · Earn <strong>495 more coins</strong> to reach top 3!</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
