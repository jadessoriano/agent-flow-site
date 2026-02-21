import Link from "next/link";
import {
  Download,
  Settings,
  Workflow,
  Layers,
  FileText,
  Play,
  Terminal,
  Keyboard,
  DollarSign,
  ArrowRight,
  Lightbulb,
  BookOpen,
  HelpCircle,
} from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    items: [
      {
        href: "/docs/installation",
        icon: Download,
        label: "Installation",
        desc: "Prerequisites, build steps, and platform setup",
      },
      {
        href: "/docs/configuration",
        icon: Settings,
        label: "Configuration",
        desc: "App settings, CLI detection, and project setup",
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        href: "/docs/pipelines",
        icon: Workflow,
        label: "Pipelines",
        desc: "JSON schema, variables, edges, and validation",
      },
      {
        href: "/docs/node-types",
        icon: Layers,
        label: "Node Types",
        desc: "AI Task, Shell, Git, Parallel, Approval, Sub-pipeline",
      },
      {
        href: "/docs/agents",
        icon: FileText,
        label: "Agents",
        desc: "Markdown format, auto-discovery, and management",
      },
    ],
  },
  {
    title: "Usage",
    items: [
      {
        href: "/docs/execution",
        icon: Play,
        label: "Execution & Runs",
        desc: "Running pipelines, streaming logs, resume, and history",
      },
      {
        href: "/docs/cost-tracking",
        icon: DollarSign,
        label: "Cost Tracking",
        desc: "Token cost monitoring, analytics, and dashboards",
      },
      {
        href: "/docs/keyboard-shortcuts",
        icon: Keyboard,
        label: "Keyboard Shortcuts",
        desc: "Every shortcut for canvas, editing, and execution",
      },
      {
        href: "/docs/best-practices",
        icon: Lightbulb,
        label: "Best Practices",
        desc: "Tips for effective usage, cost optimization, and debugging",
      },
      {
        href: "/docs/example-pipeline",
        icon: BookOpen,
        label: "Example Pipeline",
        desc: "Full CI/CD example using all six node types with walkthrough",
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        href: "/docs/api-reference",
        icon: Terminal,
        label: "API Reference",
        desc: "All Tauri IPC commands, events, and data types",
      },
      {
        href: "/docs/faq",
        icon: HelpCircle,
        label: "FAQ",
        desc: "Licensing, data privacy, costs, and common questions",
      },
    ],
  },
];

export const metadata = {
  title: "Documentation",
  description: "Complete documentation for AgentFlow — installation, configuration, pipelines, agents, and API reference.",
};

export default function DocsOverview() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-400">
        Everything you need to install, configure, and use AgentFlow — the
        visual AI agent pipeline builder for Claude Code.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/docs/installation"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/docs/pipelines"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600"
        >
          Core Concepts
        </Link>
      </div>

      <div className="mt-14 space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              {section.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/70"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                      <Icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-200 group-hover:text-white">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
