import Link from "next/link";
import { ArrowLeft, Workflow } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <Logo />
      <h1 className="mt-6 text-6xl font-extrabold tracking-tight">404</h1>
      <p className="mt-3 text-lg text-zinc-400">
        This page doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-600"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}
