"use client";
import { useMemo, useState } from 'react';

type Node = {
  id: string;
  name: string;
  type: 'project' | 'component';
  children?: Node[];
  vulnerabilities?: number; // count
  severityBreakdown?: { critical: number; high: number; medium: number; low: number };
};

const TREE: Node[] = [
  {
    id: 'proj-1',
    name: 'Billing API',
    type: 'project',
    vulnerabilities: 7,
    severityBreakdown: { critical: 1, high: 2, medium: 3, low: 1 },
    children: [
      { id: 'comp-1', name: 'log4j 2.17.0', type: 'component', vulnerabilities: 3 },
      { id: 'comp-2', name: 'jackson-databind 2.13.0', type: 'component', vulnerabilities: 2 },
    ],
  },
  {
    id: 'proj-2',
    name: 'Admin Portal',
    type: 'project',
    vulnerabilities: 3,
    severityBreakdown: { critical: 0, high: 1, medium: 2, low: 0 },
    children: [
      { id: 'comp-3', name: 'react 18.3.1', type: 'component', vulnerabilities: 1 },
      { id: 'comp-4', name: 'lodash 4.17.21', type: 'component', vulnerabilities: 2 },
    ],
  },
];

export function ProjectPortfolioTab() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'proj-1': true });
  const [selected, setSelected] = useState<string | null>(null);

  const selectedNode = useMemo(() => {
    function find(nodes: Node[]): Node | null {
      for (const n of nodes) {
        if (n.id === selected) return n;
        if (n.children) {
          const f = find(n.children);
          if (f) return f;
        }
      }
      return null;
    }
    return selected ? find(TREE) : null;
  }, [selected]);

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="grid gap-4 md:grid-cols-[360px_1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-2" role="tree" aria-label="Project hierarchy">
        {TREE.map((n) => (
          <TreeNode key={n.id} node={n} level={1} expanded={!!expanded[n.id]} onToggle={toggle} onSelect={setSelected} />
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        {selectedNode ? (
          <div>
            <h3 className="text-lg font-semibold">{selectedNode.name}</h3>
            {selectedNode.type === 'project' && selectedNode.severityBreakdown && (
              <div className="mt-3 flex gap-3 text-sm">
                <Badge color="bg-red-100 text-red-800" label={`Critical ${selectedNode.severityBreakdown.critical}`} />
                <Badge color="bg-red-200 text-red-900" label={`High ${selectedNode.severityBreakdown.high}`} />
                <Badge color="bg-yellow-100 text-yellow-800" label={`Medium ${selectedNode.severityBreakdown.medium}`} />
                <Badge color="bg-green-100 text-green-800" label={`Low ${selectedNode.severityBreakdown.low}`} />
              </div>
            )}
            <p className="mt-2 text-sm text-slate-600">Type: {selectedNode.type}</p>
            <p className="text-sm text-slate-600">Vulnerabilities: {selectedNode.vulnerabilities ?? 0}</p>
            {selectedNode.children && (
              <div className="mt-4">
                <h4 className="font-medium">Components</h4>
                <ul className="list-disc pl-5 text-sm">
                  {selectedNode.children.map((c) => (
                    <li key={c.id}>
                      <button className="text-brand-700 underline-offset-2 hover:underline" onClick={() => setSelected(c.id)}>
                        {c.name}
                      </button>
                      <span className="ml-2 text-slate-600">({c.vulnerabilities ?? 0} vulns)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-600">Select a project or component to view details.</p>
        )}
      </div>
    </div>
  );
}

function TreeNode({ node, level, expanded, onToggle, onSelect }: { node: Node; level: number; expanded: boolean; onToggle: (id: string) => void; onSelect: (id: string) => void; }) {
  const isParent = !!node.children?.length;
  return (
    <div role="treeitem" aria-expanded={isParent ? expanded : undefined} aria-level={level} className="select-none">
      <div className="flex items-center gap-2 px-2 py-1">
        {isParent ? (
          <button className="btn h-7 px-2 text-xs" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.name}`} onClick={() => onToggle(node.id)}>
            {expanded ? '−' : '+'}
          </button>
        ) : (
          <span className="inline-block w-5" aria-hidden />
        )}
        <button className="text-left hover:underline underline-offset-2" onClick={() => onSelect(node.id)}>
          {node.name}
        </button>
        <span className="ml-auto text-xs text-slate-600">{node.vulnerabilities ?? 0} vulns</span>
      </div>
      {isParent && expanded && (
        <div className="ml-6 border-l border-slate-200 pl-3" role="group">
          {node.children!.map((c) => (
            <TreeNode key={c.id} node={c} level={level + 1} expanded={false} onToggle={onToggle} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ color, label }: { color: string; label: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>{label}</span>;
}
