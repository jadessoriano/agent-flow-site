import Link from "next/link";
import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Quickstart",
  description: "Get up and running with AgentFlow in 60 seconds — install, open a project, build a pipeline, and run it.",
};

export default function QuickstartPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Quickstart" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Quickstart</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Get from zero to a running pipeline in under 60 seconds.
      </p>

      <InfoBox type="tip" title="Prerequisites">
        You need{" "}
        <Link href="/docs/installation" className="text-indigo-400 underline">
          Claude Code CLI
        </Link>{" "}
        installed and accessible in your PATH. Run{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          claude --version
        </code>{" "}
        to verify.
      </InfoBox>

      {/* Step 1 */}
      <h2 className="mt-12 text-2xl font-bold" id="step-1">
        <span className="mr-2 text-indigo-400">1.</span> Install Claude Code CLI
      </h2>
      <p className="mt-3 text-zinc-400">
        If you haven&apos;t already, install the Claude Code CLI:
      </p>
      <CodeBlock title="Terminal" language="bash">
        {`npm install -g @anthropic-ai/claude-code`}
      </CodeBlock>

      {/* Step 2 */}
      <h2 className="mt-12 text-2xl font-bold" id="step-2">
        <span className="mr-2 text-indigo-400">2.</span> Download AgentFlow
      </h2>
      <p className="mt-3 text-zinc-400">
        Grab the latest release for your platform from the{" "}
        <Link href="/download" className="text-indigo-400 underline">
          download page
        </Link>{" "}
        or build from source:
      </p>
      <CodeBlock title="Terminal" language="bash">
        {`git clone https://github.com/jadessoriano/agent-flow.git
cd agent-flow
npm install
cargo tauri build`}
      </CodeBlock>

      {/* Step 3 */}
      <h2 className="mt-12 text-2xl font-bold" id="step-3">
        <span className="mr-2 text-indigo-400">3.</span> Open Your Project
      </h2>
      <p className="mt-3 text-zinc-400">
        Launch AgentFlow and open any git repository. The app auto-detects
        existing Claude Code agents and pipelines in the{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          .claude/
        </code>{" "}
        directory.
      </p>

      {/* Step 4 */}
      <h2 className="mt-12 text-2xl font-bold" id="step-4">
        <span className="mr-2 text-indigo-400">4.</span> Create Your First Pipeline
      </h2>
      <p className="mt-3 text-zinc-400">
        Click <strong>New Pipeline</strong>, then:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-zinc-400">
        <li>
          Drag an <strong>AI Task</strong> node onto the canvas
        </li>
        <li>
          Add a <strong>Shell Command</strong> node
        </li>
        <li>
          Connect them by dragging from the output handle of the first node to
          the input handle of the second
        </li>
        <li>
          Click each node to configure its instructions in the side panel
        </li>
      </ul>

      <InfoBox type="info" title="Example">
        AI Task: &quot;Review this code for bugs&quot; → Shell: &quot;npm run test&quot;
      </InfoBox>

      {/* Step 5 */}
      <h2 className="mt-12 text-2xl font-bold" id="step-5">
        <span className="mr-2 text-indigo-400">5.</span> Run It
      </h2>
      <p className="mt-3 text-zinc-400">
        Press{" "}
        <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          Ctrl+R
        </kbd>{" "}
        or click the <strong>Run</strong> button. Watch your pipeline execute in
        real-time with live log streaming and per-node status updates.
      </p>

      {/* Next steps */}
      <h2 className="mt-12 text-2xl font-bold" id="next-steps">
        Next Steps
      </h2>
      <ul className="mt-4 space-y-3 text-zinc-400">
        <li>
          <Link
            href="/docs/pipelines"
            className="text-indigo-400 underline"
          >
            Pipelines
          </Link>{" "}
          — Learn about the JSON schema, variables, and conditional edges
        </li>
        <li>
          <Link
            href="/docs/node-types"
            className="text-indigo-400 underline"
          >
            Node Types
          </Link>{" "}
          — Explore all 8 node types and their configuration options
        </li>
        <li>
          <Link
            href="/docs/execution"
            className="text-indigo-400 underline"
          >
            Execution &amp; Runs
          </Link>{" "}
          — Streaming logs, retry, resume, and run history
        </li>
        <li>
          <Link
            href="/docs/example-pipeline"
            className="text-indigo-400 underline"
          >
            Example Pipeline
          </Link>{" "}
          — Full CI/CD walkthrough using all node types
        </li>
      </ul>
    </div>
  );
}
