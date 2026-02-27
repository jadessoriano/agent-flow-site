import Link from "next/link";
import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Contributing",
  description: "How to contribute to AgentFlow — development setup, project structure, PR guidelines, and issue reporting.",
};

export default function ContributingPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Contributing" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Contributing</h1>
      <p className="mt-4 text-lg text-zinc-400">
        AgentFlow is open source and we welcome contributions. Here&apos;s
        everything you need to get started.
      </p>

      {/* Prerequisites */}
      <h2 className="mt-12 text-2xl font-bold" id="prerequisites">
        Prerequisites
      </h2>
      <p className="mt-3 text-zinc-400">
        You&apos;ll need the following tools installed:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-zinc-400">
        <li>
          <strong>Rust</strong> (stable) —{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            rustup install stable
          </code>
        </li>
        <li>
          <strong>Node.js 20+</strong> — for the React frontend
        </li>
        <li>
          <strong>Tauri CLI</strong> —{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            cargo install tauri-cli
          </code>
        </li>
        <li>
          <strong>Claude Code CLI</strong> — for testing pipeline execution
        </li>
      </ul>

      {/* Dev Setup */}
      <h2 className="mt-12 text-2xl font-bold" id="dev-setup">
        Development Setup
      </h2>
      <CodeBlock title="Terminal" language="bash">
        {`# Clone the repository
git clone https://github.com/jadessoriano/agent-flow.git
cd agent-flow

# Install frontend dependencies
npm install

# Start development (opens the app with hot-reload)
cargo tauri dev`}
      </CodeBlock>

      <InfoBox type="info" title="First build">
        The first <code>cargo tauri dev</code> will compile the Rust backend
        from scratch, which may take a few minutes. Subsequent builds are
        incremental and much faster.
      </InfoBox>

      {/* Project Structure */}
      <h2 className="mt-12 text-2xl font-bold" id="project-structure">
        Project Structure
      </h2>
      <CodeBlock title="Project Layout" language="text">
        {`agent-flow/
├── src/                 # React frontend (TypeScript)
│   ├── components/      # UI components
│   ├── stores/          # Zustand state management
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
├── src-tauri/           # Rust backend
│   ├── src/
│   │   ├── executor/    # Pipeline execution engine
│   │   ├── commands/    # Tauri IPC command handlers
│   │   └── db/          # SQLite database layer
│   └── Cargo.toml
├── public/              # Static assets
└── package.json`}
      </CodeBlock>

      {/* PR Guidelines */}
      <h2 className="mt-12 text-2xl font-bold" id="pull-requests">
        Pull Request Guidelines
      </h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-zinc-400">
        <li>
          <strong>Branch from main</strong> — create a feature branch like{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            feat/your-feature
          </code>{" "}
          or{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            fix/bug-description
          </code>
        </li>
        <li>
          <strong>Keep PRs focused</strong> — one feature or fix per PR
        </li>
        <li>
          <strong>Write descriptive commits</strong> — use conventional commit
          format (e.g.,{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            feat: add node copy/paste
          </code>
          )
        </li>
        <li>
          <strong>Test your changes</strong> — run{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            npm run lint
          </code>{" "}
          and{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            cargo clippy
          </code>{" "}
          before submitting
        </li>
        <li>
          <strong>Update docs</strong> if your changes affect user-facing behavior
        </li>
      </ul>

      {/* Issues */}
      <h2 className="mt-12 text-2xl font-bold" id="reporting-issues">
        Reporting Issues
      </h2>
      <p className="mt-3 text-zinc-400">
        Found a bug or have a feature request? Open an issue on{" "}
        <a
          href="https://github.com/jadessoriano/agent-flow/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 underline"
        >
          GitHub Issues
        </a>
        . Please include:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-zinc-400">
        <li>AgentFlow version and OS</li>
        <li>Steps to reproduce the issue</li>
        <li>Expected vs. actual behavior</li>
        <li>Screenshots or error logs if applicable</li>
      </ul>

      <InfoBox type="tip" title="Good first issues">
        Look for issues tagged{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          good first issue
        </code>{" "}
        on GitHub — these are great starting points for new contributors.
      </InfoBox>

      {/* License */}
      <h2 className="mt-12 text-2xl font-bold" id="license">
        License
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow is released under the{" "}
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 underline"
        >
          MIT License
        </a>
        . By contributing, you agree that your contributions will be licensed
        under the same terms.
      </p>
    </div>
  );
}
