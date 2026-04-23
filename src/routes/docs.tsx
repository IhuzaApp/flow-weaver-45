import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Workflow,
  Zap,
  Users,
  ClipboardList,
  FileText,
  CreditCard,
  Globe,
  Ticket,
  PhoneCall,
  KeyRound,
  Code2,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — Relay" },
      { name: "description", content: "Learn how to set up and use every Relay feature: projects, flows, automations, contacts, surveys, payments and more." },
      { property: "og:title", content: "Docs — Relay" },
      { property: "og:description", content: "Step-by-step guides for every Relay feature." },
    ],
  }),
  component: DocsPage,
});

const sections = [
  {
    id: "getting-started",
    icon: Sparkles,
    title: "Getting started",
    body: [
      "1. Sign up for a free Relay account.",
      "2. Open the dashboard — you'll land on a sandbox project with sample data.",
      "3. Use the project switcher in the sidebar to create or switch between projects.",
      "4. Generate an API key under API Keys for your first project, then send a test message from the API Playground.",
    ],
  },
  {
    id: "projects",
    icon: Sparkles,
    title: "Projects",
    body: [
      "Each Project isolates flows, API keys and environment variables. Click 'New project' on the Projects page to create one.",
      "Pick an environment (development, staging, production) — Relay uses this to label runs and route logs.",
      "All API requests run scoped to the project that owns the key.",
    ],
    cta: { label: "Open Projects", to: "/projects" },
  },
  {
    id: "flows",
    icon: Workflow,
    title: "Flows & the visual builder",
    body: [
      "A Flow is a series of steps that runs when a trigger fires. Build it visually by dragging blocks onto the canvas.",
      "Need to add resources like phone numbers, links or a shared folder? Open Flows & Automations and click 'New flow' — the form lets you attach any resource the flow needs.",
      "Common triggers: API request, inbound message, webhook, schedule, form submission, payment event.",
      "Add fallbacks so messages always get through: WhatsApp → SMS → Voice.",
    ],
    cta: { label: "Open the builder", to: "/flows" },
  },
  {
    id: "automations",
    icon: Zap,
    title: "Automations",
    body: [
      "Automations are pre-built flow recipes for support, sales, marketing and ops.",
      "Browse the Automations page, pick a template, and click 'New automation' to customize it for your business.",
      "Toggle Active/Paused at any time. All runs are logged.",
    ],
    cta: { label: "Open Automations", to: "/automations" },
  },
  {
    id: "templates",
    icon: FileText,
    title: "Message templates",
    body: [
      "Templates are reusable, variable-driven messages for SMS, Email, WhatsApp and AI replies.",
      "Use {{variables}} to personalize, e.g. 'Hi {{name}}, your order {{order_id}} shipped'.",
      "Click 'New template' on the Templates page to create your own — pick a channel, write the body, list your variables.",
    ],
    cta: { label: "Open Templates", to: "/templates" },
  },
  {
    id: "contacts",
    icon: Users,
    title: "Contacts",
    body: [
      "Store everyone you want to reach in one place. Each contact has an email, phone, optional WhatsApp number, tags and notes.",
      "Import a CSV with columns: name, email, phone, whatsapp, company, tags, notes.",
      "Export at any time as CSV — the data is yours.",
      "Tag contacts (vip, trial, newsletter…) and use tags later to send targeted surveys or campaigns.",
    ],
    cta: { label: "Open Contacts", to: "/contacts" },
  },
  {
    id: "surveys",
    icon: ClipboardList,
    title: "Surveys",
    body: [
      "Build a survey with short text, long text, single choice, multiple choice, rating or email questions.",
      "When you publish, Relay generates a shareable public link (/s/{id}). Send it via Email, SMS, WhatsApp or paste it anywhere.",
      "Responses appear in real time on the Surveys page.",
    ],
    cta: { label: "Open Surveys", to: "/surveys" },
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Payments",
    body: [
      "Take payments inside any conversation: drop a payment node into a flow, send a payment link over WhatsApp, or embed our drop-in script on your site.",
      "Subscriptions, one-time and domain payments all live in one ledger.",
    ],
    cta: { label: "Open Payments", to: "/payments" },
  },
  {
    id: "domains",
    icon: Globe,
    title: "Domains",
    body: [
      "Search 200+ TLDs, buy a domain, and manage DNS, nameservers and SSL — all from your dashboard.",
    ],
    cta: { label: "Open Domains", to: "/domains" },
  },
  {
    id: "tickets",
    icon: Ticket,
    title: "Support tickets",
    body: [
      "Every inbound message can become a ticket. Tickets have a TKT-ID, priority, owner and AI-suggested first reply.",
    ],
    cta: { label: "Open Tickets", to: "/tickets" },
  },
  {
    id: "voice",
    icon: PhoneCall,
    title: "Voice support",
    body: [
      "Inbound and outbound calls with live transcription and AI summaries.",
    ],
    cta: { label: "Open Voice", to: "/voice" },
  },
  {
    id: "api-keys",
    icon: KeyRound,
    title: "API keys & environments",
    body: [
      "Each project has its own keys. Rotate any key from the API Keys page.",
      "Use environment variables (Env Variables page) to keep secrets out of code.",
    ],
    cta: { label: "Open API Keys", to: "/api-keys" },
  },
  {
    id: "developer-api",
    icon: Code2,
    title: "Developer API",
    body: [
      "REST endpoints with copy-paste cURL snippets. Webhooks for delivery, AI decisions, payments and ticket events.",
      "Try requests in the API Playground without writing any client code.",
    ],
    cta: { label: "Open Developer API", to: "/dev-api" },
  },
];

function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Relay</span>
            <span className="text-xs text-muted-foreground">· Docs</span>
          </Link>
          <div className="flex-1" />
          <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition">
            Open dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block sticky top-24 self-start">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            On this page
          </div>
          <nav className="space-y-1 text-sm">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-md px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 space-y-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Documentation</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Everything you need to set up Relay for your business. Each section explains a feature
              and links you straight to it in the dashboard.
            </p>
          </div>

          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.id} id={s.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft scroll-mt-24">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
                </div>
                <div className="mt-4 space-y-2.5 text-sm text-foreground leading-relaxed">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {"cta" in s && s.cta && (
                  <Link
                    to={s.cta.to}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background hover:opacity-90 transition shadow-soft"
                  >
                    {s.cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </section>
            );
          })}
        </article>
      </main>
    </div>
  );
}
