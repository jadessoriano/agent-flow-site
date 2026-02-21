import { Breadcrumb, InfoBox } from "@/components/docs-layout";

export const metadata = {
  title: "Keyboard Shortcuts",
  description: "Complete keyboard shortcut reference for AgentFlow — execution, canvas navigation, editing, and panel controls.",
};

export default function KeyboardShortcutsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Keyboard Shortcuts" }]} />

      <h1 className="text-3xl font-bold tracking-tight">Keyboard Shortcuts</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Every major action in AgentFlow has a keyboard shortcut. Stay in flow
        without reaching for the mouse.
      </p>

      <InfoBox type="info">
        On macOS, <kbd>Ctrl</kbd> is replaced by <kbd>Cmd</kbd> for all
        shortcuts.
      </InfoBox>

      {/* Execution */}
      <h2 className="mt-12 text-2xl font-bold" id="execution">
        Execution
      </h2>
      <ShortcutTable
        items={[
          {
            keys: ["Ctrl", "R"],
            action: "Run / Cancel pipeline",
            desc: "Starts the current pipeline. If a run is active, cancels it instead.",
          },
        ]}
      />

      {/* Canvas */}
      <h2 className="mt-10 text-2xl font-bold" id="canvas">
        Canvas Navigation
      </h2>
      <ShortcutTable
        items={[
          {
            keys: ["Space"],
            action: "Zoom to fit",
            desc: "Fits all nodes into the viewport. Disabled when focused on an input field.",
          },
          {
            keys: ["Scroll"],
            action: "Zoom in/out",
            desc: "Mouse wheel zooms the canvas.",
          },
          {
            keys: ["Click + Drag"],
            action: "Pan canvas",
            desc: "Click on empty canvas area and drag to pan.",
          },
        ]}
      />

      {/* Editing */}
      <h2 className="mt-10 text-2xl font-bold" id="editing">
        Editing
      </h2>
      <ShortcutTable
        items={[
          {
            keys: ["Ctrl", "Z"],
            action: "Undo",
            desc: "Reverts the last node/edge change. Up to 30 steps of history.",
          },
          {
            keys: ["Ctrl", "Shift", "Z"],
            action: "Redo",
            desc: "Re-applies the last undone change.",
          },
          {
            keys: ["Ctrl", "Y"],
            action: "Redo (alt)",
            desc: "Alternative redo shortcut.",
          },
          {
            keys: ["Delete"],
            action: "Delete node",
            desc: "Deletes the currently selected node. Also works with Backspace.",
          },
        ]}
      />

      {/* Panels */}
      <h2 className="mt-10 text-2xl font-bold" id="panels">
        Panels & UI
      </h2>
      <ShortcutTable
        items={[
          {
            keys: ["Escape"],
            action: "Close side panel",
            desc: "Closes whichever side panel is currently open.",
          },
          {
            keys: ["Ctrl", "E"],
            action: "Export pipeline",
            desc: "Exports the current pipeline as a JSON file via the system file dialog.",
          },
        ]}
      />

      {/* Mouse */}
      <h2 className="mt-10 text-2xl font-bold" id="mouse">
        Mouse Actions
      </h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Action</th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Effect</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ["Click node", "Select node and open config panel"],
              ["Click edge", "Select edge and open edge config panel"],
              ["Click empty canvas", "Deselect all, close config panel"],
              ["Drag from node handle", "Create a new edge connection"],
              ["Drag node palette item", "Add a new node to the canvas"],
              ["Double-click node", "Open node configuration panel"],
            ].map(([action, effect]) => (
              <tr key={action} className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-medium text-zinc-200">{action}</td>
                <td className="px-4 py-2.5">{effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tips */}
      <h2 className="mt-12 text-2xl font-bold" id="tips">
        Tips
      </h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
        <li>
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Space</kbd>{" "}
          for zoom-to-fit is disabled when a text input is focused, so you can
          type spaces normally.
        </li>
        <li>
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+R</kbd>{" "}
          toggles between run and cancel — no need for separate shortcuts.
        </li>
        <li>
          Undo history holds up to <strong>30 states</strong>. Making a new
          change after undoing clears the redo stack.
        </li>
        <li>
          Export via{" "}
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+E</kbd>{" "}
          uses the native file dialog, so you can save the JSON anywhere on
          your machine.
        </li>
      </ul>
    </div>
  );
}

function ShortcutTable({
  items,
}: {
  items: { keys: string[]; action: string; desc: string }[];
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/60">
            <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Shortcut</th>
            <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Action</th>
            <th className="px-4 py-2.5 text-left font-medium text-zinc-300">Description</th>
          </tr>
        </thead>
        <tbody className="text-zinc-400">
          {items.map((item) => (
            <tr key={item.action} className="border-b border-zinc-800/50">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1">
                  {item.keys.map((k, i) => (
                    <span key={i}>
                      <kbd className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
                        {k}
                      </kbd>
                      {i < item.keys.length - 1 && (
                        <span className="mx-0.5 text-xs text-zinc-600">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2.5 font-medium text-zinc-200">{item.action}</td>
              <td className="px-4 py-2.5">{item.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
