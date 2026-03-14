"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockComplaints, type Complaint } from "@/lib/mockData";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";

const FILTERS = ["all", "pending", "in_progress", "resolved", "rejected"] as const;
const FILTER_LABELS: Record<string, string> = { all: "All", pending: "Pending", in_progress: "In Progress", resolved: "Resolved", rejected: "Rejected" };

function ComplaintDetail({ complaint, onBack }: { complaint: Complaint; onBack: () => void }) {
  const steps = ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved"];
  const statusOrder: Record<string, number> = { pending: 0, under_review: 1, assigned: 2, in_progress: 3, resolved: 4, rejected: 4 };
  const currentStep = statusOrder[complaint.status] ?? 0;

  return (
    <div className="page-enter">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }} onClick={onBack}>← Back to Complaints</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10, color: "var(--text3)", marginBottom: 4 }}>{complaint.id}</div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 18 }}>{complaint.title}</h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 40, textAlign: "center", padding: "16px 0", background: "var(--surface2)", borderRadius: 8, marginBottom: 12 }}>{complaint.thumb}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>📍 {complaint.location}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 12 }}>📁 {complaint.cat} · 🏢 {complaint.dept}</div>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{complaint.desc}</p>
          </div>
          <div className="card" style={{ border: "1px solid var(--purple)", background: "#1A1030" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
              <span>🤖</span>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--purple)" }}>AI Analysis</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>Detected Category</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{complaint.ai.cat}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>Confidence</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>{complaint.ai.conf}%</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>Severity Estimate</div>
              <PriorityBadge priority={complaint.priority} />
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 13, fontFamily: "var(--font-syne)", marginBottom: 16 }}>Status Timeline</h3>
            <div className="timeline">
              {steps.map((s, i) => (
                <div key={s} style={{ position: "relative", marginBottom: 16 }}>
                  <div className={`timeline-dot ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`} />
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{s}</div>
                  {i === 0 && <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{complaint.date}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 13, fontFamily: "var(--font-syne)", marginBottom: 12 }}>Authority Comments</h3>
            {complaint.updates.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--text2)" }}>No updates yet.</p>
            ) : (
              complaint.updates.map((u, i) => (
                <div key={i} style={{ background: "var(--surface2)", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{u.by}</span>
                    <span style={{ fontSize: 11, color: "var(--text2)" }}>{u.date}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text2)" }}>{u.comment}</p>
                </div>
              ))
            )}
            <div style={{ marginTop: 12 }}>
              <input className="input" placeholder="Add a comment or question..." style={{ marginBottom: 8 }} />
              <button className="btn btn-secondary btn-sm">Send Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplaintsContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(searchParams.get("id"));

  const selected = selectedId ? mockComplaints.find((c) => c.id === selectedId) : null;
  if (selected) return <ComplaintDetail complaint={selected} onBack={() => setSelectedId(null)} />;

  const filtered = activeFilter === "all" ? mockComplaints : mockComplaints.filter((c) => c.status === activeFilter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20 }}>My Complaints</h2>
        <a href="/citizen/report"><button className="btn btn-primary">+ New Report</button></a>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <div key={f} className={`filter-chip ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
            {FILTER_LABELS[f]}
          </div>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--text2)" }}>No complaints in this category</div>
      ) : (
        filtered.map((c) => (
          <div key={c.id} style={{ display: "flex", gap: 14, padding: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, marginBottom: 12, cursor: "pointer", transition: "all 0.15s" }} onClick={() => setSelectedId(c.id)}>
            <div style={{ width: 60, height: 60, borderRadius: 8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{c.thumb}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: 14, fontWeight: 600, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10, color: "var(--text3)" }}>{c.id}</span>
                <span>·</span><span>{c.cat}</span>
                <span>·</span><span>{c.dept}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <StatusBadge status={c.status} />
                <PriorityBadge priority={c.priority} />
                <span style={{ fontSize: 11, color: "var(--text2)" }}>{c.date}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function ComplaintsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div style={{ color: "var(--text2)" }}>Loading...</div>}>
        <ComplaintsContent />
      </Suspense>
    </DashboardLayout>
  );
}
