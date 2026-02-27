import { Navbar } from "@/components/navbar";
import { APP_VERSION } from "@/lib/docs-meta";
import { Tag, Calendar, Plus, Bug, Zap, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Changelog",
  description: "Release notes and changelog for AgentFlow — what's new in every version.",
};

const releases = [
  {
    version: "0.2.0-beta.1",
    date: "February 2026",
    latest: true,
    changes: [
      {
        category: "Added",
        icon: Plus,
        color: "text-green-400",
        items: [
          "Loop node — iterate over lists with configurable separator, max iterations, and per-item variables ($LOOP_ITEM, $LOOP_INDEX, $LOOP_COUNT)",
          "Setup wizard for first-time project configuration",
          "Hint overlay for onboarding new users",
          "Experience modes — Simple mode for essentials, Advanced mode for full feature set",
          "Canvas compact/detailed view toggle — icon-only mode vs full node details",
          "Smart edge routing with central lane assignment to avoid node obstacles and edge crossings",
          "Hover focus — dims non-connected nodes and edges with smooth transitions",
          "8 starter templates: Code Review, Bug Fix, CI/CD, Ticket-to-PR, Release, Add a Feature, Generate API Docs, Refactor Module",
          "Pipeline validation — automatic pre-run checks for missing references, circular dependencies, and invalid configurations",
          "Output caching — skip re-execution of unchanged nodes to save time and tokens",
          "Node data passing — reference upstream output with {output.NODE_ID} syntax",
          "Desktop notifications for pipeline completion, approval gates, and failures",
          "Secret variables — masked in UI, excluded from logs, never written to JSON",
          "Per-node model selection — choose Opus, Sonnet, or Haiku per node",
          "Agent management — browse, create, and edit Claude Code agents with live Markdown preview",
          "In-app error log viewer with Session and Log File tabs",
          "Auto-updater with in-app update banner and signed builds",
          "One-click GitHub issue creation with pre-filled error context",
        ],
      },
      {
        category: "Performance",
        icon: Zap,
        color: "text-amber-400",
        items: [
          "Arc-wrapped read-only data in parallel/loop spawns — eliminates deep-clone overhead",
          "Partial JSON parsing in list_pipelines() for faster sidebar loading",
          "30-second cache on get_usage_stats() with run invalidation",
          "Loop-aware cost estimation — accounts for iteration multipliers",
          "Cached parent/child maps for hover highlights (O(1) lookup)",
          "Batched IPC log streaming (50ms flush) for smoother real-time output",
          "Dynamic import for marked library — smaller initial bundle",
          "In-memory layout cache eliminates localStorage re-parsing",
          "Memory-bounded stores: undo (30), history (10), logs (2000/node)",
          "Added idx_runs_status database index for faster queries",
        ],
      },
      {
        category: "Changed",
        icon: RefreshCw,
        color: "text-blue-400",
        items: [
          "8 node types (added Loop) — up from 7 in initial release",
          "Dark theme only — light theme removed for consistent experience",
          "Pointer cursor on all interactive elements",
          "Toast notifications replace browser alerts",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "November 2025",
    latest: false,
    changes: [
      {
        category: "Added",
        icon: Plus,
        color: "text-green-400",
        items: [
          "Initial release with visual pipeline editor",
          "7 node types: AI Task, Shell, Git, Parallel, Approval Gate, Sub-pipeline, Comment (Loop added in v0.2.0-beta.1)",
          "Real-time execution engine with live log streaming",
          "Cost tracking with per-node token cost monitoring and budget limits",
          "Retry policies with configurable max attempts and delays",
          "Resume failed pipelines from the exact point of failure",
          "Keyboard shortcuts for all canvas, editing, and execution actions",
          "Undo / Redo with up to 30 edit snapshots",
          "Human-in-the-loop approval gates",
          "Git-native storage — pipelines as JSON, agents as Markdown",
          "Cross-platform support (macOS, Windows, Linux)",
          "Run history with full cost breakdowns, exit codes, and timing",
          "Auto-layout (dagre) for automatic node positioning",
          "Pipeline JSON schema with variables and conditional edges",
        ],
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-xs text-zinc-500">
          Built with Tauri, React, and Rust. Open source under MIT license.
        </p>
      </div>
    </footer>
  );
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <div className="mb-2 flex items-center gap-2">
          <Tag className="h-4 w-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-400">Releases</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
        <p className="mt-4 text-lg text-zinc-400">
          New features, improvements, and fixes in every AgentFlow release.
        </p>

        {/* Timeline */}
        <div className="mt-14 space-y-12">
          {releases.map((release) => (
            <div key={release.version} className="relative">
              {/* Version header */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`rounded-lg px-3 py-1 text-sm font-bold ${
                    release.latest
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  v{release.version}
                </span>
                {release.latest && (
                  <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                    Latest
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {release.date}
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-5 pl-1">
                {release.changes.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div key={group.category}>
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${group.color}`} />
                        <h3 className="text-sm font-semibold text-zinc-300">
                          {group.category}
                        </h3>
                      </div>
                      <ul className="space-y-2 pl-6">
                        {group.items.map((item, i) => (
                          <li
                            key={i}
                            className="relative text-sm leading-relaxed text-zinc-400 before:absolute before:-left-4 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="mt-10 border-b border-zinc-800/50" />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
