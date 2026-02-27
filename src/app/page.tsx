import Link from "next/link";
import {
  Workflow,
  Play,
  GitBranch,
  Shield,
  Layers,
  Terminal,
  DollarSign,
  Users,
  Undo2,
  Keyboard,
  Eye,
  RefreshCw,
  ArrowRight,
  Github,
  Monitor,
  Cpu,
  Database,
  Palette,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  Pause,
  LayoutGrid,
  FileText,
  Download,
  ChevronDown,
  MessageSquare,
  Repeat,
  Bell,
  Lock,
  Sparkles,
  FileSearch,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Navbar } from "@/components/navbar";

function HeroCanvas() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-4xl px-4">
      <div className="glow rounded-2xl border border-zinc-800 bg-zinc-925 p-1">
        <div className="canvas-grid relative overflow-hidden rounded-xl bg-zinc-900/80 p-8 md:p-12">
          {/* Pipeline visualization */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 200 100 C 280 100, 280 180, 360 180"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              className="edge-path"
              opacity="0.6"
            />
            <path
              d="M 200 100 C 280 100, 280 280, 360 280"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              className="edge-path"
              opacity="0.6"
            />
            <path
              d="M 520 180 C 590 180, 590 220, 660 220"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              className="edge-path"
              opacity="0.6"
            />
            <path
              d="M 520 280 C 590 280, 590 220, 660 220"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              className="edge-path"
              opacity="0.6"
            />
          </svg>

          <div className="relative flex flex-col items-center gap-8">
            {/* Row 1: Trigger */}
            <div className="animate-float">
              <PipelineNode
                icon={<Play className="h-4 w-4 text-green-400" />}
                label="Start Pipeline"
                status="success"
                glowClass="node-glow-green"
              />
            </div>

            {/* Row 2: Parallel branch */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-16">
              <div className="animate-float-delayed">
                <PipelineNode
                  icon={<Cpu className="h-4 w-4 text-indigo-400" />}
                  label="AI: Code Review"
                  status="success"
                  glowClass="node-glow-blue"
                />
              </div>
              <div className="animate-float-slow">
                <PipelineNode
                  icon={<Terminal className="h-4 w-4 text-cyan-400" />}
                  label="Shell: Run Tests"
                  status="running"
                  glowClass="node-glow-cyan"
                />
              </div>
            </div>

            {/* Row 3: Approval */}
            <div className="animate-float">
              <PipelineNode
                icon={<Shield className="h-4 w-4 text-amber-400" />}
                label="Approval Gate"
                status="pending"
                glowClass="node-glow-amber"
              />
            </div>

            {/* Row 4: Deploy */}
            <div className="animate-float-delayed">
              <PipelineNode
                icon={<GitBranch className="h-4 w-4 text-indigo-400" />}
                label="Git: Push & Deploy"
                status="pending"
                glowClass=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineNode({
  icon,
  label,
  status,
  glowClass,
}: {
  icon: React.ReactNode;
  label: string;
  status: "success" | "running" | "pending" | "failed";
  glowClass: string;
}) {
  const statusIcon = {
    success: <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />,
    running: <RefreshCw className="h-3.5 w-3.5 animate-spin text-cyan-400" />,
    pending: <Clock className="h-3.5 w-3.5 text-zinc-500" />,
    failed: <XCircle className="h-3.5 w-3.5 text-red-400" />,
  };

  return (
    <div
      className={`gradient-border flex items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3.5 ${glowClass}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
        {icon}
      </div>
      <span className="text-sm font-medium text-zinc-200">{label}</span>
      <div className="ml-2">{statusIcon[status]}</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          Built on Tauri + React + Rust
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Visual AI Agent
          <br />
          <span className="gradient-text">Pipeline Builder</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Build, orchestrate, and execute Claude Code agent pipelines with a
          drag-and-drop canvas. A desktop app for teams managing multi-step AI
          automation workflows.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-indigo-500"
          >
            Explore Features
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/jadessoriano/agent-flow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        <HeroCanvas />
      </div>

      {/* Scroll indicator */}
      <div className="mt-16 flex justify-center">
        <ChevronDown className="h-5 w-5 animate-bounce text-zinc-600" />
      </div>
    </section>
  );
}

const features = [
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Visual Pipeline Builder",
    description:
      "Canvas-first editor with React Flow. Drag and drop 8 node types — AI Task, Shell, Git, Parallel, Loop, Approval Gate, Sub-pipeline, and Comment — connect them with conditional edges, and scaffold fast with 8 starter templates.",
    highlights: ["Drag-and-drop canvas", "8 node types", "Loop iteration", "Starter templates"],
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: <Play className="h-5 w-5" />,
    title: "Execution & Monitoring",
    description:
      "Live execution engine that spawns Claude Code CLI and shell processes with real-time stdout/stderr streaming. Track every run with SQLite-backed history, retry failures automatically, and resume from the exact point of failure.",
    highlights: ["Real-time log streaming", "Retry & resume", "Run history", "Desktop notifications"],
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "Cost & AI Control",
    description:
      "Per-node cost tracking with budget limits that halt execution when exceeded. Choose the right Claude model for each node — Opus, Sonnet, or Haiku — and skip re-execution of unchanged nodes with output caching.",
    highlights: ["Budget limits", "Per-node model selection", "Output caching", "Data passing"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Safety & Governance",
    description:
      "Approval gates pause execution for human review at critical steps. Secret variables stay masked in the UI and excluded from logs. Pre-run validation catches circular dependencies and missing references before execution starts.",
    highlights: ["Human-in-the-loop", "Secret variables", "Pipeline validation", "Node data passing"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Agent Management",
    description:
      "Browse, create, and edit Claude Code agents with a rich Markdown editor and live preview. Auto-discovers agents from your project's .claude/agents/ directory for immediate use in pipelines.",
    highlights: ["Markdown editor", "Auto-discovery", "Live preview", "In-pipeline use"],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Git-Native & Team-Ready",
    description:
      "Pipelines are JSON, agents are Markdown — all stored in .claude/ for native version control. Developers can use the visual app or CLI interchangeably. Push pipelines via git for instant team sharing.",
    highlights: ["JSON + Markdown files", "No external server", "CLI interop", "Git sharing"],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to orchestrate AI agents
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            From visual pipeline design to cost-aware execution, AgentFlow gives
            your team full control over complex Claude Code workflows.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} ${f.color}`}
              >
                {f.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                {f.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {f.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-zinc-800/60 px-2.5 py-0.5 text-xs text-zinc-400"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const nodeTypes = [
  {
    icon: <Cpu className="h-5 w-5 text-indigo-400" />,
    name: "AI Task",
    description: "AI-powered code generation, review, and refactoring",
    example: "\"Review this PR for security issues and suggest fixes\"",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glowClass: "node-glow-blue",
    cost: "$0.42",
  },
  {
    icon: <Terminal className="h-5 w-5 text-cyan-400" />,
    name: "Shell Command",
    description: "Run tests, build projects, deploy, or any CLI operation",
    example: "npm run test -- --coverage",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glowClass: "node-glow-cyan",
  },
  {
    icon: <GitBranch className="h-5 w-5 text-orange-400" />,
    name: "Git Operation",
    description: "Commit, push, branch, merge — automate your git workflow",
    example: "git commit -m \"feat: auto-generated changes\"",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    glowClass: "node-glow-amber",
  },
  {
    icon: <LayoutGrid className="h-5 w-5 text-green-400" />,
    name: "Parallel",
    description: "Run branches simultaneously, wait for all to complete",
    example: "Run linting, tests, and type-check in parallel",
    color: "text-green-400",
    bg: "bg-green-500/10",
    glowClass: "node-glow-green",
  },
  {
    icon: <Repeat className="h-5 w-5 text-pink-400" />,
    name: "Loop",
    description: "Iterate over a list, running steps for each item",
    example: "Loop over [file1, file2, file3] and review each",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    glowClass: "node-glow-pink",
  },
  {
    icon: <Pause className="h-5 w-5 text-amber-400" />,
    name: "Approval Gate",
    description: "Pause for human review at critical pipeline steps",
    example: "\"Review AI changes before merging to main\"",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    glowClass: "node-glow-amber",
  },
  {
    icon: <Layers className="h-5 w-5 text-violet-400" />,
    name: "Sub-pipeline",
    description: "Execute another saved pipeline as a reusable module",
    example: "Call \"deploy-staging\" pipeline as a step",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glowClass: "node-glow-blue",
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-zinc-400" />,
    name: "Comment",
    description: "Annotate pipeline sections with notes and documentation",
    example: "\"This section handles the deployment logic\"",
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    glowClass: "",
  },
];

function NodeTypeCard({
  node,
}: {
  node: (typeof nodeTypes)[number];
}) {
  return (
    <div className="group relative">
      <div
        className={`gradient-border flex items-center gap-3.5 rounded-xl bg-zinc-900 px-5 py-3.5 transition-transform duration-200 hover:scale-[1.02] ${node.glowClass}`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800`}
        >
          {node.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-200">{node.name}</p>
          <p className="text-xs leading-snug text-zinc-500">
            {node.description}
          </p>
        </div>
        {node.cost && (
          <span className="shrink-0 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
            {node.cost}
          </span>
        )}
      </div>
      {/* Hover tooltip */}
      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded-lg bg-zinc-800 px-3.5 py-2 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
        <code className="block whitespace-nowrap text-xs text-zinc-300">
          {node.example}
        </code>
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-zinc-800" />
      </div>
    </div>
  );
}

{/* ── Down-pointing arrowhead triangle (independent of dash pattern) ── */}
function ArrowHead({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <polygon
      points={`${x - 5},${y - 8} ${x + 5},${y - 8} ${x},${y}`}
      fill={color}
      opacity="0.8"
    />
  );
}

{/* ── Desktop pipeline (lg+) ── */}
function NodeTypePipeline() {
  /*
   * Flexbox layout — all nodes fixed at w-[260px].
   * Animated dashed edges + polygon arrowheads (no SVG markers).
   *
   * Branch row: 2 nodes × 260px + 48px gap = 568px total.
   * SVG viewBox: left center = 130, right = 438, mid = 284.
   */
  const BW = 568;
  const LC = 130;
  const RC = 438;
  const MC = 284;

  return (
    <div className="hidden lg:block">
      <div className="flex flex-col items-center">
        {/* Row 0: AI Task */}
        <div className="w-[260px]">
          <NodeTypeCard node={nodeTypes[0]} />
        </div>

        {/* Split: AI Task → Shell (success) + Git (failure) */}
        <svg width={BW} height="52" viewBox={`0 0 ${BW} 52`} className="shrink-0">
          <path d={`M ${MC} 0 C ${MC} 26, ${LC} 26, ${LC} 44`} fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6" className="edge-path" />
          <ArrowHead x={LC} y={52} color="#22c55e" />
          <path d={`M ${MC} 0 C ${MC} 26, ${RC} 26, ${RC} 44`} fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6" className="edge-path" />
          <ArrowHead x={RC} y={52} color="#ef4444" />
        </svg>

        {/* Row 1: Shell Command + Git Operation */}
        <div className="flex gap-12" style={{ width: BW }}>
          <div className="w-[260px]">
            <NodeTypeCard node={nodeTypes[1]} />
          </div>
          <div className="w-[260px]">
            <NodeTypeCard node={nodeTypes[2]} />
          </div>
        </div>

        {/* Merge: Shell + Git → Parallel */}
        <svg width={BW} height="52" viewBox={`0 0 ${BW} 52`} className="shrink-0">
          <path d={`M ${LC} 0 C ${LC} 26, ${MC} 26, ${MC} 44`} fill="none" stroke="#71717a" strokeWidth="2" opacity="0.5" className="edge-path" />
          <path d={`M ${RC} 0 C ${RC} 26, ${MC} 26, ${MC} 44`} fill="none" stroke="#71717a" strokeWidth="2" opacity="0.5" className="edge-path" />
          <ArrowHead x={MC} y={52} color="#71717a" />
        </svg>

        {/* Row 2: Parallel — with Comment floating to the right */}
        <div className="relative">
          <div className="w-[260px]">
            <NodeTypeCard node={nodeTypes[3]} />
          </div>
          {/* Comment node — floating annotation, no connecting arrow */}
          <div className="absolute top-0 left-full ml-20 w-[260px]">
            <div className="group relative">
              <div className="flex items-center gap-3.5 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 px-5 py-3.5 transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                  {nodeTypes[7].icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-400">{nodeTypes[7].name}</p>
                  <p className="text-xs leading-snug text-zinc-600">{nodeTypes[7].description}</p>
                </div>
              </div>
              <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded-lg bg-zinc-800 px-3.5 py-2 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                <code className="block whitespace-nowrap text-xs text-zinc-300">{nodeTypes[7].example}</code>
                <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Parallel → Loop (then) */}
        <svg width="24" height="44" className="shrink-0">
          <line x1="12" y1="0" x2="12" y2="36" stroke="#71717a" strokeWidth="2" opacity="0.5" className="edge-path" />
          <ArrowHead x={12} y={44} color="#71717a" />
        </svg>

        {/* Row 3: Loop */}
        <div className="w-[260px]">
          <NodeTypeCard node={nodeTypes[4]} />
        </div>

        {/* Loop → Approval (then) */}
        <svg width="24" height="44" className="shrink-0">
          <line x1="12" y1="0" x2="12" y2="36" stroke="#71717a" strokeWidth="2" opacity="0.5" className="edge-path" />
          <ArrowHead x={12} y={44} color="#71717a" />
        </svg>

        {/* Row 4: Approval Gate */}
        <div className="w-[260px]">
          <NodeTypeCard node={nodeTypes[5]} />
        </div>

        {/* Approval → Sub-pipeline (success) */}
        <svg width="24" height="44" className="shrink-0">
          <line x1="12" y1="0" x2="12" y2="36" stroke="#22c55e" strokeWidth="2" opacity="0.6" className="edge-path" />
          <ArrowHead x={12} y={44} color="#22c55e" />
        </svg>

        {/* Row 5: Sub-pipeline */}
        <div className="w-[260px]">
          <NodeTypeCard node={nodeTypes[6]} />
        </div>
      </div>

      {/* Edge legend */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 rounded-full bg-zinc-500 opacity-60" />
          <span className="text-xs text-zinc-500">Then</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 rounded-full bg-green-500 opacity-60" />
          <span className="text-xs text-green-500/80">Success</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 rounded-full bg-red-500 opacity-60" />
          <span className="text-xs text-red-500/80">Failure</span>
        </div>
      </div>
    </div>
  );
}

{/* ── Mobile vertical flow (<lg) ── */}
function NodeTypeMobileFlow() {
  const mainNodes = nodeTypes.filter((_, i) => i !== 7);
  const commentNode = nodeTypes[7];

  /* Edge colors matching the desktop pipeline story */
  const mobileEdgeColors = [
    "#22c55e", /* AI Task → Shell: success */
    "#71717a", /* Shell → Git: then */
    "#71717a", /* Git → Parallel: then */
    "#71717a", /* Parallel → Loop: then */
    "#71717a", /* Loop → Approval: then */
    "#22c55e", /* Approval → Sub-pipeline: success */
  ];

  return (
    <div className="lg:hidden">
      <div className="flex flex-col items-center">
        {mainNodes.map((node, i) => (
          <div key={node.name} className="flex flex-col items-center">
            <NodeTypeCard node={node} />
            {i < mainNodes.length - 1 && (
              <svg width="24" height="32" className="my-1 shrink-0">
                <line x1="12" y1="0" x2="12" y2="24" stroke={mobileEdgeColors[i]} strokeWidth="2" opacity="0.6" className="edge-path" />
                <ArrowHead x={12} y={32} color={mobileEdgeColors[i]} />
              </svg>
            )}
          </div>
        ))}

        {/* Comment node — floating annotation */}
        <div className="mt-6">
          <div className="group relative">
            <div className="flex items-center gap-3.5 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 px-5 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                {commentNode.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-400">{commentNode.name}</p>
                <p className="text-xs leading-snug text-zinc-600">{commentNode.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edge legend (mobile) */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 rounded-full bg-zinc-500 opacity-60" />
          <span className="text-[10px] text-zinc-500">Then</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 rounded-full bg-green-500 opacity-60" />
          <span className="text-[10px] text-green-500/80">Success</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 rounded-full bg-red-500 opacity-60" />
          <span className="text-[10px] text-red-500/80">Failure</span>
        </div>
      </div>
    </div>
  );
}

function NodeTypes() {
  return (
    <section className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            Node Types
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Eight powerful building blocks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Combine these node types to build any workflow — from simple
            automation to complex multi-stage pipelines with loops, human oversight, and more.
          </p>
        </div>

        <div className="mt-16">
          <NodeTypePipeline />
          <NodeTypeMobileFlow />
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    step: "01",
    title: "Point to Your Project",
    description:
      "Open AgentFlow and select your git repository. It auto-detects existing Claude Code agents and pipelines in the .claude/ directory.",
    icon: <Monitor className="h-6 w-6 text-indigo-400" />,
  },
  {
    step: "02",
    title: "Design Your Pipeline",
    description:
      "Drag nodes onto the canvas, configure each step's instructions, and connect them with conditional edges for success/failure branching.",
    icon: <Workflow className="h-6 w-6 text-cyan-400" />,
  },
  {
    step: "03",
    title: "Execute & Monitor",
    description:
      "Hit Run and watch your pipeline execute in real-time. Stream live logs, track costs, and approve gates as they fire.",
    icon: <Play className="h-6 w-6 text-green-400" />,
  },
  {
    step: "04",
    title: "Review & Iterate",
    description:
      "Browse run history with full cost breakdowns. Resume failed runs, optimize your pipelines, and share via git push.",
    icon: <RefreshCw className="h-6 w-6 text-amber-400" />,
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-green-400 uppercase">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From project to production in four steps
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-8">
          {steps.map((s, i) => (
            <div key={s.step} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                  {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-gradient-to-b from-zinc-700 to-transparent" />
                )}
              </div>
              <div className="pb-8">
                <p className="mb-1 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                  Step {s.step}
                </p>
                <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section id="architecture" className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase">
            Architecture
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            How data flows through AgentFlow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            A type-safe pipeline from React UI to Rust backend to Claude Code
            CLI, with real-time event streaming back to the canvas.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
            <div className="space-y-0">
              {[
                {
                  label: "React UI",
                  detail: "Canvas, Panels, Zustand Stores",
                  color: "border-l-indigo-500",
                  arrow: "Zustand store updates & user actions",
                },
                {
                  label: "Tauri IPC Bridge",
                  detail: "invoke() commands & event listeners",
                  color: "border-l-cyan-500",
                  arrow: "Serialized command payloads",
                },
                {
                  label: "Rust Executor",
                  detail: "Tokio async runtime, SQLx queries",
                  color: "border-l-orange-500",
                  arrow: "Spawns child processes",
                },
                {
                  label: "Claude Code CLI + Shell",
                  detail: "AI inference, bash execution, git ops",
                  color: "border-l-green-500",
                  arrow: "Emits events with logs & status",
                },
                {
                  label: "SQLite Database",
                  detail: "Run history, cost tracking, settings",
                  color: "border-l-violet-500",
                  arrow: null,
                },
              ].map((layer, i) => (
                <div key={layer.label}>
                  <div
                    className={`flex items-center gap-4 border-l-4 ${layer.color} px-6 py-5`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{layer.label}</p>
                      <p className="text-sm text-zinc-400">{layer.detail}</p>
                    </div>
                  </div>
                  {layer.arrow && (
                    <div className="flex items-center gap-2 px-6 py-2">
                      <div className="h-px flex-1 bg-zinc-800" />
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {layer.arrow}
                      </span>
                      <div className="h-px flex-1 bg-zinc-800" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* File layout */}
        <div className="mx-auto mt-12 max-w-3xl">
          <h3 className="mb-4 text-center text-lg font-semibold text-zinc-300">
            Project File Layout
          </h3>
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-sm">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-zinc-500">your-project/</span>
            </div>
            <div className="space-y-1 px-6 py-4 text-zinc-400">
              <p>
                <span className="text-zinc-500">├── </span>
                <span className="text-amber-400">.claude/</span>
              </p>
              <p>
                <span className="text-zinc-500">│   ├── </span>
                <span className="text-cyan-400">agents/</span>
                <span className="ml-4 text-zinc-600">
                  &larr; Agent markdown files
                </span>
              </p>
              <p>
                <span className="text-zinc-500">│   │   ├── </span>
                <span className="text-zinc-300">code-reviewer.md</span>
              </p>
              <p>
                <span className="text-zinc-500">│   │   └── </span>
                <span className="text-zinc-300">test-runner.md</span>
              </p>
              <p>
                <span className="text-zinc-500">│   └── </span>
                <span className="text-indigo-400">pipelines/</span>
                <span className="ml-4 text-zinc-600">
                  &larr; Pipeline JSON files
                </span>
              </p>
              <p>
                <span className="text-zinc-500">│       └── </span>
                <span className="text-zinc-300">review-and-deploy.json</span>
              </p>
              <p>
                <span className="text-zinc-500">├── </span>
                <span className="text-zinc-300">src/</span>
              </p>
              <p>
                <span className="text-zinc-500">└── </span>
                <span className="text-zinc-300">.mcp.json</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const techStack = {
  frontend: [
    { name: "React 19", detail: "UI library with concurrent features" },
    { name: "TypeScript 5.9", detail: "End-to-end type safety" },
    { name: "Vite 7", detail: "Lightning-fast dev server & builds" },
    { name: "React Flow", detail: "Interactive node-based canvas" },
    { name: "Zustand", detail: "Lightweight state management" },
    { name: "Tailwind CSS 4", detail: "Utility-first styling" },
  ],
  backend: [
    { name: "Tauri v2", detail: "Lightweight desktop framework" },
    { name: "Rust", detail: "Memory-safe, high-performance backend" },
    { name: "Tokio", detail: "Async runtime for parallel execution" },
    { name: "SQLx + SQLite", detail: "Type-safe database queries" },
    { name: "Serde", detail: "Serialization / deserialization" },
    { name: "Notify", detail: "File system watching for live reload" },
  ],
};

function TechStack() {
  return (
    <section id="tech-stack" className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-violet-400 uppercase">
            Tech Stack
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Modern, type-safe, and performant
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            A carefully chosen stack that prioritizes developer experience,
            compile-time guarantees, and cross-platform reliability.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Frontend */}
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                <Palette className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold">Frontend</h3>
            </div>
            <div className="space-y-3">
              {techStack.frontend.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between rounded-lg bg-zinc-800/40 px-4 py-3"
                >
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-zinc-500">{t.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <Cpu className="h-5 w-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold">Backend</h3>
            </div>
            <div className="space-y-3">
              {techStack.backend.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between rounded-lg bg-zinc-800/40 px-4 py-3"
                >
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-zinc-500">{t.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyboardShortcuts() {
  const shortcuts = [
    { keys: ["Ctrl", "R"], action: "Run pipeline" },
    { keys: ["Ctrl", "S"], action: "Save pipeline" },
    { keys: ["Ctrl", "Z"], action: "Undo" },
    { keys: ["Ctrl", "Shift", "Z"], action: "Redo" },
    { keys: ["Space"], action: "Zoom to fit" },
    { keys: ["Esc"], action: "Close panel" },
    { keys: ["Ctrl", "E"], action: "Export JSON" },
    { keys: ["Del"], action: "Delete node" },
    { keys: ["Ctrl", "C"], action: "Copy node" },
    { keys: ["Ctrl", "V"], action: "Paste node" },
  ];

  return (
    <section className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-pink-400 uppercase">
            Keyboard-First
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for speed
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Every action has a keyboard shortcut. Stay in flow without reaching
            for the mouse.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
          {shortcuts.map((s) => (
            <div
              key={s.action}
              className="flex w-[calc(50%-6px)] flex-col items-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-4 py-5 sm:w-[calc(25%-9px)]"
            >
              <div className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <span key={i}>
                    <kbd className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
                      {k}
                    </kbd>
                    {i < s.keys.length - 1 && (
                      <span className="mx-0.5 text-xs text-zinc-600">+</span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-xs text-zinc-500">{s.action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhenToUse() {
  return (
    <section id="when-to-use" className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-emerald-400 uppercase">
            Guidance
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            When to use AgentFlow vs Claude CLI directly
          </h2>
        </div>

        <div className="group/guidance mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* AgentFlow — winner/loser hover */}
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 transition-all duration-300 group-hover/guidance:scale-95 group-hover/guidance:opacity-50 hover:!scale-[1.03] hover:!opacity-100 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/40">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                <Workflow className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold">Use AgentFlow</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              AgentFlow is designed for complex, multi-step workflows — pipelines
              with branching logic, parallel execution, approval gates, and retry
              policies. For these orchestration-heavy tasks, the visual builder,
              run history, and resume-from-failure capabilities save significant
              time compared to manually scripting the same flow.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                Multi-step CI/CD pipelines
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                Workflows needing human approval
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                Parallel tasks with retry logic
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                Repeatable automations you want to track and share
              </li>
            </ul>
          </div>

          {/* CLI — winner/loser hover */}
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 transition-all duration-300 group-hover/guidance:scale-95 group-hover/guidance:opacity-50 hover:!scale-[1.03] hover:!opacity-100 hover:shadow-lg hover:shadow-zinc-500/10 hover:border-zinc-600">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                <Terminal className="h-5 w-5 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold">Use Claude CLI directly</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              For simple, single-purpose tasks — quick bug fixes, one-off code
              generation, or exploratory questions — running Claude CLI directly
              is faster and more straightforward. Not every task needs a pipeline.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                Quick bug fixes
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                One-off code generation
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                Exploratory questions
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                Simple single-step tasks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative border-t border-zinc-800/50 py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to orchestrate your AI agents?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          AgentFlow is open source and free. Clone the repo, build the app, and
          start automating your Claude Code workflows today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/download"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-indigo-500"
          >
            <Download className="h-4 w-4" />
            Download for Free
          </a>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            <FileText className="h-4 w-4" />
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo size="sm" />
          <span className="text-sm font-semibold">AgentFlow</span>
        </div>
        <p className="text-xs text-zinc-500">
          Built with Tauri, React, and Rust. Open source under MIT license.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/jadessoriano/agent-flow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition hover:text-zinc-300"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AgentFlow",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  description:
    "Visual AI agent pipeline builder for Claude Code. Build, orchestrate, and execute multi-step AI workflows with a drag-and-drop canvas editor.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  softwareVersion: "0.2.0-beta.1",
  license: "https://opensource.org/licenses/MIT",
  url: "https://agentflow.dev",
  downloadUrl: "https://agentflow.dev/download",
  screenshot: "https://agentflow.dev/og-image.png",
};

function AnnouncementBar() {
  return (
    <div className="fixed top-0 z-50 w-full border-b border-indigo-500/10 bg-indigo-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:px-6">
        <Link
          href="/changelog"
          className="group flex items-center gap-2 text-xs text-indigo-300 transition hover:text-indigo-200 sm:text-sm"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span className="truncate">
            <strong className="font-semibold">AgentFlow v0.2.0-beta.1</strong>
            <span className="hidden sm:inline">
              {" "}&mdash; Loop node, setup wizard, experience modes, smart edge routing &amp; more
            </span>
            <span className="sm:hidden">
              {" "}&mdash; See what&apos;s new
            </span>
          </span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Navbar className="!top-9" />
      <Hero />
      <Features />
      <NodeTypes />
      <HowItWorks />
      <Architecture />
      <TechStack />
      <KeyboardShortcuts />
      <WhenToUse />
      <CTA />
      <Footer />
    </main>
  );
}
