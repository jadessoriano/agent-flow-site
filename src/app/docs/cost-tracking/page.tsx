import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Cost Tracking",
  description: "AI token cost monitoring, available metrics, cost dashboard, usage statistics, and cost optimization with resume.",
};

export default function CostTrackingPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Cost Tracking" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Cost Tracking</h1>
      <p className="mt-4 text-lg text-zinc-400">
        AgentFlow automatically tracks Claude API token costs per node, per
        pipeline, and across your team. Monitor spend over time and optimize
        your workflows.
      </p>

      {/* How It Works */}
      <h2 className="mt-12 text-2xl font-bold" id="how">
        How Costs Are Captured
      </h2>
      <p className="mt-3 text-zinc-400">
        Only <strong>AI Task</strong> nodes incur token costs. When Claude CLI
        finishes executing, it prints cost information to stderr. AgentFlow
        parses this automatically.
      </p>

      <CodeBlock title="Cost extraction patterns" language="text">
        {`# AgentFlow scans Claude CLI stderr for these patterns:

"Total cost: $0.0342"
"total_cost_usd: 0.0342"

# The extracted value is stored as a REAL (float) in:
# run_steps.cost_usd`}
      </CodeBlock>

      <InfoBox type="info">
        Shell, Git, Parallel, Loop, Approval Gate, and Sub-pipeline nodes do
        not have direct costs. Sub-pipeline and Loop costs are the sum of all
        AI Task nodes within them. Loop costs are multiplied by the number of
        iterations.
      </InfoBox>

      {/* Metrics */}
      <h2 className="mt-12 text-2xl font-bold" id="metrics">
        Available Metrics
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          {
            label: "Total Cost",
            desc: "Sum of all cost_usd across all runs",
            query: "SUM(cost_usd) FROM run_steps",
          },
          {
            label: "Cost per Run",
            desc: "Total cost grouped by run_id",
            query: "SUM(cost_usd) GROUP BY run_id",
          },
          {
            label: "Avg Cost per Run",
            desc: "Total cost divided by number of runs",
            query: "total_cost / COUNT(runs)",
          },
          {
            label: "Avg Cost per AI Step",
            desc: "Total divided by AI steps with cost > 0",
            query: "total / COUNT(WHERE cost_usd > 0)",
          },
          {
            label: "Top 10 Expensive Nodes",
            desc: "Nodes ranked by cost",
            query: "ORDER BY cost_usd DESC LIMIT 10",
          },
          {
            label: "Top 10 Expensive Pipelines",
            desc: "Pipelines ranked by total cost",
            query: "GROUP BY pipeline_name ORDER BY SUM",
          },
          {
            label: "Avg Run Duration",
            desc: "Average time from start to finish",
            query: "AVG(finished_at - started_at)",
          },
          {
            label: "Run Count per Pipeline",
            desc: "How many times each pipeline has been run",
            query: "COUNT(*) GROUP BY pipeline_name",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4"
          >
            <h3 className="font-semibold text-zinc-200">{m.label}</h3>
            <p className="mt-1 text-sm text-zinc-400">{m.desc}</p>
            <code className="mt-2 block text-xs text-zinc-500">{m.query}</code>
          </div>
        ))}
      </div>

      {/* Cost Dashboard */}
      <h2 className="mt-12 text-2xl font-bold" id="dashboard">
        Cost Dashboard
      </h2>
      <p className="mt-3 text-zinc-400">
        The Cost Dashboard panel in AgentFlow shows a comprehensive overview of
        your AI spending:
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>
          <strong className="text-zinc-200">Summary cards:</strong> Total cost, total runs, total AI
          steps, average cost per run, average cost per AI step, average
          duration
        </li>
        <li>
          <strong className="text-zinc-200">Run breakdown:</strong> Each run listed with pipeline name,
          status, cost, and duration
        </li>
        <li>
          <strong className="text-zinc-200">Top nodes:</strong> The 10 most expensive individual node
          executions
        </li>
        <li>
          <strong className="text-zinc-200">Top pipelines:</strong> The 10 most expensive pipelines by
          cumulative cost
        </li>
      </ul>

      {/* Budget Limits */}
      <h2 className="mt-12 text-2xl font-bold" id="budget">
        Budget Limits
      </h2>
      <p className="mt-3 text-zinc-400">
        Set a maximum cost per pipeline run. When the accumulated cost exceeds
        the budget, execution halts automatically — no more nodes are started.
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>Configure budget in the <strong className="text-zinc-200">Pipeline Settings</strong> panel</li>
        <li>Budget is checked after each AI Task node completes</li>
        <li>Remaining nodes are marked as <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">cancelled</code> when the budget is exceeded</li>
        <li>The run is recorded with a budget-exceeded status for review</li>
      </ul>

      {/* Pre-Run Cost Estimates */}
      <h2 className="mt-12 text-2xl font-bold" id="estimates">
        Pre-Run Cost Estimates
      </h2>
      <p className="mt-3 text-zinc-400">
        Before starting a pipeline run, AgentFlow estimates the total cost based
        on historical per-node averages from previous executions. This helps you
        decide whether to proceed or adjust the pipeline.
      </p>

      <InfoBox type="tip">
        Cost estimates improve with more historical data. After 3-5 runs of the
        same pipeline, estimates become reliable enough for budget planning.
      </InfoBox>

      {/* Loop-Aware Cost Estimation */}
      <h2 className="mt-12 text-2xl font-bold" id="loop-cost">
        Loop-Aware Cost Estimation
      </h2>
      <p className="mt-3 text-zinc-400">
        Pre-run cost estimates account for loop iteration counts. When a loop
        node contains AI Task children, the estimated cost is multiplied by the
        expected number of iterations.
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>The iteration count is determined from the loop&apos;s instructions (number of items in the list)</li>
        <li>Child AI Task costs are multiplied by the iteration count</li>
        <li>Setting <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">max_iterations</code> caps the estimated cost even if the list is longer</li>
        <li>Actual costs may differ if iterations fail early or are skipped</li>
      </ul>

      {/* Per-Node Model Selection */}
      <h2 className="mt-12 text-2xl font-bold" id="model-selection">
        Per-Node Model Selection
      </h2>
      <p className="mt-3 text-zinc-400">
        Each AI Task node can be configured to use a specific Claude model,
        letting you optimize cost vs. capability per step:
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li><strong className="text-zinc-200">Opus:</strong> Most capable, best for complex reasoning and code generation</li>
        <li><strong className="text-zinc-200">Sonnet:</strong> Balanced performance and cost for general tasks</li>
        <li><strong className="text-zinc-200">Haiku:</strong> Fastest and cheapest, ideal for simple classification or formatting</li>
      </ul>
      <p className="mt-4 text-sm text-zinc-400">
        Set the model in the node configuration panel. If unset, the node uses
        the pipeline-level or global default model.
      </p>

      {/* Output Caching */}
      <h2 className="mt-12 text-2xl font-bold" id="caching">
        Output Caching
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow can skip re-execution of nodes whose instructions haven&apos;t
        changed since their last successful run. This saves both time and tokens
        during iterative pipeline development.
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>Instruction hashes (SHA-256) are compared against the most recent cached step</li>
        <li>If the hash matches a successful prior step, the cached result is reused</li>
        <li>Cached steps show <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">cost_usd = 0</code> in the current run</li>
        <li>Database indexes on <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">run_steps</code> ensure fast cache lookups</li>
      </ul>

      {/* IPC Commands */}
      <h2 className="mt-12 text-2xl font-bold" id="api">
        IPC Commands
      </h2>

      <div className="mt-4 space-y-4">
        {[
          {
            cmd: "get_cost_summary()",
            ret: "{ totalCost: number, runs: CostRun[] }",
            desc: "Returns total cost and per-run cost breakdown.",
          },
          {
            cmd: "get_usage_stats()",
            ret: "UsageStats",
            desc: "Comprehensive statistics: total cost, run counts, averages, top nodes, top pipelines.",
          },
          {
            cmd: "get_avg_ai_cost()",
            ret: "number | null",
            desc: "Returns the average cost per AI task execution across all runs.",
          },
        ].map((item) => (
          <div
            key={item.cmd}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <code className="text-sm font-medium text-indigo-300">
              {item.cmd}
            </code>
            <span className="ml-2 text-xs text-zinc-500">
              &rarr; {item.ret}
            </span>
            <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* UsageStats type */}
      <h2 className="mt-12 text-2xl font-bold" id="types">
        UsageStats Type
      </h2>

      <CodeBlock title="UsageStats interface" language="typescript">
        {`interface UsageStats {
  totalCost: number;            // Sum of all AI task costs
  totalRuns: number;            // Total pipeline executions
  totalAiSteps: number;         // Total AI task node executions
  avgCostPerRun: number;        // totalCost / totalRuns
  avgCostPerAiStep: number;     // totalCost / totalAiSteps
  avgDurationSecs: number;      // Average run duration in seconds

  runs: {
    runId: string;
    pipelineName: string;
    status: string;
    cost: number;
    durationSecs: number;
    startedAt: string;          // ISO 8601
  }[];

  topNodes: {
    nodeId: string;
    nodeName: string;
    runId: string;
    cost: number;
  }[];

  topPipelines: {
    pipelineName: string;
    totalCost: number;
    runCount: number;
  }[];
}`}
      </CodeBlock>

      {/* Resume and Cost */}
      <h2 className="mt-12 text-2xl font-bold" id="resume-cost">
        Cost & Resume
      </h2>
      <p className="mt-3 text-zinc-400">
        When resuming a failed pipeline:
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>Previously successful steps are reused (not re-executed), so they incur <strong>zero additional cost</strong></li>
        <li>Reused steps retain their original <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">cost_usd</code> in the new run record</li>
        <li>Only newly executed nodes incur fresh costs</li>
        <li>The new run&apos;s total cost includes both reused and new costs</li>
      </ul>

      <InfoBox type="tip" title="Cost optimization">
        Use the Cost Dashboard to identify your most expensive nodes and
        pipelines. Consider breaking large AI tasks into smaller, focused steps
        to reduce per-invocation token usage.
      </InfoBox>
    </div>
  );
}
