import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";
import {
  Cpu,
  Terminal,
  GitBranch,
  LayoutGrid,
  Pause,
  Layers,
  ArrowDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const metadata = {
  title: "Example Pipeline",
  description: "Complete CI/CD pipeline example using all six node types with step-by-step walkthrough, full JSON, and cost breakdown.",
};

export default function ExamplePipelinePage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Example Pipeline" }]} />

      <h1 className="text-3xl font-bold tracking-tight">
        Example: Full CI/CD Pipeline
      </h1>
      <p className="mt-4 text-lg text-zinc-400">
        A practical, end-to-end example using all six node types. This pipeline
        performs AI code review, runs quality checks in parallel, requires human
        approval, and then deploys — with a reusable sub-pipeline for the
        deployment step.
      </p>

      {/* Visual overview */}
      <h2 className="mt-12 text-2xl font-bold" id="overview">
        Pipeline Overview
      </h2>

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
        <div className="space-y-3">
          <FlowNode
            icon={<Cpu className="h-4 w-4 text-indigo-400" />}
            label="1. AI Code Review"
            type="ai-task"
            color="border-indigo-500/30"
          />
          <FlowArrow label="success" />
          <FlowNode
            icon={<LayoutGrid className="h-4 w-4 text-green-400" />}
            label="2. Quality Checks (Parallel)"
            type="parallel"
            color="border-green-500/30"
          />
          <div className="ml-8 space-y-2 border-l-2 border-zinc-700 pl-6">
            <FlowNode
              icon={<Terminal className="h-4 w-4 text-cyan-400" />}
              label="2a. Run Tests"
              type="shell"
              color="border-cyan-500/30"
              small
            />
            <FlowNode
              icon={<Terminal className="h-4 w-4 text-cyan-400" />}
              label="2b. Lint & Type Check"
              type="shell"
              color="border-cyan-500/30"
              small
            />
            <FlowNode
              icon={<Cpu className="h-4 w-4 text-indigo-400" />}
              label="2c. AI Security Scan"
              type="ai-task"
              color="border-indigo-500/30"
              small
            />
          </div>
          <FlowArrow label="all succeed" />
          <FlowNode
            icon={<GitBranch className="h-4 w-4 text-orange-400" />}
            label="3. Commit Changes"
            type="git"
            color="border-orange-500/30"
          />
          <FlowArrow label="success" />
          <FlowNode
            icon={<Pause className="h-4 w-4 text-amber-400" />}
            label="4. Deploy Approval"
            type="approval-gate"
            color="border-amber-500/30"
          />
          <FlowArrow label="approved" />
          <FlowNode
            icon={<Layers className="h-4 w-4 text-violet-400" />}
            label="5. Deploy to Staging"
            type="sub-pipeline"
            color="border-violet-500/30"
          />
          <FlowArrow label="success" />
          <FlowNode
            icon={<Cpu className="h-4 w-4 text-indigo-400" />}
            label="6. Post-Deploy Verification"
            type="ai-task"
            color="border-indigo-500/30"
          />
        </div>
      </div>

      {/* Step-by-step */}
      <h2 className="mt-12 text-2xl font-bold" id="walkthrough">
        Step-by-Step Walkthrough
      </h2>

      {/* Node 1 */}
      <div className="mt-8">
        <NodeHeader
          num="1"
          title="AI Code Review"
          type="ai-task"
          icon={<Cpu className="h-5 w-5 text-indigo-400" />}
        />
        <p className="mt-3 text-zinc-400">
          The pipeline starts by asking Claude to review all staged changes.
          Uses the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">code-reviewer</code> agent
          for consistent review criteria.
        </p>
        <h4 className="mt-4 text-sm font-semibold text-zinc-300">What it does:</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
          <li>Sends all git diff output to Claude with the code-reviewer agent</li>
          <li>Claude analyzes for bugs, security issues, and code quality</li>
          <li>Output is captured in the run log for review</li>
          <li>Cost is tracked (typically $0.01-0.05 depending on diff size)</li>
        </ul>
        <CodeBlock title="Node configuration" language="json">
          {`{
  "id": "node-1",
  "name": "AI Code Review",
  "type": "ai-task",
  "agent": "code-reviewer",
  "instructions": "Review all staged changes in this repository. Focus on bugs, security vulnerabilities, and code quality issues. Report findings grouped by severity.",
  "retry": { "max": 2, "delay": 10 },
  "timeout": 600,
  "inputs": [],
  "outputs": ["review_report"],
  "position": { "x": 300, "y": 0 }
}`}
        </CodeBlock>
        <CodeBlock title="Agent: .claude/agents/code-reviewer.md" language="markdown">
          {`# Code Reviewer

You are a senior engineer performing code review. Analyze all changes for:

1. **Bugs** - Logic errors, null references, race conditions
2. **Security** - Injection, auth bypass, data exposure (OWASP Top 10)
3. **Performance** - N+1 queries, unnecessary allocations, blocking calls

## Output Format
Group findings by severity: Critical > Warning > Info.
For each: file:line - description - suggested fix.`}
        </CodeBlock>
      </div>

      {/* Node 2 */}
      <div className="mt-12">
        <NodeHeader
          num="2"
          title="Quality Checks"
          type="parallel"
          icon={<LayoutGrid className="h-5 w-5 text-green-400" />}
        />
        <p className="mt-3 text-zinc-400">
          Runs three quality checks at the same time. All three must pass for
          the pipeline to continue. This saves ~60% time compared to running
          them sequentially.
        </p>
        <h4 className="mt-4 text-sm font-semibold text-zinc-300">What it does:</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
          <li>Spawns all three children concurrently via Tokio tasks</li>
          <li>Waits for ALL to finish before continuing</li>
          <li>If any child fails, the parallel node fails and the pipeline stops</li>
        </ul>
        <CodeBlock title="Node configuration" language="json">
          {`{
  "id": "node-2",
  "name": "Quality Checks",
  "type": "parallel",
  "instructions": "Run all quality checks concurrently",
  "children": ["node-2a", "node-2b", "node-2c"],
  "inputs": [],
  "outputs": [],
  "position": { "x": 300, "y": 150 }
}`}
        </CodeBlock>

        {/* Child 2a */}
        <div className="mt-6 ml-4 border-l-2 border-zinc-800 pl-6">
          <h4 className="text-lg font-semibold">
            <span className="mr-2 text-cyan-400">2a.</span>Run Tests
            <TypeBadge type="shell" />
          </h4>
          <p className="mt-2 text-sm text-zinc-400">
            Runs the full test suite with coverage. Times out after 5 minutes to
            prevent hanging test runners.
          </p>
          <CodeBlock language="json">
            {`{
  "id": "node-2a",
  "name": "Run Tests",
  "type": "shell",
  "instructions": "npm run test -- --coverage --ci",
  "retry": { "max": 2, "delay": 5 },
  "timeout": 300,
  "inputs": [],
  "outputs": [],
  "position": { "x": 100, "y": 300 }
}`}
          </CodeBlock>
        </div>

        {/* Child 2b */}
        <div className="mt-4 ml-4 border-l-2 border-zinc-800 pl-6">
          <h4 className="text-lg font-semibold">
            <span className="mr-2 text-cyan-400">2b.</span>Lint & Type Check
            <TypeBadge type="shell" />
          </h4>
          <p className="mt-2 text-sm text-zinc-400">
            Runs ESLint and TypeScript type checking in a single bash command.
            Fast and free (no AI cost).
          </p>
          <CodeBlock language="json">
            {`{
  "id": "node-2b",
  "name": "Lint & Type Check",
  "type": "shell",
  "instructions": "npx eslint src/ --max-warnings 0 && npx tsc --noEmit",
  "timeout": 120,
  "inputs": [],
  "outputs": [],
  "position": { "x": 300, "y": 300 }
}`}
          </CodeBlock>
        </div>

        {/* Child 2c */}
        <div className="mt-4 ml-4 border-l-2 border-zinc-800 pl-6">
          <h4 className="text-lg font-semibold">
            <span className="mr-2 text-indigo-400">2c.</span>AI Security Scan
            <TypeBadge type="ai-task" />
          </h4>
          <p className="mt-2 text-sm text-zinc-400">
            Uses Claude with a security-focused agent to do a deeper security
            analysis beyond what the code review catches. Specifically scans for
            OWASP Top 10 vulnerabilities.
          </p>
          <CodeBlock language="json">
            {`{
  "id": "node-2c",
  "name": "AI Security Scan",
  "type": "ai-task",
  "agent": "security-scanner",
  "instructions": "Scan the entire src/ directory for OWASP Top 10 vulnerabilities. Check for SQL injection, XSS, CSRF, insecure deserialization, and secrets in code. Exit with a non-zero status if any critical issues are found.",
  "timeout": 600,
  "inputs": [],
  "outputs": ["security_report"],
  "position": { "x": 500, "y": 300 }
}`}
          </CodeBlock>
        </div>
      </div>

      {/* Node 3 */}
      <div className="mt-12">
        <NodeHeader
          num="3"
          title="Commit Changes"
          type="git"
          icon={<GitBranch className="h-5 w-5 text-orange-400" />}
        />
        <p className="mt-3 text-zinc-400">
          If the AI review prompted any auto-fixes, commit them. Uses pipeline
          variables for the branch name.
        </p>
        <h4 className="mt-4 text-sm font-semibold text-zinc-300">What it does:</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
          <li>Stages all changes, creates a commit with a descriptive message</li>
          <li>Uses the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">${`{BRANCH}`}</code> variable for push target</li>
          <li>Free — git operations have no AI cost</li>
        </ul>
        <CodeBlock title="Node configuration" language="json">
          {`{
  "id": "node-3",
  "name": "Commit Changes",
  "type": "git",
  "instructions": "git add -A && git commit -m 'chore: apply AI review fixes' --allow-empty && git push origin HEAD:\${BRANCH}",
  "timeout": 60,
  "inputs": [],
  "outputs": [],
  "position": { "x": 300, "y": 450 }
}`}
        </CodeBlock>
      </div>

      {/* Node 4 */}
      <div className="mt-12">
        <NodeHeader
          num="4"
          title="Deploy Approval"
          type="approval-gate"
          icon={<Pause className="h-5 w-5 text-amber-400" />}
        />
        <p className="mt-3 text-zinc-400">
          Pauses the pipeline and presents the human operator with a summary of
          everything that happened so far. They can approve to continue to
          deployment or reject to stop.
        </p>
        <h4 className="mt-4 text-sm font-semibold text-zinc-300">What it does:</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
          <li>Emits an <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">approval-requested</code> event to the UI</li>
          <li>Shows the instructions text as a prompt to the operator</li>
          <li>Blocks until the operator clicks Approve or Reject</li>
          <li>Times out after 30 minutes with no response (auto-fails)</li>
        </ul>
        <CodeBlock title="Node configuration" language="json">
          {`{
  "id": "node-4",
  "name": "Deploy Approval",
  "type": "approval-gate",
  "instructions": "Pipeline has completed code review, tests, lint, type check, and security scan. All checks passed. Changes have been committed and pushed to \${BRANCH}.\\n\\nReview the run logs above and approve deployment to \${DEPLOY_ENV}.",
  "timeout": 1800,
  "inputs": [],
  "outputs": [],
  "position": { "x": 300, "y": 600 }
}`}
        </CodeBlock>

        <InfoBox type="tip" title="Resume behavior">
          If you resume this pipeline after it was previously approved, the gate
          is automatically re-approved. You won&apos;t be prompted again.
        </InfoBox>
      </div>

      {/* Node 5 */}
      <div className="mt-12">
        <NodeHeader
          num="5"
          title="Deploy to Staging"
          type="sub-pipeline"
          icon={<Layers className="h-5 w-5 text-violet-400" />}
        />
        <p className="mt-3 text-zinc-400">
          Calls a reusable &quot;deploy-staging&quot; pipeline that handles the actual
          deployment. This pipeline might be shared across multiple parent
          pipelines (e.g., CI/CD, hotfix, rollback).
        </p>
        <h4 className="mt-4 text-sm font-semibold text-zinc-300">What it does:</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
          <li>Loads <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/pipelines/deploy-staging.pipeline.json</code></li>
          <li>Executes it recursively as a full pipeline</li>
          <li>Costs from AI nodes inside the sub-pipeline are aggregated into the parent run</li>
          <li>Circular references are blocked (if deploy-staging calls back to this pipeline)</li>
        </ul>
        <CodeBlock title="Node configuration" language="json">
          {`{
  "id": "node-5",
  "name": "Deploy to Staging",
  "type": "sub-pipeline",
  "instructions": "Execute the staging deployment pipeline",
  "pipeline_ref": "deploy-staging",
  "inputs": [],
  "outputs": [],
  "position": { "x": 300, "y": 750 }
}`}
        </CodeBlock>
        <CodeBlock title="Referenced: deploy-staging.pipeline.json (simplified)" language="json">
          {`{
  "name": "deploy-staging",
  "description": "Build and deploy to staging environment",
  "version": "1.0.0",
  "variables": {},
  "nodes": [
    {
      "id": "ds-1", "name": "Build", "type": "shell",
      "instructions": "npm run build",
      "position": { "x": 250, "y": 0 }
    },
    {
      "id": "ds-2", "name": "Deploy", "type": "shell",
      "instructions": "npx deploy --env staging",
      "timeout": 300,
      "position": { "x": 250, "y": 150 }
    }
  ],
  "edges": [
    { "id": "ds-e1", "from": "ds-1", "to": "ds-2", "condition": "success" }
  ]
}`}
        </CodeBlock>
      </div>

      {/* Node 6 */}
      <div className="mt-12">
        <NodeHeader
          num="6"
          title="Post-Deploy Verification"
          type="ai-task"
          icon={<Cpu className="h-5 w-5 text-indigo-400" />}
        />
        <p className="mt-3 text-zinc-400">
          After deployment, uses Claude to verify the staging environment is
          healthy — checking API endpoints, checking logs for errors, and
          confirming the new code is live.
        </p>
        <CodeBlock title="Node configuration" language="json">
          {`{
  "id": "node-6",
  "name": "Post-Deploy Verification",
  "type": "ai-task",
  "instructions": "The staging deployment just completed. Verify the deployment by:\\n1. Checking the health endpoint at \${STAGING_URL}/health\\n2. Running a quick smoke test of the main user flows\\n3. Checking application logs for any new errors\\n\\nReport pass/fail with details.",
  "timeout": 300,
  "inputs": [],
  "outputs": ["verification_report"],
  "position": { "x": 300, "y": 900 }
}`}
        </CodeBlock>
      </div>

      {/* Full Pipeline JSON */}
      <h2 className="mt-16 text-2xl font-bold" id="full-json">
        Complete Pipeline JSON
      </h2>
      <p className="mt-3 text-zinc-400">
        Here&apos;s the full pipeline file you can save as{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          .claude/pipelines/full-ci-cd.pipeline.json
        </code>:
      </p>

      <CodeBlock title="full-ci-cd.pipeline.json" language="json">
        {`{
  "name": "Full CI/CD",
  "description": "AI code review, parallel quality checks, approval gate, and staged deployment",
  "version": "1.0.0",
  "variables": {
    "BRANCH": "feature/my-changes",
    "DEPLOY_ENV": "staging",
    "STAGING_URL": "https://staging.example.com"
  },
  "nodes": [
    {
      "id": "node-1",
      "name": "AI Code Review",
      "type": "ai-task",
      "agent": "code-reviewer",
      "instructions": "Review all staged changes. Focus on bugs, security, and code quality.",
      "retry": { "max": 2, "delay": 10 },
      "timeout": 600,
      "inputs": [],
      "outputs": ["review_report"],
      "position": { "x": 300, "y": 0 }
    },
    {
      "id": "node-2",
      "name": "Quality Checks",
      "type": "parallel",
      "instructions": "Run all quality checks concurrently",
      "children": ["node-2a", "node-2b", "node-2c"],
      "inputs": [],
      "outputs": [],
      "position": { "x": 300, "y": 150 }
    },
    {
      "id": "node-2a",
      "name": "Run Tests",
      "type": "shell",
      "instructions": "npm run test -- --coverage --ci",
      "retry": { "max": 2, "delay": 5 },
      "timeout": 300,
      "inputs": [],
      "outputs": [],
      "position": { "x": 100, "y": 300 }
    },
    {
      "id": "node-2b",
      "name": "Lint & Type Check",
      "type": "shell",
      "instructions": "npx eslint src/ --max-warnings 0 && npx tsc --noEmit",
      "timeout": 120,
      "inputs": [],
      "outputs": [],
      "position": { "x": 300, "y": 300 }
    },
    {
      "id": "node-2c",
      "name": "AI Security Scan",
      "type": "ai-task",
      "agent": "security-scanner",
      "instructions": "Scan src/ for OWASP Top 10 vulnerabilities. Exit non-zero if critical issues found.",
      "timeout": 600,
      "inputs": [],
      "outputs": ["security_report"],
      "position": { "x": 500, "y": 300 }
    },
    {
      "id": "node-3",
      "name": "Commit Changes",
      "type": "git",
      "instructions": "git add -A && git commit -m 'chore: apply AI review fixes' --allow-empty && git push origin HEAD:\${BRANCH}",
      "timeout": 60,
      "inputs": [],
      "outputs": [],
      "position": { "x": 300, "y": 450 }
    },
    {
      "id": "node-4",
      "name": "Deploy Approval",
      "type": "approval-gate",
      "instructions": "All checks passed. Approve deployment to \${DEPLOY_ENV}?",
      "timeout": 1800,
      "inputs": [],
      "outputs": [],
      "position": { "x": 300, "y": 600 }
    },
    {
      "id": "node-5",
      "name": "Deploy to Staging",
      "type": "sub-pipeline",
      "instructions": "Execute staging deployment",
      "pipeline_ref": "deploy-staging",
      "inputs": [],
      "outputs": [],
      "position": { "x": 300, "y": 750 }
    },
    {
      "id": "node-6",
      "name": "Post-Deploy Verification",
      "type": "ai-task",
      "instructions": "Verify staging deployment at \${STAGING_URL}. Check health, smoke test, and logs.",
      "timeout": 300,
      "inputs": [],
      "outputs": ["verification_report"],
      "position": { "x": 300, "y": 900 }
    }
  ],
  "edges": [
    { "id": "e1", "from": "node-1", "to": "node-2", "condition": "success" },
    { "id": "e2", "from": "node-2", "to": "node-3", "condition": "success" },
    { "id": "e3", "from": "node-3", "to": "node-4", "condition": "success" },
    { "id": "e4", "from": "node-4", "to": "node-5" },
    { "id": "e5", "from": "node-5", "to": "node-6", "condition": "success" }
  ]
}`}
      </CodeBlock>

      {/* Cost breakdown */}
      <h2 className="mt-12 text-2xl font-bold" id="cost">
        Expected Cost Breakdown
      </h2>
      <p className="mt-3 text-zinc-400">
        Here&apos;s a typical cost breakdown for one run of this pipeline:
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Node</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Type</th>
              <th className="px-4 py-2.5 text-right font-medium text-zinc-300">Cost</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ["AI Code Review", "ai-task", "$0.02 - $0.08"],
              ["Run Tests", "shell", "Free"],
              ["Lint & Type Check", "shell", "Free"],
              ["AI Security Scan", "ai-task", "$0.01 - $0.05"],
              ["Commit Changes", "git", "Free"],
              ["Deploy Approval", "approval-gate", "Free"],
              ["Deploy (sub-pipeline)", "sub-pipeline", "Free (shell only)"],
              ["Post-Deploy Verification", "ai-task", "$0.01 - $0.03"],
            ].map(([node, type, cost]) => (
              <tr key={node} className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5">{node}</td>
                <td className="px-4 py-2.5">
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    {type}
                  </code>
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-200">
                  {cost}
                </td>
              </tr>
            ))}
            <tr className="bg-zinc-900/40">
              <td className="px-4 py-2.5 font-bold text-zinc-200" colSpan={2}>
                Total per run
              </td>
              <td className="px-4 py-2.5 text-right font-bold text-indigo-400">
                ~$0.04 - $0.16
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <InfoBox type="tip" title="Cost savings with resume">
        If this pipeline fails at step 4 (rejected) and you re-run it after
        making changes, the resume feature skips the AI Code Review and AI
        Security Scan if the code hasn&apos;t changed — saving the bulk of the
        cost.
      </InfoBox>

      {/* Failure scenarios */}
      <h2 className="mt-12 text-2xl font-bold" id="failure">
        Failure Scenarios
      </h2>

      <div className="mt-6 space-y-4">
        {[
          {
            scenario: "Tests fail (node 2a)",
            behavior:
              'The parallel node fails because a child failed. Nodes 3-6 are skipped. Fix the failing test and resume — the AI nodes from step 1 are reused if instructions haven\'t changed.',
            icon: <XCircle className="h-4 w-4 text-red-400" />,
          },
          {
            scenario: "Approval rejected (node 4)",
            behavior:
              "The approval gate fails with approval_state: \"rejected\". The pipeline stops. Review the logs, make changes, and run a new pipeline.",
            icon: <XCircle className="h-4 w-4 text-red-400" />,
          },
          {
            scenario: "AI task times out (node 1)",
            behavior:
              "The Claude CLI process is killed after 600 seconds. Retry policy kicks in — the command is re-run up to 2 times with 10-second delays.",
            icon: <XCircle className="h-4 w-4 text-red-400" />,
          },
          {
            scenario: "Sub-pipeline deploy fails (node 5)",
            behavior:
              "The error propagates up. The parent pipeline records the sub-pipeline failure. Resume re-runs only the sub-pipeline, not the parent nodes.",
            icon: <XCircle className="h-4 w-4 text-red-400" />,
          },
        ].map((item) => (
          <div
            key={item.scenario}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <h3 className="font-semibold text-zinc-200">{item.scenario}</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{item.behavior}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowNode({
  icon,
  label,
  type,
  color,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border ${color} bg-zinc-800/40 ${
        small ? "px-4 py-2.5" : "px-5 py-3.5"
      }`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
        {icon}
      </div>
      <span className={`font-medium text-zinc-200 ${small ? "text-sm" : ""}`}>
        {label}
      </span>
      <TypeBadge type={type} />
    </div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pl-8">
      <ArrowDown className="h-4 w-4 text-zinc-600" />
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    "ai-task": "bg-indigo-500/10 text-indigo-400",
    shell: "bg-cyan-500/10 text-cyan-400",
    git: "bg-orange-500/10 text-orange-400",
    parallel: "bg-green-500/10 text-green-400",
    "approval-gate": "bg-amber-500/10 text-amber-400",
    "sub-pipeline": "bg-violet-500/10 text-violet-400",
  };

  return (
    <span
      className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colors[type] || "bg-zinc-800 text-zinc-400"
      }`}
    >
      {type}
    </span>
  );
}

function NodeHeader({
  num,
  title,
  type,
  icon,
}: {
  num: string;
  title: string;
  type: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">
          <span className="text-zinc-500">#{num}</span> {title}
        </h3>
        <TypeBadge type={type} />
      </div>
    </div>
  );
}
