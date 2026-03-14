"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockComplaints } from "@/lib/mockData";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import Link from "next/link";

export default function QueuePage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  let filtered = [...mockComplaints];
  if (statusFilter !== "all") filtered = filtered.filter((c) => c.status === statusFilter);
  if (priorityFilter !== "all") filtered = filtered.filter((c) => c.priority === priorityFilter);
  if (search) filtered = filtered.filter((c) => c.id.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>Complaint Queue</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="input" placeholder="Search ID or keyword..." style={{ width: 220 }} value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-secondary btn-sm">Export CSV</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600 }}>STATUS:</span>
        {["all", "pending", "in_progress", "resolved"].map((f) => (
          <div key={f} className={`filter-chip ${statusFilter === f ? "active" : ""}`} onClick={() => setStatusFilter(f)}>
            {{ all: "All", pending: "Pending", in_progress: "In Progress", resolved: "Resolved" }[f]}
          </div>
        ))}
        <span style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600, marginLeft: 8 }}>PRIORITY:</span>
        {["all", "high", "medium", "low"].map((f) => (
          <div key={f} className={`filter-chip ${priorityFilter === f ? "active" : ""}`} onClick={() => setPriorityFilter(f)}>
            {{ all: "All", high: "High", medium: "Medium", low: "Low" }[f]}
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>ID</th><th>Category</th><th>Location</th><th>Priority</th><th>Status</th><th>Submitted</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td><input type="checkbox" /></td>
                  <td style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11 }}>{c.id}</td>
                  <td style={{ fontSize: 12 }}>{c.cat}</td>
                  <td style={{ fontSize: 12, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.location}</td>
                  <td><PriorityBadge priority={c.priority} /></td>
                  <td><StatusBadge status={c.status} /></td>
                  <td style={{ fontSize: 11, color: "var(--text2)" }}>{c.date}</td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Link href={`/citizen/complaints?id=${c.id}`}><button className="btn btn-ghost btn-sm">View</button></Link>
                      {c.status !== "resolved" && <button className="btn btn-primary btn-sm">Resolve</button>}
                      {c.status === "pending" && <button className="btn btn-secondary btn-sm">Assign</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>Showing {filtered.length} of {mockComplaints.length} complaints</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm">← Prev</button>
            <span style={{ fontSize: 13, color: "var(--text2)", padding: "5px 10px" }}>Page 1 of 1</span>
            <button className="btn btn-ghost btn-sm">Next →</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
