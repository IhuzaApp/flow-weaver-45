import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  Workflow,
  Code2,
  ShieldCheck,
  ArrowRight,
  Check,
  Zap,
  Globe,
  GitBranch,
  Ticket,
  PhoneCall,
  CreditCard,
  Megaphone,
  Plug,
  TerminalSquare,
  Bot,
  Instagram,
  KeyRound,
  Shield,
  Database,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relay — The unified communication & automation platform" },
      {
        name: "description",
        content:
          "Omnichannel messaging, AI agents, support tickets, payments, domains and automations — all from one API and dashboard.",
      },
      { property: "og:title", content: "Relay — One platform for messaging, AI, payments & support" },
      {
        property: "og:description",
        content:
          "SMS, Email, WhatsApp, Instagram, Voice and AI in a single visual flow builder. Plus tickets, automations, payments and domains.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <LogosStrip />
      <ChannelsSection />
      <FlowPreviewSection />
      <AISection />
      <PlatformGrid />
      <AutomationsSection />
      <PaymentsDomainsSection />
      <DeveloperSection />
      <PricingSection />
      <CtaBanner />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Relay</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#channels" className="hover:text-foreground transition">Channels</a>
          <a href="#flows" className="hover:text-foreground transition">Flow Builder</a>
          <a href="#ai" className="hover:text-foreground transition">AI</a>
          <a href="#platform" className="hover:text-foreground transition">Platform</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </nav>
        <div className="flex-1" />
        <ThemeToggle />
        <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary transition">
          Sign in
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background hover:opacity-90 transition shadow-soft"
        >
          Start building
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          New: AI agents, payments gateway & domain management
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground max-w-4xl mx-auto">
          The complete platform to{" "}
          <span className="text-gradient-primary">talk, sell & support</span> customers.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          SMS, Email, WhatsApp, Instagram, Voice and AI — orchestrated in a visual flow builder.
          Plus tickets, automations, payments and domains. One dashboard. One API.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition shadow-elevated"
          >
            Create free account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition shadow-soft"
          >
            View live demo
          </Link>
        </div>

        <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-border bg-card p-3 shadow-elevated">
          <div className="rounded-xl bg-gradient-subtle border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
              <span className="ml-3 text-[11px] text-muted-foreground font-mono">
                POST https://api.relay.dev/v1/send
              </span>
            </div>
            <pre className="text-left text-xs sm:text-sm font-mono text-foreground p-5 overflow-x-auto leading-relaxed">
{`curl -X POST https://api.relay.dev/v1/send \\
  -H "Authorization: Bearer sk_live_••••" \\
  -d '{
    "channel": "whatsapp",
    "to": "+14155550143",
    "template": "order_shipped",
    "vars": { "order_id": "A2391" },
    "fallback": { "channel": "sms", "after": "5m" },
    "ai": { "reply": true, "tone": "friendly" }
  }'`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const logos = ["Northwind", "Acme", "Vercel", "Stripe", "Linear", "Notion"];
  return (
    <div className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
          Trusted by teams shipping at scale
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {logos.map((l) => (
            <span key={l} className="text-base font-semibold text-muted-foreground/70">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChannelsSection() {
  const channels = [
    { icon: Phone, name: "SMS", desc: "Global delivery, short codes, two-way conversations.", color: "channel-sms" },
    { icon: Mail, name: "Email", desc: "Transactional & marketing with rich templates.", color: "channel-email" },
    { icon: MessageSquare, name: "WhatsApp", desc: "Verified business templates and media messages.", color: "channel-whatsapp" },
    { icon: Instagram, name: "Instagram", desc: "Reply to DMs and story mentions automatically.", color: "channel-ai" },
    { icon: PhoneCall, name: "Voice", desc: "Inbound & outbound calls with AI transcription.", color: "channel-sms" },
    { icon: Sparkles, name: "AI", desc: "Generate replies, summaries and routing decisions.", color: "channel-ai" },
  ];
  return (
    <section id="channels" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Channels</div>
        <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Every channel your customers use.
        </h2>
        <p className="mt-3 text-muted-foreground">
          One SDK, one dashboard, one bill. Stop juggling six providers.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {channels.map((c) => (
          <div
            key={c.name}
            className="group rounded-xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
          >
            <div className={cn(`bg-${c.color}/10 text-${c.color}`, "h-10 w-10 rounded-lg flex items-center justify-center")}>
              <c.icon className="h-5 w-5" />
            </div>
            <div className="mt-3.5 text-sm font-semibold text-foreground">{c.name}</div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowPreviewSection() {
  return (
    <section id="flows" className="border-y border-border bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Flow Builder</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Design omnichannel flows like you sketch on a whiteboard.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag triggers, channels, AI agents and conditions onto a canvas. Branch on delivery
            status, fall back to another channel, or hand off to AI — without writing
            orchestration code.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Trigger on any inbound API request or event",
              "Fallback chains: WhatsApp → SMS → Voice",
              "AI agent step for replies, classification or routing",
              "Take payments mid-flow with a single node",
              "Wait, branch, retry — fully visual",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition shadow-soft"
          >
            Open the demo flow
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-elevated">
          <div className="space-y-3">
            <FlowStep icon={Globe} tag="Trigger" title="POST /v1/send" tone="primary" />
            <Connector />
            <FlowStep icon={MessageSquare} tag="Action" title="Send WhatsApp · order_shipped" tone="whatsapp" />
            <Connector />
            <FlowStep icon={GitBranch} tag="Logic" title="If not delivered in 5m" tone="info" />
            <div className="grid grid-cols-2 gap-3">
              <FlowStep icon={Phone} tag="Fallback" title="Send SMS" tone="sms" small />
              <FlowStep icon={Bot} tag="AI Agent" title="Generate reminder" tone="ai" small />
            </div>
            <Connector />
            <FlowStep icon={CreditCard} tag="Action" title="Charge payment · $24.99" tone="email" small />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStep({
  icon: Icon,
  tag,
  title,
  tone,
  small,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  tone: "primary" | "sms" | "email" | "whatsapp" | "ai" | "info";
  small?: boolean;
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    sms: "bg-channel-sms/10 text-channel-sms",
    email: "bg-channel-email/10 text-channel-email",
    whatsapp: "bg-channel-whatsapp/10 text-channel-whatsapp",
    ai: "bg-channel-ai/10 text-channel-ai",
    info: "bg-info/10 text-info",
  };
  return (
    <div className={cn("rounded-xl border border-border bg-background", small ? "p-3" : "p-4")}>
      <div className="flex items-center gap-3">
        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", tones[tone])}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{tag}</div>
          <div className="text-sm font-semibold text-foreground truncate">{title}</div>
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-4 w-px bg-border" />;
}

function AISection() {
  const aiFeatures = [
    "Understand inbound messages across every channel",
    "Suggest replies in your brand voice",
    "Classify intent and route to the right team",
    "Summarize long conversations into one line",
    "Trigger handoff to human when confidence drops",
  ];
  return (
    <section id="ai" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated order-2 lg:order-1">
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <div className="h-8 w-8 rounded-lg bg-channel-ai/10 text-channel-ai flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Relay AI Agent</div>
              <div className="text-[11px] text-muted-foreground">Trained on your help docs</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Online
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3.5 py-2 text-sm max-w-[80%] shadow-soft">
                Hey, I haven't received my order #A2391 yet
              </div>
            </div>
            <div className="flex">
              <div className="rounded-2xl rounded-bl-sm bg-muted text-foreground px-3.5 py-2 text-sm max-w-[80%]">
                I checked your order — it shipped yesterday and arrives Thursday by 8pm. Want me to send tracking via SMS?
              </div>
            </div>
            <div className="flex">
              <div className="rounded-md border border-dashed border-border bg-card px-3 py-2 text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">AI decision:</span> resolved · confidence 0.94 · no handoff needed
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">AI built-in</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            An AI agent that actually knows your business.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drop an AI node into any flow. Relay AI reads incoming messages on every
            channel and responds — or routes — based on what your customers actually need.
          </p>
          <ul className="mt-6 space-y-3">
            {aiFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PlatformGrid() {
  const items = [
    { icon: Workflow, title: "Visual Flow Builder", desc: "Compose triggers, channels, AI and conditions on a canvas." },
    { icon: Bot, title: "AI Agents", desc: "Reply, classify, summarize and route — no prompt engineering." },
    { icon: Ticket, title: "Support Tickets", desc: "Unified inbox with TKT-IDs, priorities and AI-suggested replies." },
    { icon: Zap, title: "Automations", desc: "Pre-built workflows for support, sales and marketing." },
    { icon: Megaphone, title: "Email Campaigns", desc: "Segment audiences and send broadcasts on any channel." },
    { icon: PhoneCall, title: "Voice Support", desc: "Inbound & outbound calls with live transcription." },
    { icon: Plug, title: "Integrations", desc: "Stripe, WhatsApp, Instagram, HubSpot, Slack and more." },
    { icon: TerminalSquare, title: "API Playground", desc: "Test endpoints, save requests, switch environments." },
    { icon: ShieldCheck, title: "Per-project keys", desc: "Scoped API keys, rotation and granular permissions." },
  ];
  return (
    <section id="platform" className="border-y border-border bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Platform</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Everything you need, in one place.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stop stitching together five SaaS tools. Relay covers the entire customer comms stack.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5">
              <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-foreground">{f.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AutomationsSection() {
  const automations = [
    { title: "Auto-tag & route tickets", desc: "AI categorizes new tickets and assigns to the right agent.", category: "Support" },
    { title: "Abandoned cart recovery", desc: "WhatsApp reminder after 1h, email after 24h, SMS after 3 days.", category: "Sales" },
    { title: "After-hours AI handler", desc: "AI agent replies outside business hours, escalates urgent only.", category: "Support" },
    { title: "Welcome sequence", desc: "5-touch onboarding across email and WhatsApp on signup.", category: "Marketing" },
    { title: "Failed payment retry", desc: "Notify customer + retry card on a smart schedule.", category: "Billing" },
    { title: "NPS follow-up", desc: "Survey 7 days after purchase, route detractors to support.", category: "Marketing" },
  ];
  const categoryTone: Record<string, string> = {
    Support: "bg-info/10 text-info border-info/20",
    Sales: "bg-success/10 text-success border-success/20",
    Marketing: "bg-channel-ai/10 text-channel-ai border-channel-ai/20",
    Billing: "bg-warning/10 text-warning border-warning/20",
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:sticky lg:top-24">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Automations</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Pre-built workflows your team can turn on today.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A library of battle-tested automations for support, sales and marketing.
            Customize with one click — or build your own from scratch in the flow builder.
          </p>
          <Link
            to="/automations"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-input bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition shadow-soft"
          >
            Browse all automations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
          {automations.map((a) => (
            <div key={a.title} className="rounded-xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className={cn("inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium", categoryTone[a.category])}>
                  {a.category}
                </span>
                <Zap className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="text-sm font-semibold text-foreground">{a.title}</div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaymentsDomainsSection() {
  return (
    <section className="border-y border-border bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-6">
        {/* Payments */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Payments Gateway</div>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Take payments inside any conversation.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Drop a payment node into a flow, send a payment link over WhatsApp, or
            embed our drop-in script on your website. Subscriptions, one-time and
            domain payments — all in one ledger.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {["Drop-in <script> for any website", "Shareable payment links", "Real-time transaction logs", "Stripe & local processors"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-foreground">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link to="/payments" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Explore payments <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Domains */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div className="h-11 w-11 rounded-lg bg-channel-ai/10 text-channel-ai flex items-center justify-center">
            <Globe className="h-5 w-5" />
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-channel-ai">Domains</div>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Search, buy and manage domains in one place.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Register a domain, edit DNS records (A, CNAME, MX, TXT), point nameservers
            and track SSL — all from your Relay dashboard. Pay with the same card you
            use for messaging credits.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {["Search 200+ TLDs with live pricing", "Full DNS record editor", "Nameserver & SSL management", "Auto-renewal and transfer locks"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-foreground">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link to="/domains" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-channel-ai hover:underline">
            Manage domains <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DeveloperSection() {
  const dev = [
    { icon: Code2, title: "Developer API", desc: "REST + webhooks with cURL snippets you can copy in one click." },
    { icon: KeyRound, title: "Scoped API keys", desc: "Per-project keys, rotation, and granular role-based access." },
    { icon: Layers, title: "Sandbox mode", desc: "Test every flow end-to-end without sending real messages or charges." },
    { icon: Database, title: "Webhooks & events", desc: "Subscribe to delivery, AI decisions, payments and ticket events." },
    { icon: Shield, title: "Admin Console", desc: "Org-wide controls, audit logs, feature flags and impersonation." },
    { icon: Plug, title: "Native integrations", desc: "Stripe, Shopify, HubSpot, Slack, Linear, Zapier — and more." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Built for developers</div>
        <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Production-ready from day one.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dev.map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-soft hover:border-primary/30 transition">
            <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
              <f.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-base font-semibold text-foreground">{f.title}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      desc: "For side projects and prototypes.",
      features: ["5,000 messages / mo", "1 project", "AI replies (limited)", "Community support"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$49",
      suffix: "/mo",
      desc: "For teams shipping in production.",
      features: ["100,000 messages / mo", "Unlimited projects", "Visual flow builder + AI", "Tickets & automations", "Email support"],
      cta: "Start 14-day trial",
      highlight: true,
    },
    {
      name: "Scale",
      price: "Custom",
      desc: "For high-volume and regulated workloads.",
      features: ["Volume pricing", "SLA & SOC 2", "Dedicated routing", "Admin console & audit log", "Slack support"],
      cta: "Contact sales",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="border-y border-border bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Pricing</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Simple, usage-based pricing.
          </h2>
          <p className="mt-3 text-muted-foreground">No setup fees. No per-seat charges. Pay for what you send.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "rounded-2xl border p-6 flex flex-col",
                t.highlight
                  ? "border-primary/40 bg-card shadow-elevated ring-1 ring-primary/20"
                  : "border-border bg-card shadow-soft",
              )}
            >
              {t.highlight && (
                <span className="self-start mb-3 rounded-full bg-primary/10 text-primary text-[11px] font-semibold px-2.5 py-0.5">
                  Most popular
                </span>
              )}
              <div className="text-sm font-semibold text-foreground">{t.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-foreground">{t.price}</span>
                {t.suffix && <span className="text-sm text-muted-foreground">{t.suffix}</span>}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-5 space-y-2.5 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-foreground">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={cn(
                  "mt-6 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition shadow-soft",
                  t.highlight
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-input bg-card text-foreground hover:bg-muted",
                )}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-elevated relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 100%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)",
          }}
        />
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Ship messaging in an afternoon.
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Sign up, grab your API key, and send your first message in under 5 minutes.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition shadow-elevated"
          >
            Create free account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition shadow-soft"
          >
            Explore the dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Relay</span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Status</a>
          <a href="#" className="hover:text-foreground transition">Docs</a>
        </div>
      </div>
    </footer>
  );
}
