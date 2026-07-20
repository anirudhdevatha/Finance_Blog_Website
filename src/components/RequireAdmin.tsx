// src/components/RequireAdmin.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isCurrentUserAdmin } from "../lib/reports";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">(
    "loading",
  );

  useEffect(() => {
    isCurrentUserAdmin().then((ok) => setStatus(ok ? "allowed" : "denied"));
  }, []);

  if (status === "loading") return <div>Checking access…</div>;
  if (status === "denied") return <Navigate to="/" replace />;
  return <>{children}</>;
}
