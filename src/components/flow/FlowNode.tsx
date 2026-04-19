import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import {
  Webhook,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Clock,
  GitBranch,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FlowNodeData = {
  kind: "trigger" | "sms" | "email" | "whatsapp" | "ai" | "delay" | "condition";
  label: string;
  detail?: string;
};

const config: Record<
  FlowNodeData["kind"],
  { icon: typeof Webhook; accent: string; ring: string; tag: string }
> = {
  trigger: { icon: Webhook, accent: "bg-primary/10 text-primary", ring: "ring-primary/30", tag: "Trigger" },
  sms: { icon: Phone, accent: "bg-channel-sms/10 text-channel-sms", ring: "ring-channel-sms/30", tag: "Action" },
  email: { icon: Mail, accent: "bg-channel-email/10 text-channel-email", ring: "ring-channel-email/30", tag: "Action" },
  whatsapp: { icon: MessageSquare, accent: "bg-channel-whatsapp/10 text-channel-whatsapp", ring: "ring-channel-whatsapp/30", tag: "Action" },
  ai: { icon: Sparkles, accent: "bg-channel-ai/10 text-channel-ai", ring: "ring-channel-ai/30", tag: "Action" },
  delay: { icon: Clock, accent: "bg-warning/15 text-warning-foreground", ring: "ring-warning/30", tag: "Logic" },
  condition: { icon: GitBranch, accent: "bg-info/10 text-info", ring: "ring-info/30", tag: "Logic" },
};

export const FlowNode = memo(({ data, selected }: NodeProps<FlowNodeData>) => {
  const c = config[data.kind];
  const Icon = c.icon;
  const isTrigger = data.kind === "trigger";
  return (
    <div
      className={cn(
        "w-60 rounded-xl border border-border bg-card shadow-card transition-all",
        selected && `ring-2 ${c.ring}`,
      )}
    >
      {!isTrigger && <Handle type="target" position={Position.Top} />}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {c.tag}
          </span>
          <button className="text-muted-foreground hover:text-foreground transition">
            <Settings2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-2 flex items-start gap-3">
          <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", c.accent)}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">{data.label}</div>
            {data.detail && (
              <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{data.detail}</div>
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
FlowNode.displayName = "FlowNode";
