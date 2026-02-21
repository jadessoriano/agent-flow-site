import { Breadcrumb, CodeBlock, InfoBox, PropTable } from "@/components/docs-layout";

export const metadata = {
  title: "Pipelines",
  description: "Pipeline JSON schema, node and edge definitions, variables, validation rules, and AI pipeline generation.",
};

export default function PipelinesPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Pipelines" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Pipelines</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Pipelines are the core data structure in AgentFlow. They define a
        directed acyclic graph (DAG) of nodes connected by edges, stored as JSON
        files in your project.
      </p>

      {/* File Format */}
      <h2 className="mt-12 text-2xl font-bold" id="file-format">
        File Format
      </h2>
      <p className="mt-3 text-zinc-400">
        Pipelines are stored as{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
          .claude/pipelines/{"{name}"}.pipeline.json
        </code>{" "}
        in your project root. The name is sanitized from the pipeline&apos;s
        display name (lowercased, spaces to hyphens).
      </p>

      {/* Schema */}
      <h2 className="mt-12 text-2xl font-bold" id="schema">
        Pipeline Schema
      </h2>

      <PropTable
        items={[
          { name: "name", type: "string", required: true, description: "Pipeline display name, used to generate the filename." },
          { name: "description", type: "string", required: true, description: "One-line summary of what this pipeline does." },
          { name: "version", type: "string", required: true, description: 'Semantic version string, e.g. "1.0.0".' },
          { name: "variables", type: "Record<string, string>", required: true, description: "Key-value pairs for runtime variable substitution." },
          { name: "nodes", type: "PipelineNode[]", required: true, description: "Array of pipeline nodes (see Node Schema below)." },
          { name: "edges", type: "PipelineEdge[]", required: true, description: "Array of connections between nodes." },
        ]}
      />

      <CodeBlock title="Example pipeline JSON" language="json">
        {`{
  "name": "Review and Deploy",
  "description": "AI code review followed by test and deploy",
  "version": "1.0.0",
  "variables": {
    "BASE_BRANCH": "main",
    "DEPLOY_TARGET": "staging"
  },
  "nodes": [
    {
      "id": "node-1",
      "name": "Code Review",
      "type": "ai-task",
      "instructions": "Review all changed files for bugs and security issues",
      "agent": "code-reviewer",
      "inputs": [],
      "outputs": [],
      "position": { "x": 250, "y": 0 }
    },
    {
      "id": "node-2",
      "name": "Run Tests",
      "type": "shell",
      "instructions": "npm run test -- --coverage",
      "inputs": [],
      "outputs": [],
      "retry": { "max": 2, "delay": 5 },
      "timeout": 300,
      "position": { "x": 250, "y": 150 }
    },
    {
      "id": "node-3",
      "name": "Deploy Approval",
      "type": "approval-gate",
      "instructions": "Review AI changes before deploying to \${DEPLOY_TARGET}",
      "inputs": [],
      "outputs": [],
      "position": { "x": 250, "y": 300 }
    },
    {
      "id": "node-4",
      "name": "Deploy",
      "type": "git",
      "instructions": "git push origin HEAD:\${BASE_BRANCH}",
      "inputs": [],
      "outputs": [],
      "position": { "x": 250, "y": 450 }
    }
  ],
  "edges": [
    { "id": "edge-1", "from": "node-1", "to": "node-2", "condition": "success" },
    { "id": "edge-2", "from": "node-2", "to": "node-3", "condition": "success" },
    { "id": "edge-3", "from": "node-3", "to": "node-4" }
  ]
}`}
      </CodeBlock>

      {/* Node Schema */}
      <h2 className="mt-12 text-2xl font-bold" id="node-schema">
        Node Schema
      </h2>

      <PropTable
        items={[
          { name: "id", type: "string", required: true, description: 'Unique node identifier, e.g. "node-1".' },
          { name: "name", type: "string", required: true, description: "Display name shown on the canvas." },
          { name: "type", type: "string", required: true, description: '"ai-task" | "shell" | "git" | "parallel" | "approval-gate" | "sub-pipeline"' },
          { name: "instructions", type: "string", required: true, description: "The command, prompt, or instructions for this node." },
          { name: "agent", type: "string", description: "Agent name for ai-task nodes. References .claude/agents/{name}.md." },
          { name: "inputs", type: "string[]", required: true, description: "Input variable names consumed by this node." },
          { name: "outputs", type: "string[]", required: true, description: "Output variable names produced by this node." },
          { name: "retry", type: "{ max: number, delay: number }", description: "Retry policy. max = attempts, delay = seconds between retries." },
          { name: "timeout", type: "number", description: "Execution timeout in seconds. Process is killed if exceeded." },
          { name: "children", type: "string[]", description: "Child node IDs. Required for parallel nodes." },
          { name: "pipeline_ref", type: "string", description: "Referenced pipeline name. Required for sub-pipeline nodes." },
          { name: "requires_tools", type: "string[]", description: "MCP tool names required for ai-task nodes." },
          { name: "position", type: "{ x: number, y: number }", required: true, description: "Canvas coordinates for the node." },
        ]}
      />

      {/* Edge Schema */}
      <h2 className="mt-12 text-2xl font-bold" id="edge-schema">
        Edge Schema
      </h2>

      <PropTable
        items={[
          { name: "id", type: "string", required: true, description: "Unique edge identifier." },
          { name: "from", type: "string", required: true, description: "Source node ID." },
          { name: "to", type: "string", required: true, description: "Target node ID." },
          { name: "condition", type: '"success" | "failure" | string', description: "Execution condition. Node only runs if predecessor matches this condition." },
        ]}
      />

      <InfoBox type="info" title="Conditional branching">
        Edges with <code>condition: &quot;success&quot;</code> only fire when the source
        node succeeds (exit code 0). Edges with{" "}
        <code>condition: &quot;failure&quot;</code> fire on non-zero exit. Edges with no
        condition always fire.
      </InfoBox>

      {/* Variables */}
      <h2 className="mt-12 text-2xl font-bold" id="variables">
        Pipeline Variables
      </h2>
      <p className="mt-3 text-zinc-400">
        Variables are defined at the pipeline level and substituted into node
        instructions at runtime.
      </p>

      <CodeBlock title="Variable substitution syntax" language="text">
        {`# In pipeline variables:
{ "BASE_BRANCH": "main", "JIRA_KEY": "PROJ-123" }

# In node instructions, use \${VAR_NAME}:
"git merge origin/\${BASE_BRANCH}"
"Fix issue \${JIRA_KEY}"

# Runtime inputs also work:
"{input.varname}" or "{{varname}}"`}
      </CodeBlock>

      <InfoBox type="tip">
        Variables are prompted for when you run a pipeline if input fields are
        configured. You can set default values in the pipeline definition and
        override them at runtime.
      </InfoBox>

      {/* Validation */}
      <h2 className="mt-12 text-2xl font-bold" id="validation">
        Validation Rules
      </h2>
      <p className="mt-3 text-zinc-400">
        Before execution, AgentFlow validates pipelines:
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>
          <strong className="text-zinc-200">Sub-pipeline references:</strong> Every sub-pipeline node
          must have <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">pipeline_ref</code> set to an existing pipeline name.
        </li>
        <li>
          <strong className="text-zinc-200">MCP tools:</strong> If a node specifies{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">requires_tools</code>, those tools must exist in{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">.mcp.json</code>.
        </li>
        <li>
          <strong className="text-zinc-200">Circular references:</strong> Sub-pipeline chains are
          tracked. Circular references (A &rarr; B &rarr; A) are blocked.
        </li>
        <li>
          <strong className="text-zinc-200">Edge integrity:</strong> All edge{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">from</code> and{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">to</code> fields must reference existing node IDs.
        </li>
      </ul>

      {/* Generation */}
      <h2 className="mt-12 text-2xl font-bold" id="generation">
        AI Pipeline Generation
      </h2>
      <p className="mt-3 text-zinc-400">
        AgentFlow can generate pipelines from natural language descriptions
        using the Claude CLI.
      </p>

      <CodeBlock title="How generation works" language="text">
        {`1. User provides a description:
   "CI/CD pipeline that reviews code, runs tests, and deploys"

2. AgentFlow sends a comprehensive schema prompt to Claude CLI:
   claude --print "{full_prompt_with_schema}"

3. Claude returns a JSON pipeline matching the schema

4. AgentFlow validates all edge references and applies defaults

5. The generated pipeline appears on the canvas ready for editing`}
      </CodeBlock>

      <InfoBox type="info">
        Generated pipelines include auto-created agent markdown files in{" "}
        <code>.claude/agents/</code> with names prefixed by{" "}
        <code>_pipeline--</code>.
      </InfoBox>
    </div>
  );
}
