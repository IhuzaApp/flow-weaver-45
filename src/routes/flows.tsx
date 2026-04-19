import { useCallback, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import {
  Webhook,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Clock,
  GitBranch,
  Play,
  Save,
  PowerOff,
  Power,
  Plus,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { FlowNode, type FlowNodeData } from "@/components/flow/FlowNode";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flows")({
  head: () => ({
    meta: [
      { title: "Flow Builder — Relay" },
      { name: "description", content: "Visually design automation flows that send SMS, Email, WhatsApp and AI messages." },
    ],
  }),
  component: FlowsPage,
});

const nodeTypes = { flow: FlowNode };

const initialNodes: Node<FlowNodeData>[] = [
  {
    id: "1",
    type: "flow",
    position: { x: 320, y: 40 },
    data: { kind: "trigger", label: "API request received", detail: "POST /v1/send" },
  },
  {
    id: "2",
    type: "flow",
    position: { x: 320, y: 200 },
    data: { kind: "whatsapp", label: "Send WhatsApp", detail: "Template: order_shipped" },
  },
  {
    id: "3",
    type: "flow",
    position: { x: 320, y: 360 },
    data: { kind: "condition", label: "If not delivered", detail: "status != delivered within 5m" },
  },
  {
    id: "4",
    type: "flow",
    position: { x: 60, y: 520 },
    data: { kind: "sms", label: "Send SMS fallback", detail: "From: +1 (415) 555-0100" },
  },
  {
    id: "5",
    type: "flow",
    position: { x: 580, y: 520 },
    data: { kind: "delay", label: "Wait 1 hour", detail: "60 minutes" },
  },
  {
    id: "6",
    type: "flow",
    position: { x: 580, y: 680 },
    data: { kind: "email", label: "Send reminder email", detail: "Template: gentle_reminder" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", label: "no", animated: true },
  { id: "e3-5", source: "3", target: "5", label: "yes" },
  { id: "e5-6", source: "5", target: "6" },
];

const palette: Array<{ kind: FlowNodeData["kind"]; label: string; icon: typeof Webhook; group: string }> = [
  { kind: "trigger", label: "API trigger", icon: Webhook, group: "Triggers" },
  { kind: "sms", label: "Send SMS", icon: Phone, group: "Actions" },
  { kind: "email", label: "Send Email", icon: Mail, group: "Actions" },
  { kind: "whatsapp", label: "Send WhatsApp", icon: MessageSquare, group: "Actions" },
  { kind: "ai", label: "AI response", icon: Sparkles, group: "Actions" },
  { kind: "delay", label: "Delay", icon: Clock, group: "Logic" },
  { kind: "condition", label: "Condition", icon: GitBranch, group: "Logic" },
];

function FlowsPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedId, setSelectedId] = useState<string | null>("2");
  const [active, setActive] = useState(true);
  const [simulating, setSimulating] = useState(false);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const addNode = (kind: FlowNodeData["kind"], label: string) => {
    const id = `n_${Date.now()}`;
    setNodes((ns) => [
      ...ns,
      {
        id,
        type: "flow",
        position: { x: 200 + Math.random() * 200, y: 200 + Math.random() * 200 },
        data: { kind, label, detail: "Click to configure" },
      },
    ]);
  };

  const selected = useMemo(() => nodes.find((n) => n.id === selectedId), [nodes, selectedId]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof palette> = {};
    palette.forEach((p) => {
      g[p.group] = g[p.group] || [];
      g[p.group].push(p);
    });
    return g;
  }, []);

  const simulate = () => {
    setSimulating(true);
    setTimeout(() => setSimulating(false), 2400);
  };

  return (
    <AppLayout>
      <Topbar
        title="Order shipped notification"
        subtitle="Last edited 4 minutes ago · Draft"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={simulate}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition shadow-soft"
            >
              <Play className="h-4 w-4" />
              {simulating ? "Simulating…" : "Simulate"}
            </button>
            <button
              onClick={() => setActive((a) => !a)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition shadow-soft",
                active
                  ? "bg-success/15 text-success border border-success/30"
                  : "bg-muted text-muted-foreground border border-border",
              )}
            >
              {active ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
              {active ? "Active" : "Inactive"}
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 transition shadow-soft">
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        }
      />
      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Palette */}
        <aside className="col-span-12 lg:col-span-2 border-r border-border bg-card/50 p-4 overflow-auto">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Add block
          </div>
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-5">
              <div className="text-[11px] font-medium text-muted-foreground mb-2">{group}</div>
              <div className="space-y-1.5">
                {items.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.kind}
                      onClick={() => addNode(p.kind, p.label)}
                      className="group w-full flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2 text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent/40 transition"
                    >
                      <span className={cn(
                        "h-6 w-6 rounded-md flex items-center justify-center",
                        p.kind === "trigger" && "bg-primary/10 text-primary",
                        p.kind === "sms" && "bg-channel-sms/10 text-channel-sms",
                        p.kind === "email" && "bg-channel-email/10 text-channel-email",
                        p.kind === "whatsapp" && "bg-channel-whatsapp/10 text-channel-whatsapp",
                        p.kind === "ai" && "bg-channel-ai/10 text-channel-ai",
                        p.kind === "delay" && "bg-warning/15 text-warning-foreground",
                        p.kind === "condition" && "bg-info/10 text-info",
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex-1 text-left">{p.label}</span>
                      <Plus className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Canvas */}
        <div className="col-span-12 lg:col-span-7 relative h-[calc(100vh-4rem)]">
          {simulating && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-medium shadow-elevated flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Simulation running…
            </div>
          )}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, n) => setSelectedId(n.id)}
            onPaneClick={() => setSelectedId(null)}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={20} size={1} color="var(--border)" />
            <Controls showInteractive={false} />
            <MiniMap
              nodeColor={() => "var(--primary)"}
              maskColor="oklch(0.97 0.005 264 / 0.7)"
              pannable
              zoomable
            />
          </ReactFlow>
        </div>

        {/* Inspector */}
        <aside className="col-span-12 lg:col-span-3 border-l border-border bg-card/50 p-5 overflow-auto h-[calc(100vh-4rem)]">
          {selected ? (
            <>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Configure block
              </div>
              <div className="mt-3 text-base font-semibold text-foreground">
                {selected.data.label}
              </div>
              <div className="text-xs text-muted-foreground">{selected.data.detail}</div>

              <div className="mt-5 space-y-4">
                <Field label="Block name">
                  <input
                    defaultValue={selected.data.label}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </Field>
                {(["sms", "email", "whatsapp", "ai"] as const).includes(selected.data.kind as never) && (
                  <>
                    <Field label="Recipient">
                      <input
                        placeholder="{{user.phone}} or you@example.com"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </Field>
                    <Field label="Message">
                      <textarea
                        rows={5}
                        defaultValue="Hi {{name}}, your order {{order_id}} has shipped 🚚"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                      />
                    </Field>
                  </>
                )}
                {selected.data.kind === "delay" && (
                  <Field label="Wait for">
                    <div className="flex gap-2">
                      <input defaultValue={60} className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                      <select className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>minutes</option>
                        <option>hours</option>
                        <option>days</option>
                      </select>
                    </div>
                  </Field>
                )}
                {selected.data.kind === "condition" && (
                  <Field label="Condition">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>If previous step delivered</option>
                      <option>If previous step failed</option>
                      <option>If user replied</option>
                    </select>
                  </Field>
                )}
                {selected.data.kind === "trigger" && (
                  <>
                    <Field label="HTTP method">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>POST</option>
                        <option>GET</option>
                      </select>
                    </Field>
                    <Field label="Path">
                      <input defaultValue="/v1/send" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" />
                    </Field>
                  </>
                )}
              </div>
            </>
          ) : (
            <Card className="p-6 text-center">
              <div className="mx-auto h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-medium text-foreground">Select a block</div>
              <p className="text-xs text-muted-foreground mt-1">
                Click any block in the canvas to configure messages, recipients and conditions.
              </p>
            </Card>
          )}
        </aside>
      </main>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}
