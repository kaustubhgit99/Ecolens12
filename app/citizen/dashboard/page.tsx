"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { mockComplaints, mockLeaderboard } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/Badges";

export default function CitizenDashboard() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 22, marginBottom: 4 }}>Welcome back, Priya 👋</h2>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Here&apos;s your city activity summary</p>
        </div>
        <Link href="/citizen/report"><button className="btn btn-primary">+ Report Issue</button></Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Reports", value: "18", sub: "+3 this month", color: "var(--text)" },
          { label: "Resolved", value: "14", sub: "78% resolution rate", color: "var(--green)" },
          { label: "In Progress", value: "2", sub: "Avg 3.2 days", color: "var(--blue)" },
          { label: "EcoCoins", value: "285", sub: "Silver tier 🥈", color: "var(--gold)" },
        ].map((s) => (
          <div key={s.label} className="card-sm">
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Recent Complaints */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontFamily: "var(--font-syne)" }}>Recent Complaints</h3>
            <Link href="/citizen/complaints"><button className="btn btn-ghost btn-sm">View all →</button></Link>
          </div>
          {mockComplaints.slice(0, 3).map((c) => (
            <Link key={c.id} href={`/citizen/complaints?id=${c.id}`} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.thumb}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: 13, fontWeight: 600, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10, color: "var(--text3)" }}>{c.id}</span>
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coins + Leaderboard */}
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontFamily: "var(--font-syne)" }}>🪙 EcoCoin Balance</h3>
              <Link href="/citizen/coins"><button className="btn btn-ghost btn-sm">Wallet →</button></Link>
            </div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 32, fontWeight: 700, color: "var(--gold)", marginBottom: 8 }}>285</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8 }}>Silver Tier · 16 coins to Gold</div>
            <div className="progress" style={{ marginBottom: 8 }}><div className="progress-fill" style={{ width: "61%" }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)" }}>
              <span>Silver 101</span><span>Gold 301</span>
            </div>
          </div>

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontFamily: "var(--font-syne)" }}>🏆 Leaderboard</h3>
              <Link href="/citizen/leaderboard"><button className="btn btn-ghost btn-sm">Full →</button></Link>
            </div>
            {mockLeaderboard.slice(0, 5).map((u) => (
              <div key={u.rank} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, width: 18, textAlign: "center", color: "var(--text3)" }}>{u.rank}</span>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: u.color + "22", color: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{u.avatar}</div>
                <span style={{ fontSize: 13, flex: 1 }}>{u.name}{u.isMe ? " (you)" : ""}</span>
                <span style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700 }}>{u.coins}🪙</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* City health */}
      <div className="card">
        <h3 style={{ fontSize: 14, fontFamily: "var(--font-syne)", marginBottom: 16 }}>🏙️ City Health Snapshot</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>Overall Resolved Rate</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 20, fontWeight: 700, color: "var(--green)" }}>74%</div>
            <div className="progress" style={{ marginTop: 8 }}><div className="progress-fill" style={{ width: "74%" }} /></div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>Avg Resolution Time</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 20, fontWeight: 700 }}>2.8 days</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>↓ 0.4 days vs last month</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>Trending Issue</div>
            <div style={{ fontSize: 20 }}>🚗</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Road Damage (34%)</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
