import {
  Download,
  Monitor,
  Apple,
  Github,
  ArrowRight,
  ChevronDown,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "Download AgentFlow - Visual AI Agent Pipeline Builder",
  description:
    "Download AgentFlow for Windows, macOS, or Linux. Build and orchestrate Claude Code agent pipelines with a visual flow editor.",
};

const GITHUB_REPO = "https://github.com/jadessoriano/agent-flow";
const LATEST_VERSION = "0.1.0";
const RELEASE_BASE = `${GITHUB_REPO}/releases/download/v${LATEST_VERSION}`;

const platforms = [
  {
    os: "Windows",
    icon: <Monitor className="h-8 w-8" />,
    description: "Windows 10 / 11 (64-bit)",
    builds: [
      {
        label: "MSI Installer",
        file: `AgentFlow_${LATEST_VERSION}_x64_en-US.msi`,
        href: `${RELEASE_BASE}/AgentFlow_${LATEST_VERSION}_x64_en-US.msi`,
      },
      {
        label: "EXE Installer",
        file: `AgentFlow_${LATEST_VERSION}_x64-setup.exe`,
        href: `${RELEASE_BASE}/AgentFlow_${LATEST_VERSION}_x64-setup.exe`,
      },
    ],
    instructions: "Download and run the installer. No additional dependencies required.",
    color: "border-sky-500/30 bg-sky-500/5",
    iconColor: "text-sky-400",
  },
  {
    os: "macOS",
    icon: <Apple className="h-8 w-8" />,
    description: "macOS 11+ (Apple Silicon)",
    builds: [
      {
        label: "DMG (Apple Silicon)",
        file: `AgentFlow_${LATEST_VERSION}_aarch64.dmg`,
        href: `${RELEASE_BASE}/AgentFlow_${LATEST_VERSION}_aarch64.dmg`,
      },
    ],
    instructions:
      "Open the .dmg and drag AgentFlow to Applications. On first launch, right-click and select Open to bypass Gatekeeper.",
    color: "border-zinc-500/30 bg-zinc-500/5",
    iconColor: "text-zinc-300",
  },
  {
    os: "Linux",
    icon: <Terminal className="h-8 w-8" />,
    description: "Ubuntu 22.04+, Fedora 38+, Arch",
    builds: [
      {
        label: "Debian (.deb)",
        file: `agent-flow_${LATEST_VERSION}_amd64.deb`,
        href: `${RELEASE_BASE}/agent-flow_${LATEST_VERSION}_amd64.deb`,
      },
      {
        label: "AppImage",
        file: `agent-flow_${LATEST_VERSION}_amd64.AppImage`,
        href: `${RELEASE_BASE}/agent-flow_${LATEST_VERSION}_amd64.AppImage`,
      },
    ],
    instructions:
      "Install the .deb via dpkg or use the AppImage directly. Requires webkit2gtk 4.1.",
    color: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-400",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-bold tracking-tight text-white">AgentFlow</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
              Home
            </Link>
            <Link href="/docs" className="text-sm text-zinc-400 transition hover:text-white">
              Docs
            </Link>
            <a
              href="https://github.com/jadessoriano/agent-flow/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <Github className="h-4 w-4" />
              Releases
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400">
            <Download className="h-3.5 w-3.5 text-indigo-400" />
            v0.1.0 — Pre-release
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Download <span className="gradient-text">AgentFlow</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Available for Windows, macOS, and Linux. Free and open source.
            Downloads are served from{" "}
            <a
              href="https://github.com/jadessoriano/agent-flow/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
            >
              GitHub Releases
            </a>.
          </p>
        </div>
      </section>

      {/* Platform cards */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="space-y-8">
          {platforms.map((p) => (
            <div
              key={p.os}
              className={`rounded-2xl border ${p.color} p-6 md:p-8`}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                {/* Left: OS info */}
                <div className="flex shrink-0 items-center gap-4">
                  <div className={p.iconColor}>{p.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{p.os}</h2>
                    <p className="text-sm text-zinc-400">{p.description}</p>
                  </div>
                </div>

                {/* Right: Downloads */}
                <div className="flex-1 space-y-3">
                  {p.builds.map((build) => (
                    <a
                      key={build.label}
                      href={build.href}
                      className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-3.5 transition hover:border-zinc-700 hover:bg-zinc-900"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="h-4 w-4 text-indigo-400" />
                        <span className="text-sm font-medium text-zinc-200">
                          {build.label}
                        </span>
                      </div>
                      <code className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                        {build.file}
                      </code>
                    </a>
                  ))}
                  <p className="mt-3 text-xs text-zinc-500">
                    {p.instructions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Looking for older versions or other builds?{" "}
          <a
            href={`${GITHUB_REPO}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
          >
            View all releases on GitHub
          </a>
        </p>

        {/* Build from source */}
        <div className="mt-12 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold">Build from Source</h2>
          <p className="mb-6 text-sm text-zinc-400">
            If you prefer to build AgentFlow yourself, or need a platform not
            listed above:
          </p>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="border-b border-zinc-800 px-4 py-2">
                <span className="text-xs text-zinc-500">Terminal</span>
              </div>
              <pre className="p-4 text-sm text-zinc-300">
                <code>{`git clone https://github.com/jadessoriano/agent-flow.git
cd agent-flow
npm install
npm run tauri build`}</code>
              </pre>
            </div>

            <p className="text-sm text-zinc-400">
              Requires Rust 1.77.2+, Node.js 16+, and{" "}
              <Link
                href="/docs/installation#system-deps"
                className="text-indigo-400 underline"
              >
                platform-specific dependencies
              </Link>
              . See the{" "}
              <Link href="/docs/installation" className="text-indigo-400 underline">
                Installation Guide
              </Link>{" "}
              for full details.
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold">Requirements</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Claude Code CLI",
                desc: "Required at runtime for AI task execution",
                install: "npm i -g @anthropic-ai/claude-code",
              },
              {
                label: "Git",
                desc: "Required for project detection and git nodes",
                install: "Pre-installed on most systems",
              },
              {
                label: "Anthropic API Key",
                desc: "Configured in Claude Code CLI",
                install: "claude config set api_key",
              },
            ].map((req) => (
              <div
                key={req.label}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5"
              >
                <h3 className="font-semibold text-zinc-200">{req.label}</h3>
                <p className="mt-1 text-sm text-zinc-400">{req.desc}</p>
                <code className="mt-3 block rounded bg-zinc-800/60 px-2.5 py-1.5 text-xs text-zinc-400">
                  {req.install}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500">
            Need help getting started?
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs/installation"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Installation Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-600"
            >
              Full Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="text-sm font-semibold text-white">AgentFlow</span>
          </Link>
          <p className="text-xs text-zinc-500">
            Open source under MIT license.
          </p>
        </div>
      </footer>
    </div>
  );
}
