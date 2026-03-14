"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CATEGORIES } from "@/lib/mockData";

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  if (submitted) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 520, textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 24, marginBottom: 8 }}>Report Submitted!</h2>
          <p style={{ color: "var(--text2)", marginBottom: 24 }}>Your complaint has been received and is being reviewed.</p>
          <div style={{ background: "var(--greenbg)", border: "1px solid var(--green3)", borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--font-jetbrains)", color: "var(--green)", fontSize: 14, marginBottom: 6 }}>ECO-2025-00049</div>
            <div style={{ color: "var(--text2)", fontSize: 13 }}>Reference ID — track your complaint anytime</div>
          </div>
          <div className="alert alert-green" style={{ justifyContent: "center" }}>🪙 You earned <strong style={{ marginLeft: 4 }}>+10 EcoCoins!</strong></div>
          <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
            <a href="/citizen/complaints"><button className="btn btn-primary">View My Complaints</button></a>
            <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setStep(1); setSelectedCat(""); }}>Report Another</button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 600 }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20, marginBottom: 4 }}>Report an Issue</h2>
        <p style={{ color: "var(--text2)", fontSize: 13, marginBottom: 24 }}>Help improve your city by reporting problems</p>

        {/* Step indicators */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
              <div className={`step-circle ${step > s ? "done" : step === s ? "active" : ""}`}>{s}</div>
              {i < 2 && <div className={`step-line ${step > s ? "done" : ""}`} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text2)", marginBottom: 24 }}>
          <span style={{ color: step === 1 ? "var(--green)" : "inherit" }}>Issue Details</span>
          <span style={{ color: step === 2 ? "var(--green)" : "inherit" }}>Evidence Upload</span>
          <span style={{ color: step === 3 ? "var(--green)" : "inherit" }}>Location</span>
        </div>

        {step === 1 && (
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 8 }}>Category *</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
                {CATEGORIES.map((c) => (
                  <div key={c.label} className={`cat-btn ${selectedCat === c.label ? "active" : ""}`} onClick={() => setSelectedCat(c.label)}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{c.emoji}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: selectedCat === c.label ? "var(--green)" : "var(--text2)" }}>{c.label}</div>
                  </div>
                ))}
              </div>
              {selectedCat && (
                <div className="alert alert-green">🤖 AI suggests: <strong style={{ marginLeft: 4 }}>{selectedCat}</strong> (94% confidence)</div>
              )}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Title *</label>
              <input className="input" placeholder="Brief description (max 100 chars)" maxLength={100} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Description</label>
              <textarea className="input" placeholder="Describe the issue in detail (max 500 chars)" maxLength={500} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
              <span style={{ fontSize: 11, color: "var(--text3)" }}>* Required fields</span>
              <button className="btn btn-primary" onClick={() => setStep(2)}>Next →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 8 }}>Upload Photos (max 5)</label>
              <div className="upload-zone" onClick={() => {}}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>Click or drag photos here</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>JPG, PNG, WEBP · Max 5MB each</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <div style={{ width: 60, height: 60, borderRadius: 8, background: "var(--surface3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🚗</div>
                <div style={{ width: 60, height: 60, borderRadius: 8, background: "var(--surface3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--text3)", border: "1px dashed var(--border2)" }}>+</div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 8 }}>Voice Memo (max 60s)</label>
              <div style={{ background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 10, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <button className="btn btn-secondary btn-sm">🎙 Record</button>
                <div style={{ flex: 1, background: "var(--border)", height: 2, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "var(--text2)" }}>0:00 / 1:00</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 8 }}>Pin your location</label>
              <div className="map-placeholder" style={{ height: 280, marginBottom: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="map-grid" />
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(34,197,94,.1)", border: "2px solid rgba(34,197,94,.3)", zIndex: 1, marginBottom: 8 }} />
                <div className="map-pin-bounce" style={{ fontSize: 32, position: "relative", zIndex: 1, marginTop: -28 }}>📍</div>
                <div style={{ position: "absolute", bottom: 12, fontSize: 12, color: "var(--text2)", background: "var(--surface)", borderRadius: 8, padding: "4px 10px", zIndex: 2 }}>
                  MG Road, Koregaon Park, Pune
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginBottom: 12 }} onClick={() => setLocationDetected(true)}>
                {locationDetected ? "✅ Location detected: MG Road, Pune" : "📍 Auto-detect location"}
              </button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Or enter address manually</label>
              <input className="input" defaultValue="MG Road, Koregaon Park, Pune" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setSubmitted(true)}>🚀 Submit Report</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
