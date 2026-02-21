import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Execution & Runs",
  description: "Pipeline execution flow, live log streaming, cancellation, resume from failure, and run history database.",
};

export default function ExecutionPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Execution & Runs" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Execution & Runs</h1>
      <p className="mt-4 text-lg text-zinc-400">
        How AgentFlow executes pipelines, streams logs, handles failures, and
        manages run history.
      </p>

      {/* Execution Flow */}
      <h2 className="mt-12 text-2xl font-bold" id="flow">
        Execution Flow
      </h2>

      <div className="mt-6 space-y-4">
        {[
          {
            step: "1. Validation",
            desc: "Sub-pipeline references checked, MCP tools validated, instruction hashes computed for each node.",
          },
          {
            step: "2. DAG Construction",
            desc: "Nodes and edges are analyzed to build a topological execution order. Nodes at the same level can run concurrently.",
          },
          {
            step: "3. Level-by-Level Execution",
            desc: "For each level in the DAG, runnable nodes are identified based on edge conditions from predecessors.",
          },
          {
            step: "4. Process Spawning",
            desc: "AI tasks spawn Claude CLI, shell/git nodes spawn bash. All stdout/stderr is streamed line-by-line to the UI.",
          },
          {
            step: "5. Status Updates",
            desc: 'Each node transitions through: pending → running → success/failed/skipped/cancelled. Events emitted on every change.',
          },
          {
            step: "6. Cost Aggregation",
            desc: "AI task costs are parsed from Claude CLI stderr and summed for the entire run.",
          },
          {
            step: "7. Database Persistence",
            desc: "Run metadata and per-node details (logs, exit codes, costs, timing) are stored in SQLite.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="flex gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5"
          >
            <div className="shrink-0 text-sm font-bold text-indigo-400">
              {item.step}
            </div>
            <p className="text-sm text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Data Flow Diagram */}
      <h2 className="mt-12 text-2xl font-bold" id="data-flow">
        Data Flow
      </h2>

      <CodeBlock title="End-to-end execution flow" language="text">
        {`Frontend: startRun(pipeline, inputs, cliPath, projectPath)
    │
    ▼
Tauri IPC → executor::start_run()
    │
    ├── Validate sub-pipelines & MCP tools
    ├── Insert run record in SQLite
    ├── Spawn async task: run_pipeline_loop()
    │       │
    │       ├── Build topological order (DAG)
    │       ├── For each level:
    │       │     ├── Check edge conditions
    │       │     ├── Skip nodes without satisfied edges
    │       │     └── Execute runnable nodes concurrently
    │       │           │
    │       │           ├── ai-task → spawn claude CLI
    │       │           ├── shell/git → spawn bash -c
    │       │           ├── parallel → tokio::spawn children
    │       │           ├── approval-gate → emit event, wait
    │       │           └── sub-pipeline → recursive call
    │       │
    │       ├── Emit node-log events (streamed output)
    │       ├── Emit run-update events (status changes)
    │       ├── Parse cost from Claude stderr
    │       └── Insert run_steps in SQLite
    │
    ▼
Frontend: listens for events, updates canvas & log viewer`}
      </CodeBlock>

      {/* Live Streaming */}
      <h2 className="mt-12 text-2xl font-bold" id="streaming">
        Live Log Streaming
      </h2>
      <p className="mt-3 text-zinc-400">
        During execution, stdout and stderr from each node are captured and
        emitted as events to the frontend line-by-line.
      </p>

      <CodeBlock title="Event format" language="json">
        {`// node-log event payload
{
  "runId": "run-1708344567890",
  "nodeId": "node-2",
  "line": "PASS src/utils.test.ts (2.34s)"
}

// run-update event payload
{
  "runId": "run-1708344567890",
  "status": "running",
  "nodeStates": {
    "node-1": "success",
    "node-2": "running",
    "node-3": "pending"
  },
  "totalCost": 0.0342
}`}
      </CodeBlock>

      <p className="mt-4 text-sm text-zinc-400">
        The live log viewer in the UI shows streamed output in a monospace panel
        with auto-scroll. Each node&apos;s output is tagged and can be filtered.
      </p>

      {/* Cancellation */}
      <h2 className="mt-12 text-2xl font-bold" id="cancellation">
        Cancellation
      </h2>
      <p className="mt-3 text-zinc-400">
        Running pipelines can be cancelled at any time via{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+R</code> (toggles
        run/cancel) or the cancel button.
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>Active processes receive <strong>SIGTERM</strong> first</li>
        <li>If a process doesn&apos;t exit within the grace period, <strong>SIGKILL</strong> is sent</li>
        <li>All pending nodes are marked as <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">cancelled</code></li>
        <li>The run is recorded with status <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">cancelled</code> in the database</li>
      </ul>

      {/* Resume */}
      <h2 className="mt-12 text-2xl font-bold" id="resume">
        Resume from Failure
      </h2>
      <p className="mt-3 text-zinc-400">
        When a pipeline fails, you can resume it from the point of failure
        instead of re-running everything from scratch.
      </p>

      <CodeBlock title="Resume logic" language="text">
        {`1. Load original run and its steps from the database
2. Build maps:
   - prior_results: { nodeId → status }
   - prior_approvals: { nodeId → "approved" | "rejected" }
   - prior_instructions: { nodeId → SHA256 hash }
3. During re-execution, for each node:
   - If prior status was "success" AND instruction hash matches
     → Reuse result (skip execution)
   - If prior approval was "approved"
     → Auto-approve (skip waiting)
   - Otherwise → Execute normally
4. New run ID created, linked via resumed_from field`}
      </CodeBlock>

      <InfoBox type="info" title="Instruction change detection">
        Resume uses SHA-256 hashes of node instructions. If you modify a
        node&apos;s instructions between the original run and the resume, that
        node will be re-executed even if it previously succeeded.
      </InfoBox>

      {/* Run History */}
      <h2 className="mt-12 text-2xl font-bold" id="history">
        Run History
      </h2>
      <p className="mt-3 text-zinc-400">
        Every pipeline run is stored in the SQLite database with full details.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Run Record</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Field</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Description</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ["id", 'Unique run ID, format: "run-{timestamp_ms}"'],
              ["pipeline_name", "Name of the executed pipeline"],
              ["started_at", "ISO 8601 UTC timestamp"],
              ["finished_at", "NULL until completion"],
              ["status", '"running" | "success" | "failed" | "cancelled"'],
              ["trigger_input", "JSON string of input variables used"],
              ["resumed_from", "Original run ID if this is a resume"],
              ["failed_node_id", "ID of the first node that failed"],
              ["pipeline_hash", "SHA-256 of all instructions"],
            ].map(([field, desc]) => (
              <tr key={field} className="border-b border-zinc-800/50">
                <td className="px-4 py-2">
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">{field}</code>
                </td>
                <td className="px-4 py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-lg font-semibold">Step Record</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Field</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Description</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ["run_id", "References the parent run"],
              ["node_id", "Pipeline node ID"],
              ["node_name", "Display name at execution time"],
              ["started_at / finished_at", "Execution timing"],
              ["status", "Node execution status"],
              ["exit_code", "Process exit code (0 = success)"],
              ["log_output", "Full captured stdout + stderr"],
              ["attempt", "Retry attempt number (starts at 1)"],
              ["cost_usd", "Claude API cost (NULL for non-AI nodes)"],
              ["model", "AI model name if tracked"],
              ["approval_state", '"approved" | "rejected" for approval gates'],
              ["instructions_hash", "SHA-256 for resume detection"],
            ].map(([field, desc]) => (
              <tr key={field} className="border-b border-zinc-800/50">
                <td className="px-4 py-2">
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">{field}</code>
                </td>
                <td className="px-4 py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approval Handling */}
      <h2 className="mt-12 text-2xl font-bold" id="approvals">
        Approval Handling
      </h2>
      <p className="mt-3 text-zinc-400">
        When execution reaches an approval gate:
      </p>
      <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-zinc-400">
        <li>An <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">approval-requested</code> event is emitted</li>
        <li>The UI shows a dialog with the node&apos;s instructions</li>
        <li>The user clicks <strong>Approve</strong> or <strong>Reject</strong></li>
        <li>
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">respond_to_approval(approved: bool)</code>{" "}
          is called via IPC
        </li>
        <li>Execution continues (on approve) or fails (on reject)</li>
      </ol>
    </div>
  );
}
