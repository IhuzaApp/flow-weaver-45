import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageSquare, Sparkles, Plus, Copy } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { channelMeta, templates } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Relay" },
      { name: "description", content: "Reusable message templates for OTPs, reminders and notifications." },
    ],
  }),
  component: TemplatesPage,
});

const channelIcons = { sms: Phone, email: Mail, whatsapp: MessageSquare, ai: Sparkles };

function TemplatesPage() {
  return (
    <AppLayout>
      <Topbar
        title="Templates"
        subtitle="Reusable, variable-driven message templates"
        action={
          <button className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 transition shadow-soft">
            <Plus className="h-4 w-4" />
            New template
          </button>
        }
      />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => {
            const Icon = channelIcons[t.channel];
            const meta = channelMeta[t.channel];
            return (
              <Card key={t.id} className="p-5 hover:shadow-elevated transition cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", meta.bg, meta.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md uppercase tracking-wide", meta.bg, meta.color)}>
                    {meta.label}
                  </span>
                </div>
                <div className="mt-4 text-sm font-semibold text-foreground">{t.name}</div>
                <pre className="mt-2 text-xs text-muted-foreground font-mono whitespace-pre-wrap line-clamp-3 bg-muted/40 rounded-md p-2 border border-border">
                  {t.body}
                </pre>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t.uses.toLocaleString()} uses</span>
                  <button className="inline-flex items-center gap-1 text-foreground opacity-0 group-hover:opacity-100 transition">
                    <Copy className="h-3 w-3" />
                    Duplicate
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </AppLayout>
  );
}
