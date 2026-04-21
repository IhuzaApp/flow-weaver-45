import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Zap, Search, Play, Pause, MoreHorizontal, ArrowRight, Info } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";
import { automations, automationTemplates, type Automation } from "@/lib/automations";

export const Route = createFileRoute("/automations")({
  head: () => ({
    meta: [
      { title: "Automations — Relay" },
      { name: "description", content: "Set up automations that simplify support, sales, marketing and ops workflows." },
    ],
  }),
  component: AutomationsPage,
});

const categoryTint: Record<Automation["category"], string> = {
  support: "bg-info/15 text-info border-info/20",
  sales: "bg-success/15 text-success border-success/20",
  marketing: "bg-channel-ai/15 text-channel-ai border-channel-ai/20",
  ops: "bg-warning/15 text-warning-foreground border-warning/30",
};

function AutomationsPage() {
  const [list, setList] = useState(automations);
  const [cat, setCat] = useState<"all" | Automation["category"]>("all");
  const filtered = list.filter((a) => cat === "all" || a.category === cat);

  const toggle = (id: string) =>
    setList((l) => l.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));

  const activeCount = list.filter((a) => a.enabled).length;
  const totalRuns = list.reduce((s, a) => s + a.runs30d, 0);

  return (
    <AppLayout>
      <Topbar
        title="Automations"
        subtitle={`${activeCount} active · ${totalRuns.toLocaleString()} runs in 30d`}
        action={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
            <Plus className="h-3.5 w-3.5" /> New automation
          </button>
        }
      />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Tooltip banner */}
        <Card className="p-4 flex items-start gap-3 bg-channel-ai/5 border-channel-ai/20">
          <div className="h-8 w-8 rounded-md bg-channel-ai/15 text-channel-ai flex items-center justify-center shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">What are automations?</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pre-built workflows that run in the background — triage tickets, recover failed payments, welcome new customers, and more. Think of them as small "employees" that never sleep.
            </p>
          </div>
        </Card>

        {/* Templates */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Start from a template</h3>
              <p className="text-xs text-muted-foreground">Ready-to-go automations tailored to your business.</p>
            </div>
            <button className="text-xs text-primary hover:underline">Browse all →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {automationTemplates.map((t) => {
              const I = t.icon;
              return (
                <Card key={t.id} className="p-4 hover:border-primary/40 cursor-pointer group transition">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-md bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                      <I className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-foreground">{t.name}</div>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">{t.uses}</div>
                      <p className="text-xs text-muted-foreground mt-1.5">{t.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition shrink-0" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 rounded-md border border-input bg-card px-2.5 py-1.5 flex-1 min-w-[220px]">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input placeholder="Search automations…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1">
            {(["all", "support", "sales", "marketing", "ops"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium transition border capitalize",
                  cat === c ? "bg-foreground text-background border-transparent" : "bg-card text-muted-foreground border-border hover:text-foreground")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Automation list */}
        <div className="space-y-3">
          {filtered.map((a) => {
            const I = a.icon;
            return (
              <Card key={a.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                    a.enabled ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    <I className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-semibold text-foreground">{a.name}</div>
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize", categoryTint[a.category])}>
                        {a.category}
                      </span>
                      {!a.enabled && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-muted text-muted-foreground border-border">Paused</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{a.description}</p>

                    <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px]">
                      <span className="inline-flex items-center gap-1 rounded bg-accent text-accent-foreground px-1.5 py-0.5 font-medium">
                        <Zap className="h-2.5 w-2.5" /> Trigger: {a.trigger}
                      </span>
                      {a.actions.map((act, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-muted-foreground">
                          <ArrowRight className="h-2.5 w-2.5" />
                          <span className="rounded border border-border bg-card px-1.5 py-0.5">{act}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span><span className="font-semibold text-foreground">{a.runs30d.toLocaleString()}</span> runs · 30d</span>
                      <span><span className="font-semibold text-foreground">{a.successRate}%</span> success</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggle(a.id)}
                      title={a.enabled ? "Pause automation" : "Activate automation"}
                      className={cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition",
                        a.enabled
                          ? "border-input bg-card text-foreground hover:bg-accent"
                          : "border-transparent bg-foreground text-background hover:opacity-90")}
                    >
                      {a.enabled ? <><Pause className="h-3 w-3" /> Pause</> : <><Play className="h-3 w-3" /> Activate</>}
                    </button>
                    <button className="rounded-md border border-input bg-card p-1.5 text-muted-foreground hover:text-foreground transition">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </AppLayout>
  );
}
