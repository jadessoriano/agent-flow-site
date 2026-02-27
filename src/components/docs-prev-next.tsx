"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPrevNext } from "@/lib/docs-meta";

export function DocsPrevNext() {
  const pathname = usePathname();
  const { prev, next } = getPrevNext(pathname);

  if (!prev && !next) return null;

  return (
    <div className="mt-16 flex items-center justify-between border-t border-zinc-800 pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-200"
        >
          <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          <div>
            <p className="text-xs text-zinc-500">Previous</p>
            <p className="font-medium">{prev.label}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-right text-sm text-zinc-400 transition hover:text-zinc-200"
        >
          <div>
            <p className="text-xs text-zinc-500">Next</p>
            <p className="font-medium">{next.label}</p>
          </div>
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
