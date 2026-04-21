import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Globe, Search, Plus, ShieldCheck, Server, RefreshCcw, MoreHorizontal,
  ArrowLeft, Lock, Copy, Check, Trash2,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card, StatCard } from "@/components/Card";
import { cn } from "@/lib/utils";
import { domains, tldPricing, type Domain, type DnsRecordType } from "@/lib/domains";

export const Route = createFileRoute("/domains")({
  head: () => ({
    meta: [
      { title: "Domains — Relay" },
      { name: "description", content: "Register, manage and configure your domains. DNS records, nameservers, SSL and renewals — all in one place." },
    ],
  }),
  component: DomainsPage,
});

const statusCls: Record<Domain["status"], string> = {
  active: "bg-success/15 text-success border-success/20",
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  expiring: "bg-destructive/15 text-destructive border-destructive/20",
  transfer: "bg-info/15 text-info border-info/20",
};

const recordTypeCls: Record<DnsRecordType, string> = {
  A: "bg-info/15 text-info",
  AAAA: "bg-info/15 text-info",
  CNAME: "bg-channel-ai/15 text-channel-ai",
  MX: "bg-warning/15 text-warning-foreground",
  TXT: "bg-muted text-foreground",
  NS: "bg-success/15 text-success",
};

type View = "list" | "detail" | "register";

