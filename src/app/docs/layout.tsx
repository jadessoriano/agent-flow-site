"use client";

import { DocsNav } from "@/components/docs-layout";
import { TableOfContents } from "@/components/table-of-contents";
import { DocsPrevNext } from "@/components/docs-prev-next";
import { SearchModal } from "@/components/search-modal";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <DocsNav />
      <SearchModal />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-10">
            <div className="max-w-3xl">
              {children}
              <DocsPrevNext />
            </div>
            <div className="hidden xl:block">
              <TableOfContents />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
