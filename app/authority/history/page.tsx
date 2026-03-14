"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockComplaints } from "@/lib/mockData";
import Link from "next/link";

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const resolved = mockComplaints
    .filter((c) => c.status === "resolved" || c.status === "rejected")
    .filter((c) =>
      !search ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>Resolution History</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            placeholder="Search by ID or title..."
            style={{ width: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-secondary btn-sm">Export CSV</button>
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Resolved Date</th>
                <th>Resolved By</th>
                <th>Time Taken</th>
                <th>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {resolved.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11 }}>{c.id}</td>
                  <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12 }}>{c.title}</td>
                  <td style={{ fontSize: 12 }}>{c.cat}</td>
                  <td style={{ fontSize: 12 }}>{c.date}</td>
                  <td style={{ fontSize: 12 }}>Arun Patil</td>
                  <td style={{ fontSize: 12 }}>2.3 days</td>
                  <td style={{ color: "var(--gold)" }}>★★★★☆</td>
                  <td>
                    <Link href={`/citizen/complaints?id=${c.id}`}>
                      <button className="btn btn-ghost btn-sm">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--text2)" }}>
          Showing {resolved.length} resolved / rejected complaints
        </div>
      </div>
    </DashboardLayout>
  );
}
