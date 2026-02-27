import { Breadcrumb } from "@/components/docs-layout";

const faqs = [
  {
    q: "Is AgentFlow free?",
    a: "Yes. AgentFlow is open source under the MIT license. There is no paid tier or license key. However, running AI Task nodes uses the Claude API, which has its own token-based pricing.",
  },
  {
    q: "Does AgentFlow require an internet connection?",
    a: "The desktop app itself runs fully offline. However, AI Task nodes call the Claude Code CLI, which requires internet access to reach the Anthropic API. Shell, Git, Parallel, Loop, Approval Gate, and Sub-pipeline nodes work completely offline.",
  },
  {
    q: "Where is my data stored?",
    a: 'Pipelines and agents are stored as plain JSON and Markdown files in your project\'s .claude/ directory — fully under your control and version controlled via git. Run history, settings, and cost data are stored in a local SQLite database at ~/.cache/com.agentflow.app/agentflow.db. No data is sent to any external server beyond the Claude API calls.',
  },
  {
    q: "Do I need to install Claude Code CLI separately?",
    a: "Yes. AgentFlow is a GUI layer on top of Claude Code CLI — it spawns the CLI as a child process. Install it with: npm install -g @anthropic-ai/claude-code. AgentFlow auto-detects the CLI from 13+ common installation paths.",
  },
  {
    q: "Can my team use AgentFlow and Claude Code CLI interchangeably?",
    a: "Absolutely. Agents are standard Claude Code Markdown files, and pipelines are plain JSON. Teammates who prefer the CLI can run agents directly (claude --agent code-reviewer) while others use the visual editor. Both read/write the same files.",
  },
  {
    q: "What platforms does AgentFlow support?",
    a: "Windows 10+, macOS 11+ (Apple Silicon and Intel), and Linux (Ubuntu 22.04+, Fedora 38+, Arch). Built with Tauri v2, which produces small native binaries for all three platforms.",
  },
  {
    q: "How are costs tracked?",
    a: 'When an AI Task node runs, AgentFlow parses the "Total cost: $X.XX" line from Claude CLI\'s stderr output. This is stored per-node in the SQLite database. The Cost Dashboard aggregates these into per-run, per-pipeline, and overall totals. Only AI Task nodes incur costs.',
  },
  {
    q: "Can I resume a failed pipeline?",
    a: "Yes. When a pipeline fails partway through, you can resume it from the point of failure. Previously successful nodes are skipped (using SHA-256 instruction hashing to detect changes), so you don't re-run or re-pay for work that already succeeded.",
  },
  {
    q: "What happens if I modify a node and then resume?",
    a: "AgentFlow compares instruction hashes. If a node's instructions changed since the original run, it will be re-executed even if it previously succeeded. Unchanged nodes are reused.",
  },
  {
    q: "Can pipelines call other pipelines?",
    a: "Yes, via Sub-pipeline nodes. You can reference any saved pipeline by name. AgentFlow detects and blocks circular references (A calls B which calls A). Costs from sub-pipelines are aggregated into the parent run.",
  },
  {
    q: "How do Approval Gates work?",
    a: "When execution reaches an Approval Gate, the pipeline pauses and shows a dialog in the UI. You can review the run logs and either Approve (continue) or Reject (fail the node). You can set a timeout so gates auto-fail if nobody responds.",
  },
  {
    q: "Is there a web version?",
    a: "Not currently. AgentFlow is a desktop app because it needs to spawn local processes (Claude CLI, bash commands, git) and access your filesystem directly. A web version would require a backend service to proxy these operations.",
  },
  {
    q: "How do I share pipelines with my team?",
    a: "Just commit the .claude/ directory to git and push. Pipeline JSON files and agent Markdown files are plain text — they diff cleanly, can be reviewed in PRs, and teammates get them on pull. AgentFlow's file watcher auto-detects new files.",
  },
  {
    q: "Can I generate pipelines from natural language?",
    a: 'Yes. The "Generate Pipeline" feature sends your description to Claude CLI with a comprehensive schema prompt. Claude returns a valid pipeline JSON that appears on the canvas. It also auto-generates agent Markdown files for any AI Task nodes.',
  },
  {
    q: "What's the difference between Shell and Git node types?",
    a: "Functionally identical — both run bash commands. The distinction is semantic: Git nodes are visually differentiated on the canvas so you can quickly see which steps are git operations vs. general shell commands.",
  },
  {
    q: "How do I contribute?",
    a: "AgentFlow is open source on GitHub. Fork the repo, create a branch, make your changes, and submit a PR. The project uses Rust (backend) and React + TypeScript (frontend) with Tauri v2 as the bridge.",
  },
  {
    q: "Does AgentFlow support light mode?",
    a: "AgentFlow ships with a dark theme only, optimized for extended coding sessions. Light theme has been removed to provide a consistent, polished experience.",
  },
  {
    q: "Can I set a budget limit on pipeline runs?",
    a: "Yes. In the Pipeline Settings panel, you can set a maximum cost (USD) per run. When accumulated AI task costs exceed the budget, execution halts automatically and remaining nodes are cancelled. This prevents runaway costs during development.",
  },
  {
    q: "What is output caching?",
    a: "Output caching skips re-execution of nodes whose instructions haven't changed since their last successful run. AgentFlow compares SHA-256 instruction hashes and reuses cached results, saving both time and API tokens during iterative pipeline development.",
  },
  {
    q: "Can nodes pass data to each other?",
    a: "Yes. Use the {output.NODE_ID} syntax in downstream node instructions to reference the captured stdout of an upstream node. The placeholder is replaced at runtime with the full output from the referenced node's execution.",
  },
  {
    q: "Can I choose different Claude models per node?",
    a: "Yes. Each AI Task node can be configured with a specific model — Opus for complex reasoning, Sonnet for balanced tasks, or Haiku for fast lightweight operations. This lets you optimize cost vs. capability per pipeline step.",
  },
  {
    q: "How do desktop notifications work?",
    a: "AgentFlow uses native OS notifications (Windows Toast, macOS Notification Center, Linux libnotify) to alert you when pipeline runs complete, fail, or hit an approval gate. Notifications work even when the app is minimized. You can enable or disable them in settings.",
  },
  {
    q: "What are secret variables?",
    a: "Secret variables are pipeline variables marked as sensitive. Their values are masked in the UI (shown as dots), excluded from log output, and never written to the pipeline JSON file. Use them for API keys, tokens, and other credentials that your pipeline nodes need at runtime.",
  },
  {
    q: "Are there starter templates?",
    a: "Yes. AgentFlow ships with 8 built-in pipeline templates: Code Review, Bug Fix, CI/CD, Ticket-to-PR, Release, Add a Feature, Generate API Docs, and Refactor Module. Templates provide one-click scaffolding — they create the pipeline with pre-configured nodes and edges that you can customize.",
  },
  {
    q: "Does AgentFlow auto-update?",
    a: "Yes. AgentFlow includes a built-in auto-updater with signed builds. When a new version is available, the app shows an update banner and you can update with a single click. Updates are downloaded in the background and applied on restart.",
  },
  {
    q: "What is the Loop node?",
    a: "The Loop node iterates over a list of items, executing its child nodes for each item. You configure a separator (newline, comma, or custom), set a max iteration cap (1-1000), and child nodes receive per-item variables: $LOOP_ITEM, $LOOP_INDEX, and $LOOP_COUNT. Great for batch operations like reviewing multiple files or processing a list of tasks.",
  },
  {
    q: "What are Simple and Advanced experience modes?",
    a: "Simple mode shows only essential features — ideal for getting started or building linear pipelines. Advanced mode unlocks all features including Parallel nodes, Loop nodes, per-node model selection, and advanced configuration. You can switch between modes anytime in Settings.",
  },
  {
    q: "Is there a setup wizard for first-time users?",
    a: "Yes. When you first launch AgentFlow, a setup wizard guides you through selecting your project directory, detecting the Claude CLI, and choosing your experience mode. A hint overlay then highlights key UI areas to help you get oriented.",
  },
  {
    q: "What is the compact view toggle?",
    a: "The canvas supports both compact and detailed views. Compact view shows nodes as just an icon and name — useful for large pipelines where you need an overview. Detailed view shows full node information. Toggle between them with the view button on the canvas toolbar.",
  },
];

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about AgentFlow — licensing, data privacy, costs, platform support, and capabilities.",
};

export default function FAQPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "FAQ" }]} />

      <h1 className="text-3xl font-bold tracking-tight">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 text-lg text-zinc-400">
        Common questions about AgentFlow — licensing, data privacy, costs,
        and capabilities.
      </p>

      <div className="mt-10 space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5"
          >
            <h3 className="font-semibold text-zinc-200">{faq.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