function DomainsPage() {
  const [view, setView] = useState<View>("list");
  const [selectedId, setSelectedId] = useState<string>(domains[0].id);
  const [query, setQuery] = useState("");
  const selected = domains.find((d) => d.id === selectedId)!;

  return (
    <AppLayout>
      <Topbar
        title="Domains"
        subtitle="Register, manage DNS, nameservers and SSL for your domains"
        action={
          view === "list" && (
            <button
              onClick={() => setView("register")}
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background hover:opacity-90 transition"
            >
              <Plus className="h-3.5 w-3.5" /> Register domain
            </button>
          )
        }
      />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {view === "list" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Domains owned" value={domains.length} icon={Globe} accent="bg-info/15 text-info" />
              <StatCard label="Active" value={domains.filter((d) => d.status === "active").length} icon={ShieldCheck} accent="bg-success/15 text-success" />
              <StatCard label="Expiring soon" value={domains.filter((d) => d.status === "expiring").length} icon={RefreshCcw} accent="bg-destructive/15 text-destructive" />
              <StatCard label="SSL enabled" value={domains.filter((d) => d.sslActive).length} icon={Lock} accent="bg-channel-ai/15 text-channel-ai" />
            </div>

            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Your domains</h3>
                <div className="flex items-center gap-2 rounded-md border border-input bg-card px-2.5 py-1 w-64">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <input placeholder="Filter domains…" className="flex-1 bg-transparent text-xs outline-none" />
                </div>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                      <th className="px-5 py-2.5 font-medium">Domain</th>
                      <th className="px-3 py-2.5 font-medium">Status</th>
                      <th className="px-3 py-2.5 font-medium">SSL</th>
                      <th className="px-3 py-2.5 font-medium">Auto-renew</th>
                      <th className="px-3 py-2.5 font-medium">Expires</th>
                      <th className="px-5 py-2.5 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domains.map((d) => (
                      <tr key={d.id} className="border-b border-border last:border-0 hover:bg-accent/20 cursor-pointer"
                        onClick={() => { setSelectedId(d.id); setView("detail"); }}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold text-foreground">{d.name}</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">Registered {d.registeredAt}</div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize", statusCls[d.status])}>
                            {d.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          {d.sslActive ? (
                            <span className="inline-flex items-center gap-1 text-xs text-success"><Lock className="h-3 w-3" /> Active</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">Provisioning…</span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-xs text-muted-foreground">{d.autoRenew ? "On" : "Off"}</td>
                        <td className="px-3 py-3 text-xs text-muted-foreground">{d.expiresAt}</td>
                        <td className="px-5 py-3 text-right">
                          <button className="rounded-md border border-input bg-card p-1.5 text-muted-foreground hover:text-foreground transition">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {view === "register" && (
          <div className="space-y-4 max-w-3xl">
            <button onClick={() => setView("list")} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to domains
            </button>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground">Find your perfect domain</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Search across hundreds of extensions. We handle DNS, SSL and renewals automatically.</p>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-input bg-background p-1.5 shadow-soft">
                <Search className="h-4 w-4 text-muted-foreground ml-2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. mybrand"
                  className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button className="rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition">
                  Search
                </button>
              </div>

              {query && (
                <div className="mt-5 space-y-2">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Available</div>
                  {tldPricing.map((t) => (
                    <div key={t.tld} className="flex items-center gap-3 rounded-md border border-border p-3 hover:bg-accent/20 transition">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">
                          {query}
                          <span className="text-muted-foreground">{t.tld}</span>
                        </div>
                        {t.popular && <div className="text-[10px] text-success font-medium">Popular choice</div>}
                      </div>
                      <div className="text-sm font-medium text-foreground">${t.price}<span className="text-xs text-muted-foreground">/yr</span></div>
                      <button className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
                        Register
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {view === "detail" && (
          <div className="space-y-5">
            <button onClick={() => setView("list")} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to domains
            </button>

            <Card className="p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">{selected.name}</h2>
                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize", statusCls[selected.status])}>
                      {selected.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Registered {selected.registeredAt} · Expires {selected.expiresAt} · {selected.autoRenew ? "Auto-renew on" : "Auto-renew off"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition">
                    <RefreshCcw className="h-3.5 w-3.5" /> Renew
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-card px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition">
                    <Trash2 className="h-3.5 w-3.5" /> Release
                  </button>
                </div>
              </div>
            </Card>

            {/* Nameservers */}
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Nameservers</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">DNS authority for this domain. Using Relay's nameservers for automatic SSL & routing.</p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                {selected.nameservers.map((ns) => (
                  <div key={ns} className="flex items-center gap-2 rounded-md border border-border bg-card p-2.5">
                    <Server className="h-3.5 w-3.5 text-muted-foreground" />
                    <code className="flex-1 text-xs font-mono text-foreground">{ns}</code>
                    <button className="text-muted-foreground hover:text-foreground transition" title="Copy">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-xs text-primary hover:underline">Use custom nameservers instead</button>
            </Card>

            {/* DNS records */}
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">DNS records</h3>
                  <p className="text-xs text-muted-foreground">A, CNAME, MX, TXT and more. Changes propagate in ~60s.</p>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
                  <Plus className="h-3.5 w-3.5" /> Add record
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                      <th className="px-5 py-2.5 font-medium">Type</th>
                      <th className="px-3 py-2.5 font-medium">Name</th>
                      <th className="px-3 py-2.5 font-medium">Value</th>
                      <th className="px-3 py-2.5 font-medium">TTL</th>
                      <th className="px-5 py-2.5 font-medium text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.records.length === 0 && (
                      <tr><td colSpan={5} className="px-5 py-8 text-center text-xs text-muted-foreground">No DNS records yet. Add one to get started.</td></tr>
                    )}
                    {selected.records.map((r) => (
                      <tr key={r.id} className="border-b border-border last:border-0 hover:bg-accent/20">
                        <td className="px-5 py-3">
                          <span className={cn("text-[10px] font-mono font-medium px-1.5 py-0.5 rounded", recordTypeCls[r.type])}>
                            {r.type}
                          </span>
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-foreground">{r.name}</td>
                        <td className="px-3 py-3 font-mono text-xs text-muted-foreground truncate max-w-sm">
                          {r.value}{r.priority !== undefined && <span className="ml-2 text-[10px]">prio {r.priority}</span>}
                        </td>
                        <td className="px-3 py-3 text-xs text-muted-foreground">{r.ttl}s</td>
                        <td className="px-5 py-3 text-right">
                          <button className="rounded-md border border-input bg-card p-1.5 text-muted-foreground hover:text-foreground transition">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* SSL */}
            <Card className="p-5 flex items-center gap-4">
              <div className={cn("h-10 w-10 rounded-md flex items-center justify-center",
                selected.sslActive ? "bg-success/15 text-success" : "bg-muted text-muted-foreground")}>
                <Lock className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">SSL certificate {selected.sslActive ? "active" : "provisioning"}</div>
                <div className="text-xs text-muted-foreground">
                  {selected.sslActive
                    ? "Let's Encrypt · auto-renews 30 days before expiry."
                    : "Certificate is being issued. Usually takes 2–10 minutes after DNS propagates."}
                </div>
              </div>
              {selected.sslActive && <Check className="h-5 w-5 text-success" />}
            </Card>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
