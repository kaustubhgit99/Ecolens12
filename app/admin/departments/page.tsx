"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockDepartments, mockStaff } from "@/lib/mockData";

export default function DepartmentsPage() {
  const [selectedCode, setSelectedCode] = useState("PWD");
  const selected = mockDepartments.find((d) => d.code === selectedCode) ?? mockDepartments[0];

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>Department Performance</h2>
        <select
          className="input"
          style={{ width: 220 }}
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
        >
          {mockDepartments.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Assigned",  value: String(selected.assigned), color: "var(--text)" },
          { label: "Resolved",        value: String(selected.resolved), color: "var(--green)" },
          { label: "SLA Compliance",  value: selected.sla, color: parseInt(selected.sla) >= 85 ? "var(--green)" : "var(--amber)" },
          { label: "Avg Resolution",  value: selected.avg, color: "var(--text)" },
        ].map((s) => (
          <div key={s.label} className="card-sm">
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {selected.escalated > 0 && (
        <div className="alert alert-red">
          ⚠️ <strong>{selected.escalated} escalated complaints</strong> require immediate attention
        </div>
      )}
      {parseInt(selected.sla) < 85 && (
        <div className="alert alert-amber">
          📉 SLA compliance below 85% target — review workload distribution
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 16 }}>Staff Roster — {selected.name}</h3>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead><tr><th>Name</th><th>Assigned</th><th>Resolved</th><th>Avg</th><th>SLA</th></tr></thead>
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

        <div className="card">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 13, marginBottom: 16 }}>All Departments Overview</h3>
          {mockDepartments.map((d) => (
            <div
              key={d.code}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}
              onClick={() => setSelectedCode(d.code)}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: d.code === selectedCode ? "var(--green)" : "var(--text)" }}>{d.name}</div>
                <div style={{ fontSize: 11, color: "var(--text2)" }}>{d.assigned} assigned · {d.resolved} resolved</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: parseInt(d.sla) >= 85 ? "var(--green)" : "var(--amber)" }}>{d.sla}</div>
                <div style={{ fontSize: 11, color: "var(--text2)" }}>{d.avg} avg</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
