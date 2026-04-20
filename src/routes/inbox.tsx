import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, MessageSquare, Instagram, Sparkles, Bot, Send,
  Search, Filter, MoreHorizontal, ChevronRight, ArrowUpRight, UserCircle2, Tag, Wand2,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";
import { inboxThreads, suggestReplies, type InboxThread } from "@/lib/inbox";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Support Inbox — Relay" },
      { name: "description", content: "Unified inbox across WhatsApp, Instagram, Email and SMS with AI reply suggestions and human handoff." },
    ],
  }),
  component: InboxPage,
});

const channelIcon = {
  sms: Phone, email: Mail, whatsapp: MessageSquare, instagram: Instagram, ai: Sparkles,
} as const;

const channelTint: Record<string, string> = {
  sms: "bg-channel-sms/10 text-channel-sms",
  email: "bg-channel-email/10 text-channel-email",
  whatsapp: "bg-channel-whatsapp/10 text-channel-whatsapp",
  instagram: "bg-channel-ai/10 text-channel-ai",
  ai: "bg-channel-ai/10 text-channel-ai",
};

const statusBadge: Record<InboxThread["status"], { label: string; cls: string }> = {
  open: { label: "Open", cls: "bg-info/15 text-info border-info/20" },
  "ai-handling": { label: "AI handling", cls: "bg-channel-ai/15 text-channel-ai border-channel-ai/20" },
  "needs-human": { label: "Needs human", cls: "bg-warning/20 text-warning-foreground border-warning/30" },
  closed: { label: "Closed", cls: "bg-muted text-muted-foreground border-border" },
};

