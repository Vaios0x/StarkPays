"use client";

import { Navbar } from "@/components/layout/Navbar";
import { AIGuardian } from "@/components/dashboard/AIGuardian";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <AIGuardian />
    </div>
  );
}
