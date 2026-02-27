export const APP_VERSION = "0.2.0-beta.1";

export const docsPages = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/quickstart", label: "Quickstart" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/configuration", label: "Configuration" },
  { href: "/docs/pipelines", label: "Pipelines" },
  { href: "/docs/node-types", label: "Node Types" },
  { href: "/docs/agents", label: "Agents" },
  { href: "/docs/execution", label: "Execution & Runs" },
  { href: "/docs/cost-tracking", label: "Cost Tracking" },
  { href: "/docs/keyboard-shortcuts", label: "Keyboard Shortcuts" },
  { href: "/docs/best-practices", label: "Best Practices" },
  { href: "/docs/example-pipeline", label: "Example Pipeline" },
  { href: "/docs/api-reference", label: "API Reference" },
  { href: "/docs/faq", label: "FAQ" },
  { href: "/docs/contributing", label: "Contributing" },
];

export function getPrevNext(pathname: string) {
  const idx = docsPages.findIndex((p) => p.href === pathname);
  return {
    prev: idx > 0 ? docsPages[idx - 1] : null,
    next: idx < docsPages.length - 1 ? docsPages[idx + 1] : null,
  };
}

export const searchIndex = [
  {
    href: "/docs",
    title: "Overview",
    keywords: ["documentation", "getting started", "introduction", "overview"],
  },
  {
    href: "/docs/quickstart",
    title: "Quickstart",
    keywords: ["quick start", "60 seconds", "first pipeline", "beginner", "tutorial"],
  },
  {
    href: "/docs/installation",
    title: "Installation",
    keywords: ["install", "setup", "build", "prerequisites", "rust", "tauri", "download"],
  },
  {
    href: "/docs/configuration",
    title: "Configuration",
    keywords: ["settings", "config", "CLI path", "project", "preferences", "setup wizard", "experience mode", "simple", "advanced"],
  },
  {
    href: "/docs/pipelines",
    title: "Pipelines",
    keywords: ["json", "schema", "dag", "nodes", "edges", "variables", "validation", "workflow"],
  },
  {
    href: "/docs/node-types",
    title: "Node Types",
    keywords: ["ai task", "shell", "git", "parallel", "loop", "approval", "sub-pipeline", "comment", "node"],
  },
  {
    href: "/docs/agents",
    title: "Agents",
    keywords: ["markdown", "agent", "claude code", "auto-discovery", "system prompt"],
  },
  {
    href: "/docs/execution",
    title: "Execution & Runs",
    keywords: ["run", "execute", "logs", "streaming", "resume", "history", "cancel", "retry", "loop"],
  },
  {
    href: "/docs/cost-tracking",
    title: "Cost Tracking",
    keywords: ["cost", "tokens", "budget", "spending", "analytics", "model", "pricing"],
  },
  {
    href: "/docs/keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    keywords: ["keyboard", "shortcut", "hotkey", "ctrl", "keybinding", "canvas"],
  },
  {
    href: "/docs/best-practices",
    title: "Best Practices",
    keywords: ["tips", "optimization", "patterns", "debugging", "performance"],
  },
  {
    href: "/docs/example-pipeline",
    title: "Example Pipeline",
    keywords: ["example", "ci/cd", "walkthrough", "tutorial", "demo", "sample"],
  },
  {
    href: "/docs/api-reference",
    title: "API Reference",
    keywords: ["api", "ipc", "commands", "events", "tauri", "types", "invoke"],
  },
  {
    href: "/docs/faq",
    title: "FAQ",
    keywords: ["faq", "questions", "license", "privacy", "troubleshoot", "help"],
  },
  {
    href: "/docs/contributing",
    title: "Contributing",
    keywords: ["contribute", "development", "pull request", "pr", "setup", "dev", "open source"],
  },
];