function timeAgo(d: Date) {
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.round(mins / 60)}h`;
  return `${Math.round(mins / 1440)}d`;
}

function InboxPage() {
  const [selectedId, setSelectedId] = useState(inboxThreads[0].id);
  const [filter, setFilter] = useState<"all" | "ai-handling" | "needs-human" | "closed">("all");
  const [mode, setMode] = useState<"auto" | "human">("auto");
  const [draft, setDraft] = useState("");

  const threads = inboxThreads.filter((t) => filter === "all" || t.status === filter);
  const selected = inboxThreads.find((t) => t.id === selectedId)!;
  const suggestions = suggestReplies(selected);
  const Icon = channelIcon[selected.channel as keyof typeof channelIcon];

  return (
    <AppLayout>
      <Topbar
        title="Support Inbox"
        subtitle="All channels · 4 open conversations · 2 awaiting human"
        action={
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 rounded-md border border-input bg-card p-0.5 shadow-soft">
              <button
                onClick={() => setMode("auto")}
                className={cn("flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition",
                  mode === "auto" ? "bg-channel-ai/15 text-channel-ai" : "text-muted-foreground hover:text-foreground")}
              >
                <Bot className="h-3.5 w-3.5" /> Auto-reply
              </button>
              <button
                onClick={() => setMode("human")}
                className={cn("flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition",
                  mode === "human" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
              >
                <UserCircle2 className="h-3.5 w-3.5" /> Human only
              </button>
            </div>
          </div>
        }
      />
      <main className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Threads list */}
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 border-r border-border bg-card/40 flex flex-col h-[calc(100vh-4rem)]">
          <div className="p-3 border-b border-border space-y-2">
            <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search conversations…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto">
              {(["all", "ai-handling", "needs-human", "closed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition border",
                    filter === f ? "bg-foreground text-background border-transparent" : "bg-card text-muted-foreground border-border hover:text-foreground")}
                >
                  {f === "all" ? "All" : statusBadge[f].label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {threads.map((t) => {
              const TIcon = channelIcon[t.channel as keyof typeof channelIcon];
              const isActive = t.id === selectedId;
              const lastMsg = t.messages[t.messages.length - 1];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={cn("w-full text-left px-3 py-3 border-b border-border transition flex gap-3",
                    isActive ? "bg-accent/40" : "hover:bg-accent/20")}
                >
                  <div className="relative shrink-0">
                    <div className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                      {t.contactName.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <span className={cn("absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card flex items-center justify-center", channelTint[t.channel])}>
                      <TIcon className="h-2.5 w-2.5" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-foreground truncate">{t.contactName}</div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(t.lastActivity)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {lastMsg.from === "customer" ? "" : lastMsg.from === "ai" ? "🤖 " : "↳ "}
                      {lastMsg.text}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border", statusBadge[t.status].cls)}>
                        {statusBadge[t.status].label}
                      </span>
                      {t.unread > 0 && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary text-primary-foreground">
                          {t.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Conversation */}
        <section className="col-span-12 lg:col-span-5 xl:col-span-6 flex flex-col h-[calc(100vh-4rem)] bg-background">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
            <div className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
              {selected.contactName.split(" ").map((s) => s[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground">{selected.contactName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className={cn("h-4 w-4 rounded flex items-center justify-center", channelTint[selected.channel])}>
                  <Icon className="h-2.5 w-2.5" />
                </span>
                {selected.contactHandle}
              </div>
            </div>
            <span className={cn("text-[11px] font-medium px-2 py-1 rounded border", statusBadge[selected.status].cls)}>
              {statusBadge[selected.status].label}
            </span>
            <button className="rounded-md border border-input bg-card p-1.5 text-muted-foreground hover:text-foreground transition">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-auto px-5 py-6 space-y-4">
            {selected.messages.map((msg) => {
              const isOut = msg.from !== "customer";
              return (
                <div key={msg.id} className={cn("flex", isOut ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-soft",
                    msg.from === "customer" && "bg-card border border-border text-foreground rounded-bl-sm",
                    msg.from === "ai" && "bg-channel-ai/10 border border-channel-ai/20 text-foreground rounded-br-sm",
                    msg.from === "agent" && "bg-foreground text-background rounded-br-sm")}>
                    {msg.from === "ai" && (
                      <div className="flex items-center gap-1 text-[10px] font-medium text-channel-ai mb-1">
                        <Bot className="h-2.5 w-2.5" /> AI Agent
                      </div>
                    )}
                    {msg.text}
                    <div className={cn("mt-1 text-[10px]",
                      msg.from === "agent" ? "text-background/60" : "text-muted-foreground")}>
                      {timeAgo(msg.timestamp)} ago
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI suggestions */}
          <div className="border-t border-border bg-card/40 px-5 py-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Wand2 className="h-3.5 w-3.5 text-channel-ai" />
              <span className="text-[11px] font-semibold text-foreground">AI suggested replies</span>
              <span className="text-[10px] text-muted-foreground">· tap to insert</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setDraft(s)}
                  className="shrink-0 max-w-xs text-left rounded-lg border border-channel-ai/30 bg-channel-ai/5 px-3 py-2 text-xs text-foreground hover:bg-channel-ai/10 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-border bg-background p-4">
            <div className="rounded-xl border border-input bg-card p-2 shadow-soft">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                placeholder={`Reply on ${selected.channel}…`}
                className="w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-channel-ai" />
                  Variables: <code className="text-[10px] font-mono bg-muted px-1 rounded ml-0.5">{`{{name}}`}</code>
                  <code className="text-[10px] font-mono bg-muted px-1 rounded">{`{{order_id}}`}</code>
                </div>
                <button
                  disabled={!draft.trim()}
                  onClick={() => setDraft("")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition disabled:opacity-40"
                >
                  <Send className="h-3 w-3" /> Send
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customer panel */}
        <aside className="hidden xl:flex col-span-3 flex-col border-l border-border bg-card/40 p-5 gap-5 overflow-auto h-[calc(100vh-4rem)]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Contact</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                {selected.contactName.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{selected.contactName}</div>
                <div className="text-xs text-muted-foreground">{selected.contactHandle}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Tags</div>
            <div className="flex flex-wrap gap-1.5">
              {selected.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-md bg-accent text-accent-foreground px-2 py-0.5 text-[11px] font-medium">
                  <Tag className="h-2.5 w-2.5" /> {t}
                </span>
              ))}
            </div>
          </div>

          <Card className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Quick actions</div>
            <div className="mt-3 space-y-2 text-sm">
              <button className="w-full flex items-center justify-between rounded-md px-2.5 py-1.5 hover:bg-accent/40 transition">
                <span className="flex items-center gap-2 text-foreground"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate to support</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between rounded-md px-2.5 py-1.5 hover:bg-accent/40 transition">
                <span className="flex items-center gap-2 text-foreground"><Filter className="h-3.5 w-3.5" /> Run flow on contact</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between rounded-md px-2.5 py-1.5 hover:bg-accent/40 transition">
                <span className="flex items-center gap-2 text-foreground"><Sparkles className="h-3.5 w-3.5 text-channel-ai" /> Summarize with AI</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Recent activity</div>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-success shrink-0" /><span><span className="text-foreground font-medium">Order #A2391</span><span className="text-muted-foreground"> shipped via DHL</span></span></li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-info shrink-0" /><span><span className="text-foreground font-medium">Welcome flow</span><span className="text-muted-foreground"> completed 3d ago</span></span></li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-channel-ai shrink-0" /><span><span className="text-foreground font-medium">AI Agent</span><span className="text-muted-foreground"> handled 4 prior chats</span></span></li>
            </ul>
          </Card>
        </aside>
      </main>
    </AppLayout>
  );
}
