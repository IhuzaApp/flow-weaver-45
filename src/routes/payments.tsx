import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard, ArrowUpRight, ShieldCheck, RefreshCcw, Link2, Copy, Check,
  Globe, Plus, Wallet, Code2,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card, StatCard } from "@/components/Card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments Gateway — Relay" },
      { name: "description", content: "Relay Payments Gateway — accept payments on your website and inside flows. Cards, Apple Pay, mobile money." },
    ],
  }),
  component: PaymentsPage,
});

const txns = [
  { id: "tx_1f2A", customer: "Alice Chen", amount: 84.0, currency: "USD", status: "successful", method: "Card · Visa", source: "Website", at: "2m ago" },
  { id: "tx_92Hx", customer: "James Patel", amount: 42.5, currency: "GBP", status: "pending", method: "Card · Mastercard", source: "Subscription", at: "11m ago" },
  { id: "tx_b7Q3", customer: "Marcus Kim", amount: 12.99, currency: "USD", status: "failed", method: "Apple Pay", source: "Flow · Quick buy", at: "34m ago" },
  { id: "tx_cN82", customer: "Léa Dubois", amount: 156.0, currency: "EUR", status: "successful", method: "SEPA", source: "Website", at: "1h ago" },
  { id: "tx_kP41", customer: "Priya Shah", amount: 9.99, currency: "USD", status: "successful", method: "MTN MoMo", source: "Flow · Upsell", at: "3h ago" },
];

const statusCls: Record<string, string> = {
  successful: "bg-success/15 text-success border-success/20",
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  failed: "bg-destructive/15 text-destructive border-destructive/20",
};

type Tab = "overview" | "integrate" | "links" | "settings";

function PaymentsPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);

  const snippet = `<!-- Add Relay Pay to your site -->
<script src="https://pay.relay.dev/v1.js" async></script>
<button
  data-relay-pay
  data-amount="4900"
  data-currency="USD"
  data-product="Pro plan"
  data-publishable-key="pk_live_••••">
  Pay with Relay
</button>`;

  return (
    <AppLayout>
      <Topbar
        title="Payments Gateway"
        subtitle="Accept payments on your website, inside flows, and via shareable links"
        action={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
            <Plus className="h-3.5 w-3.5" /> New payment link
          </button>
        }
      />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border">
          {([
            ["overview", "Overview"],
            ["integrate", "Integrate on website"],
            ["links", "Payment links"],
            ["settings", "Gateway settings"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn("px-3 py-2 text-sm font-medium transition border-b-2 -mb-px",
                tab === id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Volume (30d)" value="$84,210" delta={11.4} icon={CreditCard} accent="bg-success/15 text-success" />
              <StatCard label="Successful" value={1_482} delta={6.8} icon={ShieldCheck} accent="bg-success/15 text-success" />
              <StatCard label="Pending" value={42} delta={-1.2} icon={RefreshCcw} accent="bg-warning/15 text-warning-foreground" />
              <StatCard label="Failed" value={28} delta={2.1} icon={ArrowUpRight} accent="bg-destructive/15 text-destructive" />
            </div>

            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Recent transactions</h3>
                  <p className="text-xs text-muted-foreground">From website, flows, subscriptions and payment links</p>
                </div>
                <Link to="/domains" className="text-xs text-primary hover:underline">Manage domains →</Link>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                      <th className="px-5 py-2.5 font-medium">Customer</th>
                      <th className="px-3 py-2.5 font-medium text-right">Amount</th>
                      <th className="px-3 py-2.5 font-medium">Status</th>
                      <th className="px-3 py-2.5 font-medium">Method</th>
                      <th className="px-3 py-2.5 font-medium">Source</th>
                      <th className="px-5 py-2.5 font-medium text-right">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txns.map((t) => (
                      <tr key={t.id} className="border-b border-border last:border-0 hover:bg-accent/20">
                        <td className="px-5 py-3">
                          <div className="font-medium text-foreground">{t.customer}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{t.id}</div>
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums font-medium text-foreground">
                          {t.currency} {t.amount.toFixed(2)}
                        </td>
                        <td className="px-3 py-3">
                          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize", statusCls[t.status])}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{t.method}</td>
                        <td className="px-3 py-3 text-muted-foreground">{t.source}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground text-xs">{t.at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {tab === "integrate" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-5 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-channel-ai" />
                <h3 className="font-semibold text-foreground">Drop-in checkout</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Paste this snippet into your website to accept payments in minutes.</p>
              <div className="mt-3 rounded-lg bg-foreground text-background p-4 relative">
                <button
                  onClick={() => { navigator.clipboard.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                  className="absolute top-2 right-2 inline-flex items-center gap-1 rounded border border-background/20 bg-background/10 px-2 py-1 text-[10px] font-medium hover:bg-background/20 transition"
                >
                  {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                </button>
                <pre className="text-[11px] font-mono overflow-x-auto pr-16 whitespace-pre">{snippet}</pre>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="font-semibold text-foreground">1. Add script</div>
                  <div className="text-muted-foreground">Paste into your site's &lt;head&gt;.</div>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="font-semibold text-foreground">2. Add button</div>
                  <div className="text-muted-foreground">Set amount, currency and product.</div>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="font-semibold text-foreground">3. Receive webhook</div>
                  <div className="text-muted-foreground">We call your endpoint on success.</div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-success" />
                <h3 className="font-semibold text-foreground">Supported methods</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {["Visa · Mastercard · Amex", "Apple Pay & Google Pay", "SEPA Direct Debit", "MTN MoMo · Airtel Money", "Bank transfer (EU/US)"].map((m) => (
                  <li key={m} className="flex items-center gap-2 text-foreground">
                    <Check className="h-3.5 w-3.5 text-success" /> {m}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-md border border-border bg-accent/30 p-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Fees:</span> 2.9% + $0.30 per successful card charge. Mobile money 1.5%.
              </div>
            </Card>
          </div>
        )}

        {tab === "links" && (
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Payment links</h3>
                <p className="text-xs text-muted-foreground">Shareable checkout links — no code needed. Send over WhatsApp, Email or SMS.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background hover:opacity-90 transition">
                <Plus className="h-3.5 w-3.5" /> Create link
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: "Pro plan — monthly", url: "pay.relay.dev/l/pro-mo", amount: "$49/mo", used: 124 },
                { name: "Aurora Hoodie", url: "pay.relay.dev/l/aurora", amount: "$84.00", used: 56 },
                { name: "Consultation 30min", url: "pay.relay.dev/l/consult30", amount: "$120.00", used: 18 },
              ].map((l) => (
                <div key={l.url} className="flex items-center gap-3 rounded-md border border-border p-3 hover:bg-accent/20 transition">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">{l.name}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">{l.url}</div>
                  </div>
                  <div className="text-sm font-medium text-foreground">{l.amount}</div>
                  <div className="text-xs text-muted-foreground w-20 text-right">{l.used} uses</div>
                  <button className="rounded border border-input bg-card px-2 py-1 text-[11px] font-medium text-foreground hover:bg-accent transition">Copy</button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5">
              <h3 className="font-semibold text-foreground">Payout account</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Where successful payments settle, daily.</p>
              <div className="mt-3 rounded-md border border-border p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-success/15 text-success flex items-center justify-center">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Chase ••2241 · USD</div>
                  <div className="text-[11px] text-muted-foreground">Next payout in 18h · ~$2,410.00</div>
                </div>
                <button className="text-xs text-primary hover:underline">Change</button>
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-foreground">Branding</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Customize the checkout your customers see.</p>
              <div className="mt-3 space-y-2 text-sm">
                <label className="flex items-center justify-between rounded-md border border-border p-2.5">
                  <span className="text-foreground">Business name</span>
                  <span className="text-muted-foreground">Relay Commerce</span>
                </label>
                <label className="flex items-center justify-between rounded-md border border-border p-2.5">
                  <span className="text-foreground">Checkout color</span>
                  <span className="h-5 w-5 rounded-full bg-gradient-primary" />
                </label>
                <label className="flex items-center justify-between rounded-md border border-border p-2.5">
                  <span className="text-foreground">Receipt domain</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Globe className="h-3 w-3" /> relaycomms.io</span>
                </label>
              </div>
            </Card>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
