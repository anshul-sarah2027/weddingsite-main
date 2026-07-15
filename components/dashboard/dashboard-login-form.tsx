"use client";

import { loginDashboard } from "@/actions/dashboard-auth";
import { PasswordGateForm } from "@/components/auth/password-gate-form";

export function DashboardLoginForm() {
  return (
    <PasswordGateForm
      onLogin={loginDashboard}
      submitLabel="Enter dashboard"
      pendingLabel="Opening…"
      placeholder="Enter dashboard password"
      inputId="dashboard-password"
    />
  );
}
