import { Breadcrumb, CodeBlock, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Best Practices",
  description: "Tips for keeping costs low, designing effective pipelines, writing agents, team collaboration, and debugging.",
};

export default function BestPracticesPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Best Practices" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Best Practices</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Tips for using AgentFlow effectively, keeping costs low, and building
        reliable pipelines.
      </p>

      {/* Cost Optimization */}
      <h2 className="mt-12 text-2xl font-bold" id="cost">
        Keeping Costs Low
      </h2>

      <div className="mt-6 space-y-5">
        <Tip
          title="Break large AI tasks into focused steps"
          desc="Instead of one big prompt that does everything, split work into smaller, targeted nodes. Each invocation uses fewer tokens and is easier to debug."
          example={`# Instead of:
"Review code, fix bugs, add tests, and update docs"

# Use 4 separate AI Task nodes:
1. "Review code for bugs"
2. "Fix the identified bugs"
3. "Generate unit tests for changed files"
4. "Update documentation for new APIs"`}
        />

        <Tip
          title="Use Shell nodes for non-AI work"
          desc="Don't use AI Task nodes for things that bash can do. Running tests, building projects, linting — all of these are free as Shell nodes."
          example={`# Free (Shell node):
npm run test -- --coverage

# Costs tokens (AI Task node):
"Run the test suite and tell me if anything fails"
# The AI would just run the same command anyway!`}
        />

        <Tip
          title="Write specific, concise instructions"
          desc="Vague prompts cause Claude to produce more output (more tokens). Be direct about what you want."
          example={`# Expensive (vague):
"Look at the codebase and suggest improvements"

# Cheaper (specific):
"Review src/auth.ts for SQL injection vulnerabilities.
List any found as: file:line - description"`}
        />

        <Tip
          title="Use the Cost Dashboard to identify expensive nodes"
          desc="Check the Top Nodes and Top Pipelines views regularly. If one node consistently costs more than expected, refine its instructions or split it."
        />

        <Tip
          title="Leverage resume instead of full re-runs"
          desc="When a pipeline fails partway through, use Resume instead of re-running from scratch. Successfully completed AI nodes are reused at zero additional cost."
        />

        <Tip
          title="Use agents to reduce repetition"
          desc="If multiple AI nodes share system instructions, create an agent with the common context. This avoids repeating the same context in every node's instructions."
        />
      </div>

      {/* Pipeline Design */}
      <h2 className="mt-16 text-2xl font-bold" id="pipeline-design">
        Pipeline Design
      </h2>

      <div className="mt-6 space-y-5">
        <Tip
          title="Use conditional edges for error handling"
          desc='Add "failure" edges to create fallback paths. Instead of letting the whole pipeline fail, route failures to cleanup or notification nodes.'
          example={`Node: "Deploy to Production"
  ├── success → "Notify Team: Success"
  └── failure → "Rollback Deploy"
                  └── "Notify Team: Rolled Back"`}
        />

        <Tip
          title="Add approval gates before destructive actions"
          desc="Any node that pushes to main, deploys to production, or modifies shared resources should have an approval gate before it."
          example={`AI Review → Tests → ✅ Approval Gate → Git Push to Main

# The approval gate shows you exactly what the AI
# changed before you let it push.`}
        />

        <Tip
          title="Use parallel nodes to speed up pipelines"
          desc="Independent tasks like linting, testing, and type-checking can run at the same time. This cuts total pipeline duration significantly."
          example={`# Sequential: ~90 seconds
Lint (30s) → Test (30s) → Typecheck (30s)

# Parallel: ~30 seconds
┌── Lint (30s) ──┐
├── Test (30s) ──┤ → Continue
└── Typecheck ───┘`}
        />

        <Tip
          title="Set timeouts on all execution nodes"
          desc="AI tasks and shell commands can hang. Always set a reasonable timeout to prevent pipelines from running indefinitely."
          example={`{
  "timeout": 300,  // 5 minutes for tests
  "timeout": 600,  // 10 minutes for AI code review
  "timeout": 60    // 1 minute for simple shell commands
}`}
        />

        <Tip
          title="Use variables for environment-specific values"
          desc="Don't hardcode branch names, URLs, or environment names. Use pipeline variables so you can reuse the same pipeline across contexts."
          example={`// Pipeline variables:
{ "BRANCH": "main", "ENV": "staging", "REGION": "us-east-1" }

// Node instructions:
"Deploy to \${ENV} in \${REGION}"
"git push origin HEAD:\${BRANCH}"`}
        />

        <Tip
          title="Compose with sub-pipelines"
          desc="Build reusable pipeline modules. A 'deploy' sub-pipeline can be called from both your 'full CI/CD' and 'hotfix' pipelines."
        />
      </div>

      {/* Agent Writing */}
      <h2 className="mt-16 text-2xl font-bold" id="agents">
        Writing Effective Agents
      </h2>

      <div className="mt-6 space-y-5">
        <Tip
          title="Be specific about output format"
          desc="Tell the agent exactly how to format its output. This makes downstream processing easier and responses more consistent."
          example={`# In your agent markdown:
## Output Format
Respond with a JSON object:
\`\`\`json
{
  "issues": [
    { "file": "path", "line": 42, "severity": "high", "message": "..." }
  ],
  "summary": "One-line summary"
}
\`\`\``}
        />

        <Tip
          title="Define scope boundaries"
          desc="Tell the agent what it should NOT do. This prevents scope creep and keeps responses focused."
          example={`# Good agent instructions:
You are a security reviewer. ONLY report security issues.
Do NOT suggest style changes, performance improvements,
or refactoring unless they directly relate to security.`}
        />

        <Tip
          title="Include examples in agent instructions"
          desc="One good example is worth more than a paragraph of explanation. Show the agent exactly what good output looks like."
        />

        <Tip
          title="Keep agents single-purpose"
          desc="A 'code-reviewer' agent and a 'test-writer' agent are better than one 'do-everything' agent. Each can be optimized independently."
        />
      </div>

      {/* Team Collaboration */}
      <h2 className="mt-16 text-2xl font-bold" id="team">
        Team Collaboration
      </h2>

      <div className="mt-6 space-y-5">
        <Tip
          title="Commit pipelines and agents to git"
          desc="Everything in .claude/ is plain JSON and Markdown. Commit it, review it in PRs, and share it across the team."
          example={`git add .claude/agents/ .claude/pipelines/
git commit -m "feat: add code review pipeline"
git push`}
        />

        <Tip
          title="Use descriptive pipeline names and descriptions"
          desc="Your teammates will see pipeline names in the selector. 'review-and-deploy-staging' is better than 'pipeline-1'."
        />

        <Tip
          title="CLI users can run the same pipelines"
          desc="AgentFlow generates standard Claude Code agent files. Teammates who prefer the CLI can use agents directly without the desktop app."
          example={`# Direct CLI usage (no AgentFlow needed):
claude --agent code-reviewer --print "Review latest changes"`}
        />

        <Tip
          title="Use file watching for live collaboration"
          desc="When a teammate pushes new agents or pipelines, AgentFlow's file watcher auto-detects the changes and refreshes the UI. Just pull and see updates."
        />
      </div>

      {/* Debugging */}
      <h2 className="mt-16 text-2xl font-bold" id="debugging">
        Debugging Failed Pipelines
      </h2>

      <div className="mt-6 space-y-5">
        <Tip
          title="Check the live log first"
          desc="The log viewer shows real-time output from each node. Scroll to the failed node and look at its stderr output for error messages."
        />

        <Tip
          title="Review run history for patterns"
          desc="If a pipeline fails intermittently, check run history. Look for patterns — does it always fail on the same node? Same time of day? Same input variables?"
        />

        <Tip
          title="Use retry policies for flaky operations"
          desc="Network requests, API calls, and some test suites can be flaky. Add a retry policy with a short delay instead of failing the whole pipeline."
          example={`{
  "retry": { "max": 3, "delay": 5 }
  // Retries up to 3 times with 5-second delay
  // Each attempt is logged separately
}`}
        />

        <Tip
          title="Check the app error log"
          desc="AgentFlow logs internal errors to ~/.cache/com.agentflow.app/agentflow.log. Check this if the UI behaves unexpectedly or IPC calls fail."
        />

        <Tip
          title="Verify the Claude CLI path"
          desc="Most execution failures are caused by the Claude CLI not being found. Check Settings → Claude CLI Path and verify it points to the correct binary."
        />
      </div>

      <InfoBox type="tip" title="Quick diagnostic checklist">
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>Is the Claude CLI path correct? (Settings panel)</li>
          <li>Is the project path correct? (Top bar)</li>
          <li>Does <code>.claude/</code> exist in the project?</li>
          <li>Can you run <code>claude --version</code> in terminal?</li>
          <li>Check the error log for Rust-level errors</li>
        </ol>
      </InfoBox>
    </div>
  );
}

function Tip({
  title,
  desc,
  example,
}: {
  title: string;
  desc: string;
  example?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
      <h3 className="font-semibold text-zinc-200">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
      {example && (
        <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-3.5 text-xs leading-relaxed text-zinc-400">
          <code>{example}</code>
        </pre>
      )}
    </div>
  );
}
