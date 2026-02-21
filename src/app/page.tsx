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
    <section className="relative overflow-hidden pt-32 pb-20">
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
    title: "Visual Pipeline Editor",
    description:
      "Canvas-first design with React Flow. Drag and drop nodes, connect edges, and build complex workflows visually with real-time status during execution.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "6 Node Types",
    description:
      "AI Task, Shell Command, Git Operation, Parallel Execution, Approval Gate, and Sub-pipeline nodes cover every workflow pattern you need.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: <Play className="h-5 w-5" />,
    title: "Live Execution Engine",
    description:
      "Spawns Claude Code CLI and shell processes as children with real-time stdout/stderr streaming, per-node status tracking, and graceful cancellation.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Human-in-the-Loop",
    description:
      "Approval gates pause execution for human review at critical steps. Perfect for production deployments and sensitive operations.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "Cost Tracking",
    description:
      "Built-in cost monitoring per node, per pipeline, and across your team. Track AI token usage and optimize your spend over time.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Git-Native Storage",
    description:
      "Pipelines are JSON, agents are Markdown — all stored in .claude/ directory. Version control built-in, no external server needed.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Retry & Resume",
    description:
      "Per-node retry policies with configurable max attempts and delays. Resume failed pipelines from the exact point of failure.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team-Friendly",
    description:
      "Developers can use the visual app or Claude Code CLI directly — both work with the same files. Push pipelines via git for instant team sharing.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: <Undo2 className="h-5 w-5" />,
    title: "Undo / Redo",
    description:
      "Full edit history with Ctrl+Z / Ctrl+Shift+Z. Confidently experiment with pipeline designs knowing you can always step back.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Run History",
    description:
      "SQLite-backed run history stores every execution with detailed per-node logs, exit codes, timing, and cost breakdowns.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Real-Time Logs",
    description:
      "Live log viewer shows streaming output from each node as it executes. Monitor AI reasoning and shell output in real time.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Agent Management",
    description:
      "Browse, create, and edit Claude Code agents with a rich Markdown editor and live preview. Auto-discovers agents from your project.",
    color: "text-lime-400",
    bg: "bg-lime-500/10",
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
              <p className="text-sm leading-relaxed text-zinc-400">
                {f.description}
              </p>
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
    description: "Sends instructions to Claude Code CLI for AI-powered code generation, review, and refactoring.",
    example: "\"Review this PR for security issues and suggest fixes\"",
  },
  {
    icon: <Terminal className="h-5 w-5 text-cyan-400" />,
    name: "Shell Command",
    description: "Execute any bash command — run tests, build projects, deploy, lint, or any CLI operation.",
    example: "npm run test -- --coverage",
  },
  {
    icon: <GitBranch className="h-5 w-5 text-orange-400" />,
    name: "Git Operation",
    description: "Commit, push, branch, merge, and more. Automate your git workflow as part of the pipeline.",
    example: "git commit -m \"feat: auto-generated changes\"",
  },
  {
    icon: <LayoutGrid className="h-5 w-5 text-green-400" />,
    name: "Parallel",
    description: "Run multiple child branches simultaneously and wait for all to complete before continuing.",
    example: "Run linting, tests, and type-check in parallel",
  },
  {
    icon: <Pause className="h-5 w-5 text-amber-400" />,
    name: "Approval Gate",
    description: "Pause execution for human review. Critical for production deployments and sensitive operations.",
    example: "\"Review AI changes before merging to main\"",
  },
  {
    icon: <Layers className="h-5 w-5 text-violet-400" />,
    name: "Sub-pipeline",
    description: "Reference and execute another saved pipeline. Build composable, reusable workflow modules.",
    example: "Call \"deploy-staging\" pipeline as a step",
  },
];

function NodeTypes() {
  return (
    <section className="relative border-t border-zinc-800/50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            Node Types
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Six powerful building blocks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Combine these node types to build any workflow — from simple
            automation to complex multi-stage pipelines with human oversight.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nodeTypes.map((node) => (
            <div
              key={node.name}
              className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                  {node.icon}
                </div>
                <h3 className="text-lg font-semibold">{node.name}</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                {node.description}
              </p>
              <div className="rounded-lg bg-zinc-800/60 px-3.5 py-2.5">
                <code className="text-xs text-zinc-300">{node.example}</code>
              </div>
            </div>
          ))}
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

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <div
              key={s.action}
              className="flex flex-col items-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-4 py-5"
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
  softwareVersion: "0.1.0",
  license: "https://opensource.org/licenses/MIT",
  url: "https://agentflow.dev",
  downloadUrl: "https://agentflow.dev/download",
  screenshot: "https://agentflow.dev/og-image.png",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Features />
      <NodeTypes />
      <HowItWorks />
      <Architecture />
      <TechStack />
      <KeyboardShortcuts />
      <CTA />
      <Footer />
    </main>
  );
}
