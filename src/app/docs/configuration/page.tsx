import { Breadcrumb, CodeBlock, InfoBox, PropTable } from "@/components/docs-layout";

export const metadata = {
  title: "Configuration",
  description: "Configure AgentFlow settings, Claude CLI detection, Tauri configuration, project setup, and file watching.",
};

export default function ConfigurationPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Configuration" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
      <p className="mt-4 text-lg text-zinc-400">
        AgentFlow stores settings in a JSON file and automatically detects your
        Claude CLI installation. Here&apos;s how to configure every aspect of the app.
      </p>

      {/* App Settings */}
      <h2 className="mt-12 text-2xl font-bold" id="app-settings">
        App Settings
      </h2>
      <p className="mt-3 text-zinc-400">
        Settings are persisted to{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          {`{APP_DATA_DIR}/settings.json`}
        </code>{" "}
        and loaded on startup.
      </p>

      <PropTable
        items={[
          {
            name: "claude_cli_path",
            type: "string | null",
            description:
              "Absolute path to the Claude Code CLI binary. Auto-detected if null.",
          },
          {
            name: "theme",
            type: "string",
            description:
              '"dark" — the only supported theme. Light theme has been removed.',
          },
          {
            name: "experience_mode",
            type: "string",
            description:
              '"simple" for essential features only, or "advanced" for the full feature set including parallel, loops, and advanced configuration.',
          },
          {
            name: "notifications",
            type: "boolean",
            description:
              "Enable/disable desktop notifications for pipeline events.",
          },
        ]}
      />

      <CodeBlock title="Default settings.json" language="json">
        {`{
  "claude_cli_path": null,
  "theme": "dark",
  "experience_mode": "simple",
  "notifications": true
}`}
      </CodeBlock>

      {/* Setup Wizard */}
      <h2 className="mt-12 text-2xl font-bold" id="setup-wizard">
        Setup Wizard
      </h2>
      <p className="mt-3 text-zinc-400">
        When you launch AgentFlow for the first time (or when no project is
        configured), a setup wizard guides you through initial configuration:
      </p>
      <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-zinc-400">
        <li>Select your project directory (git repository)</li>
        <li>Auto-detect and verify the Claude CLI installation</li>
        <li>Choose your experience mode (Simple or Advanced)</li>
        <li>Create the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/</code> directory structure if it doesn&apos;t exist</li>
      </ol>

      <InfoBox type="tip">
        After completing the wizard, a hint overlay highlights key UI areas to
        help you get started quickly. You can dismiss it at any time.
      </InfoBox>

      {/* Experience Modes */}
      <h2 className="mt-12 text-2xl font-bold" id="experience-modes">
        Experience Modes
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow offers two experience modes to match your comfort level:
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <h3 className="font-semibold text-zinc-200">Simple Mode</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Essential features only. Hides advanced node types (Parallel, Loop)
            and complex configuration options. Ideal for getting started or for
            straightforward linear pipelines.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <h3 className="font-semibold text-zinc-200">Advanced Mode</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Full feature set including Parallel nodes, Loop nodes, advanced
            retry/timeout configuration, per-node model selection, and all
            pipeline settings. For power users building complex workflows.
          </p>
        </div>
      </div>

      <InfoBox type="info">
        You can switch between modes at any time in{" "}
        <strong>Settings &rarr; Experience Mode</strong>. Pipelines created in
        Advanced mode can still be run in Simple mode — the mode only affects
        which UI options are visible.
      </InfoBox>

      {/* CLI Detection */}
      <h2 className="mt-12 text-2xl font-bold" id="cli-detection">
        Claude CLI Auto-Detection
      </h2>
      <p className="mt-3 text-zinc-400">
        When <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">claude_cli_path</code> is{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">null</code>,
        AgentFlow searches the following locations in order, returning the first
        match:
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Priority</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Source</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Path</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ["1", "System PATH", "which claude"],
              ["2", "NVM", "~/.nvm/versions/node/*/bin/claude"],
              ["3", "fnm", "~/.local/share/fnm/node-versions/*/installation/bin/claude"],
              ["4", "Bun", "~/.bun/bin/claude"],
              ["5", "npm global", "~/.npm-global/bin/claude"],
              ["6", "Claude Desktop", "~/.claude/local/claude"],
              ["7", "Cargo", "~/.cargo/bin/claude"],
              ["8", "Local bin", "~/.local/bin/claude"],
              ["9", "Homebrew", "/opt/homebrew/bin/claude"],
              ["10", "Linuxbrew", "/home/linuxbrew/.linuxbrew/bin/claude"],
              ["11", "System", "/usr/local/bin/claude"],
              ["12", "System", "/usr/bin/claude"],
              ["13", "Snap", "/snap/bin/claude"],
            ].map(([priority, source, path]) => (
              <tr key={priority} className="border-b border-zinc-800/50">
                <td className="px-4 py-2">{priority}</td>
                <td className="px-4 py-2">{source}</td>
                <td className="px-4 py-2">
                  <code className="text-xs text-zinc-300">{path}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InfoBox type="tip" title="Manual override">
        If auto-detection picks the wrong binary, set{" "}
        <code>claude_cli_path</code> explicitly in{" "}
        <strong>Settings &rarr; Claude CLI Path</strong> within the app.
      </InfoBox>

      {/* Tauri Configuration */}
      <h2 className="mt-12 text-2xl font-bold" id="tauri-config">
        Tauri Configuration
      </h2>
      <p className="mt-3 text-zinc-400">
        The desktop app is configured via{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          tauri.conf.json
        </code>{" "}
        in the project root.
      </p>

      <PropTable
        items={[
          { name: "productName", type: "string", description: '"AgentFlow"' },
          { name: "identifier", type: "string", description: '"com.agentflow.app"' },
          {
            name: "window.width / height",
            type: "number",
            description: "Default: 1280 x 800. Min: 900 x 600.",
          },
          {
            name: "window.resizable",
            type: "boolean",
            description: "true — window can be resized freely.",
          },
          {
            name: "bundle.targets",
            type: "string",
            description: '"all" — builds .deb, .dmg, .msi, .AppImage, etc.',
          },
        ]}
      />

      <CodeBlock title="tauri.conf.json (key fields)" language="json">
        {`{
  "productName": "AgentFlow",
  "identifier": "com.agentflow.app",
  "build": {
    "devUrl": "http://localhost:1420",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "AgentFlow",
        "width": 1280,
        "height": 800,
        "minWidth": 900,
        "minHeight": 600,
        "resizable": true
      }
    ]
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}`}
      </CodeBlock>

      {/* Vite Configuration */}
      <h2 className="mt-12 text-2xl font-bold" id="vite-config">
        Vite Configuration
      </h2>
      <p className="mt-3 text-zinc-400">
        Frontend build is managed by Vite 7 with React and Tailwind plugins.
      </p>

      <CodeBlock title="vite.config.ts" language="typescript">
        {`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? { protocol: "ws", host, port: 1421 }
      : undefined,
  },
});`}
      </CodeBlock>

      {/* Project Setup */}
      <h2 className="mt-12 text-2xl font-bold" id="project-setup">
        Project Setup
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow works with any git repository. It looks for a{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/</code>{" "}
        directory containing agents and pipelines.
      </p>

      <CodeBlock title="Initialize a project" language="bash">
        {`# AgentFlow creates .claude/ if it doesn't exist when you
# initialize a project from the app, or you can do it manually:

mkdir -p .claude/agents .claude/pipelines`}
      </CodeBlock>

      <h3 className="mt-8 text-lg font-semibold">Project Detection</h3>
      <p className="mt-2 text-sm text-zinc-400">
        When launched, AgentFlow attempts to auto-detect your project by walking
        parent directories from the current working directory looking for a{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/</code>{" "}
        directory. You can also select a project manually or choose from recent
        projects.
      </p>

      <h3 className="mt-8 text-lg font-semibold">Project Scanning</h3>
      <p className="mt-2 text-sm text-zinc-400">
        When a project is selected, AgentFlow scans it and reports:
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-zinc-400">
        <li>Whether <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/</code> exists</li>
        <li>Number of agent files found</li>
        <li>Number of pipeline files found</li>
        <li>Whether <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.mcp.json</code> exists (for MCP tool validation)</li>
      </ul>

      {/* File Watching */}
      <h2 className="mt-12 text-2xl font-bold" id="file-watching">
        File Watching
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow watches the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/agents/</code> and{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/pipelines/</code> directories for filesystem
        changes using the{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">notify</code> crate.
      </p>
      <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-zinc-400">
        <li>Changes are debounced at 500ms to prevent rapid reloads</li>
        <li>
          A <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">file-changed</code> event is emitted to the frontend with the change kind and affected paths
        </li>
        <li>Agent and pipeline lists auto-refresh when teammates push changes via git</li>
      </ul>

      {/* Environment Variables */}
      <h2 className="mt-12 text-2xl font-bold" id="env-vars">
        Environment Variables
      </h2>

      <PropTable
        items={[
          {
            name: "TAURI_DEV_HOST",
            type: "string",
            description:
              "Dev only. Sets the Vite HMR host for remote development.",
          },
          {
            name: "HOME",
            type: "string",
            description:
              "Used for Claude CLI detection paths (~/.nvm, ~/.bun, etc.).",
          },
          {
            name: "NVM_DIR",
            type: "string",
            description: "Defaults to ~/.nvm. Used for NVM-based CLI detection.",
          },
        ]}
      />

      <InfoBox type="info">
        AgentFlow does not require any environment variables for runtime
        operation. All configuration is stored in the settings JSON file and
        managed through the app UI.
      </InfoBox>
    </div>
  );
}
