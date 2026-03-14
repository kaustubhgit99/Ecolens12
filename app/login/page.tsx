"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import type { Role } from "@/lib/mockData";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = (role: Role) => {
    login(role);
    if (role === "citizen") router.push("/citizen/dashboard");
    else if (role === "authority") router.push("/authority/dashboard");
    else router.push("/admin/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="card" style={{ width: 400, maxWidth: "100%", padding: 36 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#22C55E,#16A34A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌿</div>
          <span style={{ fontFamily: "var(--font-syne)", fontSize: 24, fontWeight: 700, color: "var(--text)" }}>
            Eco<span style={{ color: "var(--green)" }}>Lens</span>
          </span>
        </div>
        <p style={{ textAlign: "center", color: "var(--text2)", fontSize: 13, marginBottom: 28 }}>
          Civic intelligence platform for Pune
        </p>

        {/* Form fields (visual only) */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Email</label>
          <input className="input" defaultValue="priya@pune.gov.in" readOnly style={{ opacity: 0.7 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Password</label>
          <input className="input" type="password" defaultValue="password" readOnly style={{ opacity: 0.7 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text2)", cursor: "pointer" }}>
            <input type="checkbox" defaultChecked /> Remember me
          </label>
          <span style={{ fontSize: 12, color: "var(--green)", cursor: "pointer" }}>Forgot password?</span>
        </div>

        <p style={{ fontSize: 11, color: "var(--text3)", marginBottom: 16, textAlign: "center", background: "var(--surface2)", borderRadius: 8, padding: "8px 12px" }}>
          🎭 Mock auth — choose your role to explore
        </p>

        <div style={{ display: "grid", gap: 8 }}>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 12 }} onClick={() => handleLogin("citizen")}>
            🌱 Sign in as Citizen
          </button>
          <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", padding: 12 }} onClick={() => handleLogin("authority")}>
            🏛️ Sign in as Authority
          </button>
          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: 12 }} onClick={() => handleLogin("admin")}>
            ⚡ Sign in as Admin
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text3)", marginTop: 20 }}>
          Don&apos;t have an account?{" "}
          <span style={{ color: "var(--green)", cursor: "pointer" }}>Register</span>
        </p>
      </div>
    </div>
  );
}
