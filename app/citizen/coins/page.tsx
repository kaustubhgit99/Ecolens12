"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockCoinTransactions } from "@/lib/mockData";

const EARNING_RULES = [
  ["Submit a complaint", "+10 🪙"],
  ["Complaint resolved", "+20 🪙"],
  ["Complaint verified", "+5 🪙"],
  ["Weekly streak (7 days)", "+15 🪙"],
  ["First report of new issue", "+25 🪙"],
];

export default function CoinsPage() {
  const tierProgress = Math.round(((285 - 101) / (301 - 101)) * 100);

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>🪙 EcoWallet</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Balance card */}
        <div className="card" style={{ background: "linear-gradient(135deg,#1C2D20,#0D2818)", borderColor: "var(--green3)" }}>
          <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8 }}>Current Balance</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: 48, fontWeight: 700, color: "var(--gold)" }}>285</div>
          <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>EcoCoins</div>
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 8 }}>
              <span style={{ color: "var(--text2)" }}>🥉 Bronze</span>
              <span style={{ color: "var(--gold)" }}>🥈 Silver</span>
              <span style={{ color: "var(--text2)" }}>🥇 Gold</span>
            </div>
            <div className="progress" style={{ marginBottom: 6 }}>
              <div className="progress-fill" style={{ width: `${tierProgress}%` }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--text2)", textAlign: "center" }}>{tierProgress}% to Gold · 16 coins remaining</div>
          </div>
        </div>

        {/* Earning rules */}
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 14, marginBottom: 16 }}>Earning Rules</h3>
          {EARNING_RULES.map(([event, coins]) => (
            <div key={event} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }}>{event}</span>
              <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}>{coins}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 14 }}>Transaction History</h3>
          <span style={{ fontSize: 11, color: "var(--text2)" }}>All time</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>Date</th><th>Event</th><th>Amount</th><th>Balance</th></tr>
            </thead>
            <tbody>
              {mockCoinTransactions.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 11 }}>{t.date}</td>
                  <td style={{ fontSize: 12 }}>{t.event}</td>
                  <td><span style={{ color: "var(--green)", fontWeight: 700 }}>+{t.amount}</span></td>
                  <td style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11 }}>{t.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redemption */}
      <div className="card" style={{ background: "var(--surface2)", borderStyle: "dashed", textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 14, marginBottom: 4 }}>Reward Redemption</h3>
        <p style={{ color: "var(--text2)", fontSize: 13, marginBottom: 16 }}>Exchange your EcoCoins for discounts, certificates, and city rewards.</p>
        <button className="btn btn-secondary" disabled>Coming Soon</button>
      </div>
    </DashboardLayout>
  );
}
