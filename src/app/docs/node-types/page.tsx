import { Breadcrumb, CodeBlock, InfoBox, PropTable } from "@/components/docs-layout";

export const metadata = {
  title: "Node Types",
  description: "All eight AgentFlow node types: AI Task, Shell, Git, Parallel, Loop, Approval Gate, Sub-pipeline, and Comment with configuration details.",
};

export default function NodeTypesPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Node Types" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Node Types</h1>
      <p className="mt-4 text-lg text-zinc-400">
        AgentFlow provides eight node types that can be combined to build any
        workflow — from simple automation to complex multi-stage pipelines with
        loops, human oversight, and more.
      </p>

      {/* AI Task */}
      <h2 className="mt-12 text-2xl font-bold" id="ai-task">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-indigo-500" />
        AI Task
      </h2>
      <p className="mt-3 text-zinc-400">
        Executes Claude Code CLI with custom instructions. This is the primary
        node for AI-powered code generation, review, refactoring, and analysis.
      </p>

      <PropTable
        items={[
          { name: "instructions", type: "string", required: true, description: "The prompt sent to Claude. Supports variable substitution and {output.NODE_ID} references." },
          { name: "agent", type: "string", description: "Agent name referencing .claude/agents/{name}.md for system instructions." },
          { name: "model", type: "string", description: 'Claude model override for this node: "opus", "sonnet", or "haiku". Defaults to pipeline/global setting.' },
          { name: "requires_tools", type: "string[]", description: "MCP tools that must be available for this task." },
          { name: "retry", type: "{ max, delay }", description: "Retry policy for failed invocations." },
          { name: "timeout", type: "number", description: "Max execution time in seconds." },
        ]}
      />

      <CodeBlock title="How AI Task executes" language="bash">
        {`# With agent:
claude --agent code-reviewer --print "Review changed files for security issues"

# Without agent:
claude --print "Generate unit tests for src/utils.ts"

# Cost is extracted from Claude CLI stderr:
# Looks for "Total cost: $X.XX" or "total_cost_usd: X.XX"`}
      </CodeBlock>

      <InfoBox type="info">
        AI Task is the only node type that incurs token costs. Costs are
        automatically parsed from the Claude CLI output and stored in the
        database for tracking. Output caching can skip re-execution if the
        node&apos;s instructions haven&apos;t changed since the last successful run.
      </InfoBox>

      {/* Shell Command */}
      <h2 className="mt-12 text-2xl font-bold" id="shell">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-cyan-500" />
        Shell Command
      </h2>
      <p className="mt-3 text-zinc-400">
        Executes any bash command. Use for running tests, building projects,
        linting, deploying, or any CLI operation.
      </p>

      <PropTable
        items={[
          { name: "instructions", type: "string", required: true, description: "The bash command to execute." },
          { name: "retry", type: "{ max, delay }", description: "Retry on non-zero exit code." },
          { name: "timeout", type: "number", description: "Kill process after N seconds." },
        ]}
      />

      <CodeBlock title="Execution" language="bash">
        {`# Commands run via:
bash -c "{instructions}"

# stdout and stderr are streamed to the live log viewer
# Exit code 0 = success, non-zero = failure`}
      </CodeBlock>

      <CodeBlock title="Examples" language="text">
        {`npm run test -- --coverage
cargo build --release
docker compose up -d
eslint src/ --fix`}
      </CodeBlock>

      {/* Git Operation */}
      <h2 className="mt-12 text-2xl font-bold" id="git">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-orange-500" />
        Git Operation
      </h2>
      <p className="mt-3 text-zinc-400">
        Runs git commands as part of your pipeline. Functionally identical to
        Shell but semantically distinct for clarity on the canvas.
      </p>

      <PropTable
        items={[
          { name: "instructions", type: "string", required: true, description: "The git command to execute." },
          { name: "retry", type: "{ max, delay }", description: "Retry on failure." },
          { name: "timeout", type: "number", description: "Max execution time." },
        ]}
      />

      <CodeBlock title="Examples" language="text">
        {`git checkout -b feature/auto-fixes
git add -A && git commit -m "feat: AI-generated changes"
git push origin HEAD
git merge origin/main --no-edit`}
      </CodeBlock>

      {/* Parallel */}
      <h2 className="mt-12 text-2xl font-bold" id="parallel">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-green-500" />
        Parallel
      </h2>
      <p className="mt-3 text-zinc-400">
        A container node that runs all its children simultaneously and waits for
        every child to complete before continuing.
      </p>

      <PropTable
        items={[
          { name: "children", type: "string[]", required: true, description: "Array of child node IDs to run concurrently." },
          { name: "instructions", type: "string", description: "Optional description (not executed)." },
        ]}
      />

      <CodeBlock title="Behavior" language="text">
        {`1. All child nodes are spawned concurrently via tokio::task::JoinSet
2. Results are processed in completion order (not spawn order)
3. Execution blocks until ALL children complete
4. Status = "success" only if ALL children succeed
5. Status = "failed" if ANY child fails
6. Individual child status is tracked separately`}
      </CodeBlock>

      <CodeBlock title="Example: parallel testing" language="json">
        {`{
  "id": "node-parallel",
  "name": "Run All Checks",
  "type": "parallel",
  "instructions": "Run lint, test, and type-check in parallel",
  "children": ["node-lint", "node-test", "node-typecheck"],
  "inputs": [],
  "outputs": [],
  "position": { "x": 250, "y": 150 }
}`}
      </CodeBlock>

      {/* Loop */}
      <h2 className="mt-12 text-2xl font-bold" id="loop">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-pink-500" />
        Loop
      </h2>
      <p className="mt-3 text-zinc-400">
        Iterates over a list of items, executing child steps for each one.
        Supports configurable separators (newline, comma, custom), max iteration
        caps, and injects per-item variables into child node instructions.
      </p>

      <PropTable
        items={[
          { name: "instructions", type: "string", required: true, description: "The list of items to iterate over, or an expression that produces a list." },
          { name: "children", type: "string[]", required: true, description: "Array of child node IDs to execute for each loop item." },
          { name: "loop_config", type: "LoopConfig", description: "Configuration for loop behavior (separator, max iterations, timeout, model)." },
          { name: "retry", type: "{ max, delay }", description: "Retry policy for the entire loop." },
          { name: "timeout", type: "number", description: "Max execution time for the entire loop." },
        ]}
      />

      <CodeBlock title="Loop configuration" language="json">
        {`{
  "loop_config": {
    "separator": "newline",   // "newline" | "comma" | custom string
    "max_iterations": 100,    // Cap iterations (1-1000)
    "timeout": 600,           // Per-loop timeout in seconds
    "model": "sonnet"         // Model override for AI children
  }
}`}
      </CodeBlock>

      <CodeBlock title="Loop variables injected per iteration" language="text">
        {`$LOOP_ITEM   — The current item from the list
$LOOP_INDEX  — Zero-based index of the current iteration
$LOOP_COUNT  — Total number of items in the list

# Example: if instructions = "file1.ts\\nfile2.ts\\nfile3.ts"
# Iteration 0: $LOOP_ITEM="file1.ts", $LOOP_INDEX=0, $LOOP_COUNT=3
# Iteration 1: $LOOP_ITEM="file2.ts", $LOOP_INDEX=1, $LOOP_COUNT=3
# Iteration 2: $LOOP_ITEM="file3.ts", $LOOP_INDEX=2, $LOOP_COUNT=3`}
      </CodeBlock>

      <CodeBlock title="Example: review each changed file" language="json">
        {`{
  "id": "node-loop",
  "name": "Review Each File",
  "type": "loop",
  "instructions": "src/auth.ts\\nsrc/api.ts\\nsrc/db.ts",
  "children": ["node-review"],
  "loop_config": {
    "separator": "newline",
    "max_iterations": 50
  },
  "inputs": [],
  "outputs": [],
  "position": { "x": 250, "y": 150 }
}`}
      </CodeBlock>

      <InfoBox type="tip" title="Loop-aware cost estimation">
        Pre-run cost estimates account for loop iterations — the estimated cost
        of child AI Task nodes is multiplied by the expected iteration count.
        Set <code>max_iterations</code> to cap both runtime and estimated cost.
      </InfoBox>

      <InfoBox type="info">
        Loop nodes use Arc-wrapped read-only data for parallel child spawns,
        eliminating deep-clone overhead. Results are processed in completion
        order via Tokio JoinSet for maximum throughput.
      </InfoBox>

      {/* Approval Gate */}
      <h2 className="mt-12 text-2xl font-bold" id="approval-gate">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-amber-500" />
        Approval Gate
      </h2>
      <p className="mt-3 text-zinc-400">
        Pauses pipeline execution and waits for a human to approve or reject
        before continuing. Essential for production deployments and sensitive
        operations.
      </p>

      <PropTable
        items={[
          { name: "instructions", type: "string", required: true, description: "Message shown to the approver explaining what they're approving." },
          { name: "timeout", type: "number", description: "Auto-fail if no response after N seconds." },
        ]}
      />

      <CodeBlock title="Behavior" language="text">
        {`1. Node enters "running" state
2. Emits "approval-requested" event: { runId, nodeId, name }
3. UI shows approval dialog with the node instructions
4. Blocks until respond_to_approval(approved: bool) is called
5. If approved → status "success", approval_state "approved"
6. If rejected → status "failed", approval_state "rejected"
7. If timeout → status "failed" (no approval received)`}
      </CodeBlock>

      <InfoBox type="tip" title="Resume behavior">
        When resuming a failed pipeline, approval gates that were previously
        approved are automatically re-approved — you won&apos;t be asked again
        for steps that already passed.
      </InfoBox>

      {/* Sub-pipeline */}
      <h2 className="mt-12 text-2xl font-bold" id="sub-pipeline">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-violet-500" />
        Sub-pipeline
      </h2>
      <p className="mt-3 text-zinc-400">
        References and executes another saved pipeline. Enables composable,
        reusable workflow modules.
      </p>

      <PropTable
        items={[
          { name: "pipeline_ref", type: "string", required: true, description: "Name of the pipeline to execute (matches filename without .pipeline.json)." },
          { name: "instructions", type: "string", description: "Optional description." },
        ]}
      />

      <CodeBlock title="Behavior" language="text">
        {`1. Loads {project}/.claude/pipelines/{pipeline_ref}.pipeline.json
2. Executes the full pipeline recursively (run_pipeline_loop)
3. Circular references are detected and blocked:
   - Ancestor pipeline names are tracked through the chain
   - If pipeline_ref appears in ancestors → error
4. Cost is aggregated from all nodes in the sub-pipeline
5. Sub-pipeline success/failure propagates to parent`}
      </CodeBlock>

      <CodeBlock title="Example" language="json">
        {`{
  "id": "node-deploy",
  "name": "Deploy to Staging",
  "type": "sub-pipeline",
  "instructions": "Execute the staging deployment pipeline",
  "pipeline_ref": "deploy-staging",
  "inputs": [],
  "outputs": [],
  "position": { "x": 250, "y": 300 }
}`}
      </CodeBlock>

      <InfoBox type="warning" title="Validation">
        Sub-pipeline nodes <strong>must</strong> have <code>pipeline_ref</code>{" "}
        set. The referenced pipeline must exist at execution time. Circular
        references (A calls B which calls A) are caught and result in a
        validation error.
      </InfoBox>

      {/* Comment */}
      <h2 className="mt-12 text-2xl font-bold" id="comment">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-zinc-500" />
        Comment
      </h2>
      <p className="mt-3 text-zinc-400">
        A non-executing annotation node for documenting pipeline sections,
        leaving notes for teammates, and organizing complex workflows visually.
        Comment nodes are completely ignored during execution.
      </p>

      <PropTable
        items={[
          { name: "instructions", type: "string", required: true, description: "The comment text displayed on the canvas." },
        ]}
      />

      <CodeBlock title="Example" language="json">
        {`{
  "id": "node-comment-1",
  "name": "Deployment Notes",
  "type": "comment",
  "instructions": "This section handles the staging deployment. Requires VPN access and valid AWS credentials.",
  "inputs": [],
  "outputs": [],
  "position": { "x": 50, "y": 600 }
}`}
      </CodeBlock>

      <InfoBox type="info">
        Comment nodes have no edges, no execution logic, and no cost. They exist
        purely for documentation on the canvas. Use them to annotate complex
        pipeline sections or leave notes for your team.
      </InfoBox>

      {/* Common Properties */}
      <h2 className="mt-12 text-2xl font-bold" id="common">
        Common Properties
      </h2>
      <p className="mt-3 text-zinc-400">
        All node types share these properties:
      </p>

      <h3 className="mt-6 text-lg font-semibold">Retry Policy</h3>
      <CodeBlock language="json">
        {`{
  "retry": {
    "max": 3,    // Maximum number of attempts (1 = no retries)
    "delay": 10  // Seconds to wait between retries
  }
}`}
      </CodeBlock>
      <p className="mt-2 text-sm text-zinc-400">
        Each attempt is tracked in the database with its own{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">attempt</code>{" "}
        number, exit code, and log output.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Timeout</h3>
      <CodeBlock language="json">
        {`{
  "timeout": 300  // Kill process after 300 seconds (5 minutes)
}`}
      </CodeBlock>
      <p className="mt-2 text-sm text-zinc-400">
        When a timeout fires, the process receives SIGTERM. If it doesn&apos;t
        exit within a grace period, SIGKILL is sent.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Execution Status</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Status</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Meaning</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ["pending", "Not yet reached in execution order"],
              ["running", "Currently executing"],
              ["success", "Completed with exit code 0 (or approved)"],
              ["failed", "Non-zero exit, timeout, rejection, or error"],
              ["skipped", "Conditional edge not satisfied"],
              ["cancelled", "Pipeline was cancelled by user"],
            ].map(([status, meaning]) => (
              <tr key={status} className="border-b border-zinc-800/50">
                <td className="px-4 py-2">
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    {status}
                  </code>
                </td>
                <td className="px-4 py-2">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
