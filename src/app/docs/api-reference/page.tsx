import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "API Reference",
  description: "Complete Tauri IPC command reference, events, and SQLite database schema for AgentFlow.",
};

export default function ApiReferencePage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "API Reference" }]} />

      <h1 className="text-3xl font-bold tracking-tight">API Reference</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Complete reference for all Tauri IPC commands and events. These are the
        functions the React frontend calls to interact with the Rust backend.
      </p>

      <InfoBox type="info">
        All commands are invoked via Tauri&apos;s{" "}
        <code>invoke(&quot;command_name&quot;, {`{ args }`})</code> function from the
        frontend. Events are listened to via{" "}
        <code>listen(&quot;event-name&quot;, callback)</code>.
      </InfoBox>

      {/* Agent Management */}
      <h2 className="mt-12 text-2xl font-bold" id="agents">
        Agent Management
      </h2>
      <CommandList
        commands={[
          {
            name: "list_agents",
            params: "projectPath: string",
            returns: "AgentInfo[]",
            desc: "Lists all .md agent files in .claude/agents/ with auto-extracted descriptions.",
          },
          {
            name: "read_agent",
            params: "path: string",
            returns: "{ name: string, path: string, content: string }",
            desc: "Reads the full Markdown content of an agent file.",
          },
          {
            name: "write_agent",
            params: "path: string, content: string",
            returns: "void",
            desc: "Overwrites an agent file with new content.",
          },
          {
            name: "create_agent",
            params: "projectPath: string, name: string, content: string",
            returns: "string (file path)",
            desc: "Creates a new agent .md file. Returns the full path.",
          },
          {
            name: "delete_agent",
            params: "path: string",
            returns: "void",
            desc: "Deletes an agent file from the filesystem.",
          },
        ]}
      />

      {/* Pipeline CRUD */}
      <h2 className="mt-12 text-2xl font-bold" id="pipelines">
        Pipeline Management
      </h2>
      <CommandList
        commands={[
          {
            name: "list_pipelines",
            params: "projectPath: string",
            returns: "PipelineInfo[]",
            desc: "Lists all .pipeline.json files in .claude/pipelines/.",
          },
          {
            name: "read_pipeline",
            params: "path: string",
            returns: "Pipeline",
            desc: "Reads and parses a pipeline JSON file.",
          },
          {
            name: "write_pipeline",
            params: "projectPath: string, pipeline: Pipeline",
            returns: "string (file path)",
            desc: "Saves a pipeline to disk. Also auto-generates agent markdown from pipeline nodes.",
          },
          {
            name: "delete_pipeline",
            params: "projectPath: string, path: string",
            returns: "void",
            desc: "Deletes a pipeline JSON file.",
          },
          {
            name: "rename_pipeline",
            params: "projectPath: string, oldPath: string, newName: string",
            returns: "string (new path)",
            desc: "Renames a pipeline file.",
          },
          {
            name: "generate_pipeline",
            params: "prompt: string, cliPath: string, projectPath: string",
            returns: "Pipeline",
            desc: "Uses Claude CLI to generate a pipeline from a natural language description.",
          },
        ]}
      />

      {/* Execution */}
      <h2 className="mt-12 text-2xl font-bold" id="execution">
        Execution
      </h2>
      <CommandList
        commands={[
          {
            name: "start_run",
            params: "pipeline: Pipeline, inputs: Record<string, string>, claudeCliPath: string, projectPath: string",
            returns: "string (run ID)",
            desc: "Starts executing a pipeline. Returns run ID immediately; execution continues async.",
          },
          {
            name: "cancel_run",
            params: "(none)",
            returns: "void",
            desc: "Cancels the currently active run. Sends SIGTERM to active processes.",
          },
          {
            name: "respond_to_approval",
            params: "approved: boolean",
            returns: "void",
            desc: "Responds to a pending approval gate. true = continue, false = fail the node.",
          },
          {
            name: "get_run_state",
            params: "(none)",
            returns: "RunState | null",
            desc: "Returns the current run state or null if no run is active.",
          },
          {
            name: "resume_run",
            params: "originalRunId: string, pipeline: Pipeline, inputs: Record<string, string>, claudeCliPath: string, projectPath: string",
            returns: "string (new run ID)",
            desc: "Resumes a failed run from the point of failure, reusing successful steps.",
          },
        ]}
      />

      {/* Run History */}
      <h2 className="mt-12 text-2xl font-bold" id="history">
        Run History & Analytics
      </h2>
      <CommandList
        commands={[
          {
            name: "list_run_history",
            params: "limit?: number",
            returns: "RunRow[]",
            desc: "Lists past runs ordered by start time descending.",
          },
          {
            name: "get_run_details",
            params: "runId: string",
            returns: "[RunRow, RunStepRow[]]",
            desc: "Returns the run record and all its step records.",
          },
          {
            name: "get_cost_summary",
            params: "(none)",
            returns: "{ totalCost: number, runs: CostRun[] }",
            desc: "Total cost and per-run cost breakdown.",
          },
          {
            name: "get_usage_stats",
            params: "(none)",
            returns: "UsageStats",
            desc: "Comprehensive analytics: totals, averages, top nodes, top pipelines.",
          },
          {
            name: "get_avg_ai_cost",
            params: "(none)",
            returns: "number | null",
            desc: "Average cost per AI task execution.",
          },
        ]}
      />

      {/* Project Management */}
      <h2 className="mt-12 text-2xl font-bold" id="projects">
        Project Management
      </h2>
      <CommandList
        commands={[
          {
            name: "scan_project",
            params: "projectPath: string",
            returns: "ProjectInfo",
            desc: "Scans a directory for .claude/ existence, agent count, and pipeline count.",
          },
          {
            name: "init_project",
            params: "projectPath: string",
            returns: "void",
            desc: "Creates .claude/agents/ and .claude/pipelines/ directories.",
          },
          {
            name: "detect_project_from_cwd",
            params: "(none)",
            returns: "string | null",
            desc: "Walks parent directories looking for .claude/. Returns the project root or null.",
          },
          {
            name: "get_recent_projects",
            params: "(none)",
            returns: "RecentProjects",
            desc: "Returns the list of recently opened projects.",
          },
          {
            name: "add_recent_project",
            params: "projectPath: string",
            returns: "void",
            desc: "Adds a project to the recent list.",
          },
          {
            name: "remove_recent_project",
            params: "projectPath: string",
            returns: "void",
            desc: "Removes a project from the recent list.",
          },
        ]}
      />

      {/* Settings */}
      <h2 className="mt-12 text-2xl font-bold" id="settings">
        Settings
      </h2>
      <CommandList
        commands={[
          {
            name: "get_settings",
            params: "(none)",
            returns: "AppSettings",
            desc: "Returns the current app settings.",
          },
          {
            name: "save_settings",
            params: "settings: AppSettings",
            returns: "void",
            desc: "Persists settings to the JSON file.",
          },
          {
            name: "detect_claude_cli",
            params: "(none)",
            returns: "string | null",
            desc: "Auto-detects the Claude CLI path. Returns the path or null.",
          },
          {
            name: "detect_claude_cli_detailed",
            params: "(none)",
            returns: "{ path: string, version: string, source: string }",
            desc: "Detailed detection with version info and the source where it was found.",
          },
        ]}
      />

      {/* File Watching */}
      <h2 className="mt-12 text-2xl font-bold" id="file-watching">
        File Watching
      </h2>
      <CommandList
        commands={[
          {
            name: "start_watching",
            params: "projectPath: string",
            returns: "void",
            desc: "Starts watching .claude/agents/ and .claude/pipelines/ for changes.",
          },
          {
            name: "stop_watching",
            params: "(none)",
            returns: "void",
            desc: "Stops the file watcher.",
          },
        ]}
      />

      {/* Error Logging */}
      <h2 className="mt-12 text-2xl font-bold" id="logging">
        Error Logging
      </h2>
      <CommandList
        commands={[
          {
            name: "get_error_log",
            params: "limit?: number",
            returns: "LogInfo { path, sizeBits, entries[] }",
            desc: "Returns recent error log entries.",
          },
          {
            name: "get_full_log",
            params: "(none)",
            returns: "string",
            desc: "Returns the full log file content.",
          },
          {
            name: "get_log_path",
            params: "(none)",
            returns: "string",
            desc: "Returns the absolute path to the log file.",
          },
          {
            name: "clear_error_log",
            params: "(none)",
            returns: "void",
            desc: "Clears the error log.",
          },
        ]}
      />

      {/* Events */}
      <h2 className="mt-12 text-2xl font-bold" id="events">
        Events
      </h2>
      <p className="mt-3 text-zinc-400">
        The Rust backend emits these events to the frontend via Tauri&apos;s
        event system:
      </p>

      <div className="mt-6 space-y-4">
        {[
          {
            name: "run-update",
            payload: "RunState { runId, status, nodeStates, totalCost }",
            desc: "Emitted on every status change during pipeline execution.",
          },
          {
            name: "node-log",
            payload: "{ runId: string, nodeId: string, line: string }",
            desc: "Emitted for each line of stdout/stderr from an executing node.",
          },
          {
            name: "approval-requested",
            payload: "{ runId: string, nodeId: string, name: string }",
            desc: "Emitted when execution reaches an approval gate, pausing for human input.",
          },
          {
            name: "file-changed",
            payload: '{ kind: "Modify" | "Create" | "Remove", paths: string[] }',
            desc: "Emitted when the file watcher detects changes in .claude/ directories. Debounced at 500ms.",
          },
        ].map((event) => (
          <div
            key={event.name}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
          >
            <div className="flex items-baseline gap-3">
              <code className="text-sm font-bold text-amber-300">{event.name}</code>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{event.desc}</p>
            <div className="mt-3 rounded-lg bg-zinc-800/60 px-3.5 py-2.5">
              <code className="text-xs text-zinc-300">{event.payload}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Database Schema */}
      <h2 className="mt-12 text-2xl font-bold" id="database">
        Database Schema
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow uses SQLite (via SQLx) stored at{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          ~/.cache/com.agentflow.app/agentflow.db
        </code>
      </p>

      <CodeBlock title="runs table" language="sql">
        {`CREATE TABLE runs (
  id TEXT PRIMARY KEY,                -- "run-{timestamp_ms}"
  pipeline_name TEXT NOT NULL,
  started_at TEXT NOT NULL,           -- ISO 8601 UTC
  finished_at TEXT,                   -- NULL until completion
  status TEXT NOT NULL DEFAULT 'running',
  trigger_input TEXT,                 -- JSON string
  resumed_from TEXT,                  -- Original run ID
  failed_node_id TEXT,
  pipeline_hash TEXT                  -- SHA256 of instructions
);`}
      </CodeBlock>

      <CodeBlock title="run_steps table" language="sql">
        {`CREATE TABLE run_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL,
  node_id TEXT NOT NULL,
  node_name TEXT,
  started_at TEXT,
  finished_at TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  exit_code INTEGER,
  log_output TEXT,                    -- Full captured output
  attempt INTEGER DEFAULT 1,
  cost_usd REAL,                     -- NULL for non-AI nodes
  model TEXT,
  approval_state TEXT,               -- "approved" | "rejected"
  instructions_hash TEXT,            -- SHA256 for resume
  FOREIGN KEY (run_id) REFERENCES runs(id)
);`}
      </CodeBlock>
    </div>
  );
}

function CommandList({
  commands,
}: {
  commands: { name: string; params: string; returns: string; desc: string }[];
}) {
  return (
    <div className="mt-4 space-y-3">
      {commands.map((cmd) => (
        <div
          key={cmd.name}
          className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4"
        >
          <div className="flex flex-wrap items-baseline gap-x-2">
            <code className="text-sm font-bold text-indigo-300">{cmd.name}</code>
            <code className="text-xs text-zinc-500">({cmd.params})</code>
            <span className="text-xs text-zinc-600">&rarr;</span>
            <code className="text-xs text-green-400/70">{cmd.returns}</code>
          </div>
          <p className="mt-1.5 text-sm text-zinc-400">{cmd.desc}</p>
        </div>
      ))}
    </div>
  );
}
