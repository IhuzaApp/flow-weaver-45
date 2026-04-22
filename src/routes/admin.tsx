import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Shield,
  Users,
  Activity,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Flag,
  ScrollText,
  Server,
  Search,
  MoreHorizontal,
  TrendingUp,
  Database,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, StatCard } from "@/components/Card";
import { cn } from "@/lib/utils";
import {
  adminUsers,
  systemServices,
  featureFlags as initialFlags,
  auditEvents,
  platformStats,
  revenueTrend,
} from "@/lib/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Relay" },
      { name: "description", content: "Platform admin dashboard for Relay." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "users" | "system" | "billing" | "flags" | "audit";

const tabs: Array<{ id: Tab; label: string; icon: typeof Users }> = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "users", label: "Users & Orgs", icon: Users },
  { id: "system", label: "System Health", icon: Server },
  { id: "billing", label: "Billing", icon: DollarSign },
  { id: "flags", label: "Feature Flags", icon: Flag },
  { id: "audit", label: "Audit Log", icon: ScrollText },
];

function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [flags, setFlags] = useState(initialFlags);
  const [query, setQuery] = useState("");

  const filteredUsers = adminUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  );

  const currentLabel = tabs.find((t) => t.id === tab)?.label ?? "Overview";

  return (
    <AdminLayout activeTab={tab} onTabChange={(id) => setTab(id as Tab)}>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur px-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-foreground truncate flex items-center gap-2">
            <Shield className="h-4 w-4 text-destructive" />
            Admin · {currentLabel}
          </h1>
          <p className="text-xs text-muted-foreground truncate">
            Platform-wide controls · restricted access
          </p>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-[11px] font-medium text-destructive">
          <AlertTriangle className="h-3 w-3" />
          Super-admin
        </span>
        <div className="h-8 w-8 rounded-full bg-destructive/15 border border-destructive/30 text-destructive text-xs font-semibold flex items-center justify-center">
          SA
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-6 max-w-[1400px]">
          {tab === "overview" && <OverviewTab />}
          {tab === "users" && (
            <UsersTab query={query} setQuery={setQuery} users={filteredUsers} />
          )}
          {tab === "system" && <SystemTab />}
          {tab === "billing" && <BillingTab />}
          {tab === "flags" && <FlagsTab flags={flags} setFlags={setFlags} />}
          {tab === "audit" && <AuditTab />}
        </div>
      </main>
    </AdminLayout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total users" value={platformStats.totalUsers.toLocaleString()} icon={Users} delta={3.1} />
        <StatCard label="Active users (30d)" value={platformStats.activeUsers.toLocaleString()} icon={Activity} delta={2.4} />
        <StatCard label="Platform MRR" value={`$${(platformStats.mrr / 1000).toFixed(1)}k`} icon={DollarSign} delta={10.9} />
        <StatCard label="Error rate (24h)" value={`${platformStats.errorRate}%`} icon={AlertTriangle} delta={-0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Revenue (MRR)</h3>
              <p className="text-xs text-muted-foreground">Monthly recurring revenue across all plans</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-channel-ai">
              <TrendingUp className="h-3.5 w-3.5" /> +64% YoY
            </span>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="mrr" stroke="hsl(var(--primary))" fill="url(#mrrGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-3">Today's volume</h3>
          <div className="space-y-3">
            <VolumeRow label="Messages sent" value={platformStats.messagesToday.toLocaleString()} icon={Activity} />
            <VolumeRow label="API calls" value={platformStats.apiCallsToday.toLocaleString()} icon={Server} />
            <VolumeRow label="Organizations" value={platformStats.totalOrgs.toLocaleString()} icon={Shield} />
            <VolumeRow label="Storage used" value={`${platformStats.storageGb} GB`} icon={Database} />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Service status</h3>
          <span className="text-xs text-muted-foreground">Last check: 30s ago</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {systemServices.slice(0, 8).map((s) => (
            <ServicePill key={s.id} service={s} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function VolumeRow({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Users }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <span className="text-sm font-semibold text-foreground tabular-nums">{value}</span>
    </div>
  );
}

function ServicePill({ service }: { service: typeof systemServices[number] }) {
  const statusColor =
    service.status === "operational"
      ? "text-channel-ai"
      : service.status === "degraded"
        ? "text-channel-sms"
        : "text-destructive";
  const StatusIcon =
    service.status === "operational" ? CheckCircle2 : service.status === "degraded" ? AlertTriangle : XCircle;

  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-card/50 px-3 py-2">
      <div className="min-w-0">
        <div className="text-xs font-medium text-foreground truncate">{service.name}</div>
        <div className="text-[11px] text-muted-foreground tabular-nums">
          {service.uptime}% · {service.latency}ms
        </div>
      </div>
      <StatusIcon className={cn("h-4 w-4 shrink-0", statusColor)} />
    </div>
  );
}

function UsersTab({
  query,
  setQuery,
  users,
}: {
  query: string;
  setQuery: (s: string) => void;
  users: typeof adminUsers;
}) {
  const planColor: Record<string, string> = {
    free: "bg-muted text-muted-foreground",
    starter: "bg-primary/10 text-primary",
    growth: "bg-channel-whatsapp/10 text-channel-whatsapp",
    enterprise: "bg-channel-ai/10 text-channel-ai",
  };
  const statusColor: Record<string, string> = {
    active: "bg-channel-ai/10 text-channel-ai",
    suspended: "bg-destructive/10 text-destructive",
    invited: "bg-channel-sms/10 text-channel-sms",
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-foreground">All users</h3>
          <p className="text-xs text-muted-foreground">
            {users.length} user{users.length === 1 ? "" : "s"} across all organizations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users…"
              className="pl-8 pr-3 py-1.5 text-xs rounded-md border border-border bg-background w-56 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90">
            Invite admin
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left font-medium py-2 px-2">User</th>
              <th className="text-left font-medium py-2 px-2">Role</th>
              <th className="text-left font-medium py-2 px-2">Plan</th>
              <th className="text-left font-medium py-2 px-2">Status</th>
              <th className="text-left font-medium py-2 px-2">MRR</th>
              <th className="text-left font-medium py-2 px-2">Last active</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0 hover:bg-accent/30">
                <td className="py-2.5 px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-[10px] font-semibold">
                      {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground text-xs">{u.name}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-2 text-xs text-foreground capitalize">{u.role}</td>
                <td className="py-2.5 px-2">
                  <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium capitalize", planColor[u.plan])}>
                    {u.plan}
                  </span>
                </td>
                <td className="py-2.5 px-2">
                  <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium capitalize", statusColor[u.status])}>
                    {u.status}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-xs tabular-nums text-foreground">${u.mrr}</td>
                <td className="py-2.5 px-2 text-xs text-muted-foreground">{u.lastActive}</td>
                <td className="py-2.5 px-2">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function SystemTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systemServices.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ServicePill service={s} />
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Uptime 30d</div>
                <div className="text-sm font-semibold text-foreground">{s.uptime}%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">p95 Latency</div>
                <div className="text-sm font-semibold text-foreground">{s.latency}ms</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</div>
                <div className="text-sm font-semibold text-foreground capitalize">{s.status}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BillingTab() {
  const plans = [
    { name: "Free", users: 1820, mrr: 0, color: "bg-muted" },
    { name: "Starter", users: 1490, mrr: 14_750, color: "bg-primary" },
    { name: "Growth", users: 782, mrr: 78_200, color: "bg-channel-whatsapp" },
    { name: "Enterprise", users: 126, mrr: 91_280, color: "bg-channel-ai" },
  ];
  const total = plans.reduce((a, p) => a + p.mrr, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="MRR" value={`$${(total / 1000).toFixed(1)}k`} icon={DollarSign} />
        <StatCard label="ARR (est.)" value={`$${((total * 12) / 1_000_000).toFixed(2)}M`} icon={TrendingUp} />
        <StatCard label="Paying accounts" value={(plans[1].users + plans[2].users + plans[3].users).toLocaleString()} icon={Users} />
        <StatCard label="Churn (30d)" value="2.1%" icon={AlertTriangle} />
      </div>
      <Card>
        <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by plan</h3>
        <div className="space-y-3">
          {plans.map((p) => {
            const pct = total === 0 ? 0 : (p.mrr / total) * 100;
            return (
              <div key={p.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {p.users.toLocaleString()} users · ${p.mrr.toLocaleString()}/mo
                  </span>
                </div>
                <div className="h-2 rounded bg-muted overflow-hidden">
                  <div className={cn("h-full rounded", p.color)} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function FlagsTab({
  flags,
  setFlags,
}: {
  flags: typeof initialFlags;
  setFlags: (f: typeof initialFlags) => void;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Feature flags</h3>
          <p className="text-xs text-muted-foreground">Gradually roll out features to a percentage of users</p>
        </div>
        <button className="rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90">
          New flag
        </button>
      </div>
      <div className="divide-y divide-border">
        {flags.map((f) => (
          <div key={f.id} className="py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono font-semibold text-foreground">{f.key}</code>
                {f.enabled && (
                  <span className="inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium bg-channel-ai/10 text-channel-ai">
                    LIVE
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{f.description}</div>
            </div>
            <div className="flex items-center gap-3 w-64">
              <input
                type="range"
                min={0}
                max={100}
                value={f.rollout}
                onChange={(e) =>
                  setFlags(flags.map((x) => (x.id === f.id ? { ...x, rollout: Number(e.target.value) } : x)))
                }
                className="flex-1 accent-primary"
                disabled={!f.enabled}
              />
              <span className="text-xs tabular-nums text-foreground w-10 text-right">{f.rollout}%</span>
            </div>
            <button
              onClick={() => setFlags(flags.map((x) => (x.id === f.id ? { ...x, enabled: !x.enabled } : x)))}
              className={cn(
                "relative h-5 w-9 rounded-full transition-colors",
                f.enabled ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-4 w-4 rounded-full bg-background shadow transition-transform",
                  f.enabled ? "translate-x-4" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AuditTab() {
  const sevColor: Record<string, string> = {
    info: "bg-muted text-muted-foreground",
    warning: "bg-channel-sms/10 text-channel-sms",
    critical: "bg-destructive/10 text-destructive",
  };
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Audit log</h3>
          <p className="text-xs text-muted-foreground">Every security-relevant action across the platform</p>
        </div>
        <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent">
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left font-medium py-2 px-2">When</th>
              <th className="text-left font-medium py-2 px-2">Actor</th>
              <th className="text-left font-medium py-2 px-2">Action</th>
              <th className="text-left font-medium py-2 px-2">Target</th>
              <th className="text-left font-medium py-2 px-2">IP</th>
              <th className="text-left font-medium py-2 px-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {auditEvents.map((e) => (
              <tr key={e.id} className="border-b border-border last:border-0 hover:bg-accent/30">
                <td className="py-2.5 px-2 text-xs text-muted-foreground whitespace-nowrap">{e.at}</td>
                <td className="py-2.5 px-2 text-xs font-medium text-foreground">{e.actor}</td>
                <td className="py-2.5 px-2 text-xs">
                  <code className="font-mono text-foreground">{e.action}</code>
                </td>
                <td className="py-2.5 px-2 text-xs text-muted-foreground">{e.target}</td>
                <td className="py-2.5 px-2 text-xs text-muted-foreground tabular-nums">{e.ip}</td>
                <td className="py-2.5 px-2">
                  <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium capitalize", sevColor[e.severity])}>
                    {e.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
