"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && role) {
      if (role === "citizen") router.replace("/citizen/dashboard");
      else if (role === "authority") router.replace("/authority/dashboard");
      else router.replace("/admin/dashboard");
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated, role, router]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)" }}>
      <span style={{ fontSize: 32 }}>🌿</span>
    </div>
  );
}
