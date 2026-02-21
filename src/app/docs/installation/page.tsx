import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Installation",
  description: "Install AgentFlow on Windows, macOS, or Linux. Prerequisites, system dependencies, build steps, and development mode setup.",
};

export default function InstallationPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Installation" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Set up AgentFlow on your machine. The app runs as a native desktop
        application built with Tauri, requiring both Rust and Node.js toolchains.
      </p>

      {/* Prerequisites */}
      <h2 className="mt-12 text-2xl font-bold" id="prerequisites">
        Prerequisites
      </h2>
      <p className="mt-3 text-zinc-400">
        Make sure the following are installed before building AgentFlow:
      </p>

      <div className="mt-6 space-y-4">
        {[
          {
            name: "Rust 1.77.2+",
            desc: "Backend runtime and compiler",
            install: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
          },
          {
            name: "Node.js 16+",
            desc: "Frontend build toolchain (npm included)",
            install: "nvm install --lts",
          },
          {
            name: "Tauri CLI v2",
            desc: "Desktop app framework CLI",
            install: "cargo install tauri-cli --version ^2.0",
          },
          {
            name: "Claude Code CLI",
            desc: "Required at runtime for AI task execution",
            install: "npm install -g @anthropic-ai/claude-code",
          },
        ].map((dep) => (
          <div
            key={dep.name}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">{dep.name}</h3>
              <span className="text-xs text-zinc-500">{dep.desc}</span>
            </div>
            <CodeBlock language="bash">{dep.install}</CodeBlock>
          </div>
        ))}
      </div>

      <InfoBox type="info" title="Platform support">
        AgentFlow builds for <strong>Windows</strong>, <strong>macOS</strong>, and{" "}
        <strong>Linux</strong> via Tauri v2. Tauri has its own{" "}
        <a
          href="https://v2.tauri.app/start/prerequisites/"
          className="text-indigo-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          platform-specific prerequisites
        </a>{" "}
        (e.g., webkit2gtk on Linux, Xcode CLT on macOS).
      </InfoBox>

      {/* System dependencies */}
      <h2 className="mt-12 text-2xl font-bold" id="system-deps">
        System Dependencies
      </h2>

      <h3 className="mt-6 text-lg font-semibold">Linux (Debian / Ubuntu)</h3>
      <CodeBlock language="bash">
        {`sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev \\
  build-essential curl wget file \\
  libssl-dev libayatana-appindicator3-dev \\
  librsvg2-dev`}
      </CodeBlock>

      <h3 className="mt-6 text-lg font-semibold">macOS</h3>
      <CodeBlock language="bash">
        {`xcode-select --install`}
      </CodeBlock>

      <h3 className="mt-6 text-lg font-semibold">Windows</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Install{" "}
        <a
          href="https://visualstudio.microsoft.com/visual-cpp-build-tools/"
          className="text-indigo-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visual Studio Build Tools
        </a>{" "}
        with the &quot;Desktop development with C++&quot; workload and the Windows 10/11 SDK.
      </p>

      {/* Clone & Build */}
      <h2 className="mt-12 text-2xl font-bold" id="build">
        Clone & Build
      </h2>

      <CodeBlock title="Clone the repository" language="bash">
        {`git clone https://github.com/jadessoriano/agent-flow.git
cd agent-flow`}
      </CodeBlock>

      <CodeBlock title="Install frontend dependencies" language="bash">
        {`npm install`}
      </CodeBlock>

      <CodeBlock title="Build the desktop app" language="bash">
        {`npm run tauri build`}
      </CodeBlock>

      <p className="mt-4 text-sm text-zinc-400">
        The built application will be in{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          src-tauri/target/release/bundle/
        </code>{" "}
        with platform-specific installers (.deb, .dmg, .msi, etc.).
      </p>

      {/* Development mode */}
      <h2 className="mt-12 text-2xl font-bold" id="development">
        Development Mode
      </h2>
      <p className="mt-3 text-zinc-400">
        For local development with hot module replacement:
      </p>

      <CodeBlock title="Start the dev server" language="bash">
        {`npm run tauri dev`}
      </CodeBlock>

      <p className="mt-3 text-sm text-zinc-400">
        This starts the Vite dev server on{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          localhost:1420
        </code>{" "}
        with HMR and opens the Tauri desktop window pointed at it.
      </p>

      <InfoBox type="tip" title="Frontend only">
        If you only want to iterate on the UI without the Tauri shell, you can
        run <code>npm run dev</code> alone. IPC calls to the Rust backend will
        fail, but layout and styling work fine.
      </InfoBox>

      {/* Data locations */}
      <h2 className="mt-12 text-2xl font-bold" id="data-locations">
        Data Locations
      </h2>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Data</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Location</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            <tr className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">SQLite database</td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">~/.cache/com.agentflow.app/agentflow.db</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">Settings</td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">{`{APP_DATA_DIR}/settings.json`}</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">Application logs</td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">~/.cache/com.agentflow.app/agentflow.log</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">Agents</td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">{`{project}/.claude/agents/*.md`}</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">Pipelines</td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">{`{project}/.claude/pipelines/*.pipeline.json`}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Verify */}
      <h2 className="mt-12 text-2xl font-bold" id="verify">
        Verify Installation
      </h2>
      <p className="mt-3 text-zinc-400">
        After building, launch the app and check that:
      </p>
      <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-zinc-400">
        <li>The application window opens to the project selection screen.</li>
        <li>
          The Claude CLI is auto-detected (check{" "}
          <strong className="text-zinc-200">Settings &rarr; Claude CLI Path</strong>).
        </li>
        <li>
          Pointing to a git repository with a{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/</code>{" "}
          directory loads any existing agents and pipelines.
        </li>
        <li>
          Creating a new pipeline shows the visual canvas with the node palette.
        </li>
      </ol>

      <InfoBox type="warning" title="Claude CLI required at runtime">
        Building AgentFlow does not require the Claude CLI, but{" "}
        <strong>running AI task nodes</strong> does. The app will warn you if
        the CLI cannot be found when you try to execute a pipeline.
      </InfoBox>
    </div>
  );
}
