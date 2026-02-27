"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Workflow,
  Download,
  Settings,
  GitBranch,
  Layers,
  FileText,
  Play,
  Terminal,
  Keyboard,
  DollarSign,
  Github,
  ChevronRight,
  Menu,
  X,
  Home,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Search,
  Zap,
  Copy,
  Check,
  Link2,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { useState } from "react";
import { APP_VERSION } from "@/lib/docs-meta";

const navSections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Overview", icon: Home },
      { href: "/docs/quickstart", label: "Quickstart", icon: Zap },
      { href: "/docs/installation", label: "Installation", icon: Download },
      { href: "/docs/configuration", label: "Configuration", icon: Settings },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { href: "/docs/pipelines", label: "Pipelines", icon: Workflow },
      { href: "/docs/node-types", label: "Node Types", icon: Layers },
      { href: "/docs/agents", label: "Agents", icon: FileText },
    ],
  },
  {
    title: "Usage",
    items: [
      { href: "/docs/execution", label: "Execution & Runs", icon: Play },
      { href: "/docs/cost-tracking", label: "Cost Tracking", icon: DollarSign },
      { href: "/docs/keyboard-shortcuts", label: "Keyboard Shortcuts", icon: Keyboard },
      { href: "/docs/best-practices", label: "Best Practices", icon: Lightbulb },
      { href: "/docs/example-pipeline", label: "Example Pipeline", icon: BookOpen },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/docs/api-reference", label: "API Reference", icon: Terminal },
      { href: "/docs/faq", label: "FAQ", icon: HelpCircle },
      { href: "/docs/contributing", label: "Contributing", icon: Github },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-zinc-800 px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size="sm" />
          <span className="text-sm font-bold tracking-tight">AgentFlow</span>
        </Link>
        <span className="ml-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400">
          Docs
        </span>
        <span className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
          v{APP_VERSION}
        </span>
      </div>

      {/* Search trigger */}
      <div className="px-3 pt-3">
        <button
          onClick={() => {
            window.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
            );
          }}
          className="flex w-full items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-400"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Search docs...</span>
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? "bg-indigo-500/10 font-medium text-indigo-400"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800 px-5 py-4">
        <a
          href="https://github.com/jadessoriano/agent-flow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-zinc-500 transition hover:text-zinc-300"
        >
          <Github className="h-3.5 w-3.5" />
          View on GitHub
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 lg:hidden"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950 transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>
    </>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-8 flex items-center gap-1.5 text-sm text-zinc-500">
      <Link href="/docs" className="transition hover:text-zinc-300">
        Docs
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link href={item.href} className="transition hover:text-zinc-300">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function CodeBlock({
  children,
  title,
  language,
}: {
  children: string;
  title?: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800">
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">{title}</span>
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-xs text-zinc-600">{language}</span>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      )}
      {!title && (
        <div className="flex justify-end border-b border-zinc-800 bg-zinc-900/60 px-2 py-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto bg-zinc-950 p-4">
        <code className="text-sm leading-relaxed text-zinc-300">{children}</code>
      </pre>
    </div>
  );
}

export function AnchorHeading({
  level = 2,
  id,
  children,
}: {
  level?: 2 | 3;
  id: string;
  children: React.ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  const sizeClass = level === 2 ? "text-2xl font-bold" : "text-xl font-semibold";

  return (
    <Tag id={id} className={`group relative mt-12 ${sizeClass}`}>
      <a
        href={`#${id}`}
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100"
      >
        <Link2 className="h-4 w-4 text-zinc-500 hover:text-indigo-400" />
      </a>
      {children}
    </Tag>
  );
}

export function InfoBox({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-indigo-500/30 bg-indigo-500/5 text-indigo-300",
    warning: "border-amber-500/30 bg-amber-500/5 text-amber-300",
    tip: "border-green-500/30 bg-green-500/5 text-green-300",
  };

  const labels = { info: "Info", warning: "Warning", tip: "Tip" };

  return (
    <div className={`my-6 rounded-xl border-l-4 p-4 ${styles[type]}`}>
      <p className="mb-1 text-sm font-semibold">{title || labels[type]}</p>
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

export function PropTable({
  items,
}: {
  items: { name: string; type: string; required?: boolean; description: string }[];
}) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/60">
            <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Property</th>
            <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Type</th>
            <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-indigo-300">
                  {item.name}
                </code>
                {item.required && (
                  <span className="ml-1.5 text-xs text-red-400">*</span>
                )}
              </td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-400">{item.type}</code>
              </td>
              <td className="px-4 py-2.5 text-zinc-400">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
