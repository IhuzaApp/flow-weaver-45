import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Workflow,
  MessageSquare,
  KeyRound,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/flows", label: "Flows", icon: Workflow },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/api-keys", label: "API Keys", icon: KeyRound },
  { to: "/templates", label: "Templates", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sidebar-foreground">Relay</span>
          <span className="text-[11px] text-muted-foreground">Unified Comms API</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border bg-card p-4 shadow-soft">
        <div className="text-xs font-medium text-foreground">Free trial</div>
        <div className="mt-1 text-xs text-muted-foreground">
          12,480 of 50,000 messages used
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/4 rounded-full bg-gradient-primary" />
        </div>
        <button className="mt-3 w-full rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
          Upgrade plan
        </button>
      </div>
    </aside>
  );
}
