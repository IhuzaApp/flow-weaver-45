import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageSquare, Sparkles, Search, Filter } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { channelMeta, messageLogs, statusMeta, type Channel, type Status } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Relay" },
      { name: "description", content: "Browse all sent messages with filters by channel and delivery status." },
    ],
  }),
  component: MessagesPage,
});

const channelIcons = { sms: Phone, email: Mail, whatsapp: MessageSquare, ai: Sparkles };

function MessagesPage() {
  const [channel, setChannel] = useState<Channel | "all">("all");
  const [status, setStatus] = useState<Status | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return messageLogs.filter((m) => {
      if (channel !== "all" && m.channel !== channel) return false;
      if (status !== "all" && m.status !== status) return false;
      if (q && !`${m.recipient} ${m.preview}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [channel, status, q]);

  return (
    <AppLayout>
      <Topbar title="Messages" subtitle={`${filtered.length} of ${messageLogs.length} messages`} />
      <main className="flex-1 p-6 space-y-4">
        <Card className="p-3 flex flex-col md:flex-row gap-2 md:items-center">
          <div className="flex items-center gap-2 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipient or message…"
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={channel} onChange={setChannel as (v: string) => void}>
              <option value="all">All channels</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="ai">AI</option>
            </Select>
            <Select value={status} onChange={setStatus as (v: string) => void}>
              <option value="all">All statuses</option>
              <option value="delivered">Delivered</option>
              <option value="sent">Sent</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </Select>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/50">
                  <th className="px-5 py-3 font-medium">Channel</th>
                  <th className="px-5 py-3 font-medium">Recipient</th>
                  <th className="px-5 py-3 font-medium">Message</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Sent at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((m) => {
                  const Icon = channelIcons[m.channel];
                  const meta = channelMeta[m.channel];
                  const st = statusMeta[m.status];
                  return (
                    <tr key={m.id} className="hover:bg-muted/40 transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("h-7 w-7 rounded-md flex items-center justify-center", meta.bg, meta.color)}>
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-medium text-foreground">{meta.label}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-foreground font-mono text-xs">{m.recipient}</td>
                      <td className="px-5 py-3 text-muted-foreground max-w-md truncate">{m.preview}</td>
                      <td className="px-5 py-3">
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-md border", st.className)}>
                          {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-muted-foreground text-xs">
                        {format(m.timestamp, "MMM d, HH:mm:ss")}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground text-sm">
                      No messages match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </AppLayout>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
    >
      {children}
    </select>
  );
}
