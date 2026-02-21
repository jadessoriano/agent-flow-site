import { Breadcrumb, CodeBlock, InfoBox, PropTable } from "@/components/docs-layout";

export const metadata = {
  title: "Agents",
  description: "Agent Markdown format, naming conventions, auto-discovery, management, and using agents in pipelines.",
};

export default function AgentsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Agents" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Agents are Markdown files that provide system instructions for Claude
        Code. AgentFlow manages agents alongside pipelines, keeping everything
        in the native Claude Code format.
      </p>

      {/* File Format */}
      <h2 className="mt-12 text-2xl font-bold" id="format">
        File Format
      </h2>
      <p className="mt-3 text-zinc-400">
        Agents are stored as plain Markdown files at{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          .claude/agents/{"{name}"}.md
        </code>{" "}
        in your project. There is no required frontmatter or structure — any
        valid Markdown works.
      </p>

      <CodeBlock title=".claude/agents/code-reviewer.md" language="markdown">
        {`# Code Reviewer

You are a senior code reviewer. Review all changed files for:

- Security vulnerabilities (OWASP Top 10)
- Performance issues and N+1 queries
- Missing error handling
- Code style violations

## Output Format

Provide a summary of findings as a numbered list, grouped by severity:
1. **Critical** - Must fix before merge
2. **Warning** - Should fix, but not blocking
3. **Info** - Suggestions for improvement

Always explain *why* something is an issue, not just *what* is wrong.`}
      </CodeBlock>

      <InfoBox type="info">
        Agent files are directly compatible with Claude Code CLI. Running{" "}
        <code>claude --agent code-reviewer --print &quot;your prompt&quot;</code>{" "}
        from the terminal uses the exact same file.
      </InfoBox>

      {/* Naming Conventions */}
      <h2 className="mt-12 text-2xl font-bold" id="naming">
        Naming Conventions
      </h2>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Pattern</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Origin</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Description</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            <tr className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">{"{name}"}.md</code>
              </td>
              <td className="px-4 py-2.5">
                <code className="rounded bg-green-500/10 px-1.5 py-0.5 text-xs text-green-400">manual</code>
              </td>
              <td className="px-4 py-2.5">User-created agents with any alphanumeric name</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-300">_pipeline--{"{name}"}.md</code>
              </td>
              <td className="px-4 py-2.5">
                <code className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-xs text-indigo-400">pipeline</code>
              </td>
              <td className="px-4 py-2.5">Auto-generated from pipeline. Prefix stripped in UI.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-zinc-400">
        Names are sanitized for the filesystem: lowercased, spaces converted to
        hyphens, special characters removed.
      </p>

      {/* AgentInfo Type */}
      <h2 className="mt-12 text-2xl font-bold" id="agent-info">
        Agent Data Structure
      </h2>

      <PropTable
        items={[
          { name: "name", type: "string", description: "Filename without .md extension." },
          { name: "display_name", type: "string", description: 'Name with "_pipeline--" prefix stripped.' },
          { name: "path", type: "string", description: "Absolute filesystem path to the .md file." },
          { name: "description", type: "string", description: "Auto-extracted from the first non-empty, non-heading line. Truncated to ~120 chars." },
          { name: "origin", type: '"manual" | "pipeline"', description: "Whether created by user or auto-generated from a pipeline." },
        ]}
      />

      {/* Description Extraction */}
      <h2 className="mt-12 text-2xl font-bold" id="description">
        Description Extraction
      </h2>
      <p className="mt-3 text-zinc-400">
        When listing agents, AgentFlow automatically extracts a short
        description from the Markdown content:
      </p>
      <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-zinc-400">
        <li>Scans lines from top to bottom</li>
        <li>Skips empty lines and lines starting with <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">#</code> (headings)</li>
        <li>Takes the first non-empty, non-heading line as the description</li>
        <li>Truncates to ~120 characters with &quot;...&quot; suffix if longer</li>
      </ol>

      {/* Management */}
      <h2 className="mt-12 text-2xl font-bold" id="management">
        Agent Management
      </h2>

      <h3 className="mt-6 text-lg font-semibold">Auto-Discovery</h3>
      <p className="mt-2 text-sm text-zinc-400">
        When a project is loaded, AgentFlow scans{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.claude/agents/</code>{" "}
        for all <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.md</code> files and
        populates the agent library. The file watcher monitors this directory
        for changes.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Agent Library</h3>
      <p className="mt-2 text-sm text-zinc-400">
        The agent library panel provides:
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-zinc-400">
        <li>Searchable, filterable list of all agents</li>
        <li>Filter by origin (manual vs pipeline-generated)</li>
        <li>Quick preview of agent description</li>
        <li>Click to open in the Markdown editor</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold">Markdown Editor</h3>
      <p className="mt-2 text-sm text-zinc-400">
        The built-in editor provides:
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-zinc-400">
        <li>Full Markdown editing with syntax highlighting</li>
        <li>Live preview panel (rendered via the Marked library)</li>
        <li>Auto-save on changes</li>
        <li>Create new agents with a name and initial content</li>
        <li>Delete agents with confirmation</li>
      </ul>

      {/* IPC Commands */}
      <h2 className="mt-12 text-2xl font-bold" id="api">
        IPC Commands
      </h2>

      <div className="mt-4 space-y-4">
        {[
          { cmd: "list_agents(projectPath)", ret: "AgentInfo[]", desc: "List all agents in the project." },
          { cmd: "read_agent(path)", ret: "{ name, path, content }", desc: "Read full agent content." },
          { cmd: "write_agent(path, content)", ret: "void", desc: "Update agent content." },
          { cmd: "create_agent(projectPath, name, content)", ret: "string (path)", desc: "Create a new agent file." },
          { cmd: "delete_agent(path)", ret: "void", desc: "Delete an agent file." },
        ].map((item) => (
          <div key={item.cmd} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <code className="text-sm font-medium text-indigo-300">{item.cmd}</code>
            <span className="ml-2 text-xs text-zinc-500">&rarr; {item.ret}</span>
            <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Using with pipelines */}
      <h2 className="mt-12 text-2xl font-bold" id="pipeline-agents">
        Using Agents in Pipelines
      </h2>
      <p className="mt-3 text-zinc-400">
        Reference an agent in an AI Task node by setting the{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">agent</code> field to
        the agent&apos;s name (without <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.md</code>):
      </p>

      <CodeBlock language="json">
        {`{
  "id": "node-1",
  "type": "ai-task",
  "name": "Security Review",
  "agent": "code-reviewer",
  "instructions": "Review the latest changes for security issues",
  ...
}`}
      </CodeBlock>

      <p className="mt-3 text-sm text-zinc-400">
        At execution time, this translates to:
      </p>
      <CodeBlock language="bash">
        {`claude --agent code-reviewer --print "Review the latest changes for security issues"`}
      </CodeBlock>

      <InfoBox type="tip" title="CLI compatibility">
        Because agents are standard Claude Code Markdown files, teammates who
        prefer the CLI can use them directly without AgentFlow:{" "}
        <code>claude --agent code-reviewer</code>.
      </InfoBox>
    </div>
  );
}
