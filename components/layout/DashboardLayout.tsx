"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import type { Role } from "@/lib/mockData";

const navConfig: Record<Role, { section: string; items: { id: string; icon: string; label: string; href: string }[] }[]> = {
  citizen: [
    {
      section: "Citizen",
      items: [
        { id: "dashboard",    icon: "📊", label: "Dashboard",      href: "/citizen/dashboard" },
        { id: "report",       icon: "📝", label: "Report Issue",   href: "/citizen/report" },
        { id: "complaints",   icon: "📋", label: "My Complaints",  href: "/citizen/complaints" },
        { id: "leaderboard",  icon: "🏆", label: "Leaderboard",    href: "/citizen/leaderboard" },
        { id: "coins",        icon: "🪙", label: "EcoWallet",      href: "/citizen/coins" },
      ],
    },
  ],
  authority: [
    {
      section: "Authority",
      items: [
        { id: "auth-dashboard", icon: "🏛️", label: "Dashboard",          href: "/authority/dashboard" },
        { id: "queue",          icon: "📥", label: "Complaint Queue",     href: "/authority/queue" },
        { id: "heatmap",        icon: "🗺️", label: "Heatmap",            href: "/authority/heatmap" },
        { id: "analytics",      icon: "📈", label: "Analytics",           href: "/authority/analytics" },
        { id: "history",        icon: "📁", label: "Resolution History",  href: "/authority/history" },
      ],
    },
  ],
  admin: [
    {
      section: "Admin",
      items: [
        { id: "city-metrics",  icon: "🏙️", label: "City Metrics",          href: "/admin/dashboard" },
        { id: "departments",   icon: "🏢", label: "Dept Performance",      href: "/admin/departments" },
        { id: "engagement",    icon: "👥", label: "Citizen Engagement",    href: "/admin/engagement" },
      ],
    },
  ],
};

const roleNames: Record<Role, string> = {
  citizen: "Priya Kumar",
  authority: "Rahul Sharma",
  admin: "Admin User",
};
const roleAvatars: Record<Role, string> = {
  citizen: "PK",
  authority: "RS",
  admin: "AU",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !role) return null;

  const sections = navConfig[role];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "16px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#22C55E,#16A34A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🌿</div>
          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
            Eco<span style={{ color: "var(--green)" }}>Lens</span>
          </span>
        </div>

        {/* Role badge */}
        <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ background: "var(--greenbg)", border: "1px solid var(--green3)", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, color: "var(--green)", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {role}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
          {sections.map((section) => (
            <div key={section.section} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 8px 8px" }}>
                {section.section}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, cursor: "pointer", marginBottom: 2, background: isActive ? "var(--greenbg)" : "transparent", color: isActive ? "var(--green)" : "var(--text2)", transition: "all 0.15s" }} className={`nav-item${isActive ? " active" : ""}`}>
                      <span style={{ width: 18, textAlign: "center", fontSize: 15 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)" }}>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, cursor: "pointer", width: "100%", background: "none", border: "none", color: "var(--text2)", fontSize: 13, fontWeight: 500 }}>
            <span style={{ width: 18, textAlign: "center", fontSize: 15 }}>🚪</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ height: 56, background: "var(--surface)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 24px", gap: 12, flexShrink: 0 }}>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {role === "citizen" && (
              <Link href="/citizen/coins" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: "var(--gold)", cursor: "pointer" }}>
                  🪙 285
                </div>
              </Link>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }}>{roleNames[role]}</span>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#8B5CF6,#6D28D9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", cursor: "pointer" }}>
                {roleAvatars[role]}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ maxWidth: 1200 }} className="page-enter">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
