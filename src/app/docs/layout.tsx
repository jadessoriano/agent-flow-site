"use client";

import { DocsNav } from "@/components/docs-layout";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <DocsNav />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
