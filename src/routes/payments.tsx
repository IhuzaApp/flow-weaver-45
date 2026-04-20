import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, ArrowUpRight, ShieldCheck, RefreshCcw } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Topbar } from "@/components/Topbar";
import { Card, StatCard } from "@/components/Card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments — Relay" },
      { name: "description", content: "Trigger payment requests inside flows. Track pending, successful and failed transactions." },
    ],
  }),
  component: PaymentsPage,
});

const txns = [
  { id: "tx_1f2A", customer: "Alice Chen", amount: 84.0, currency: "USD", status: "successful", method: "Stripe · Card", flow: "Order checkout", at: "2m ago" },
  { id: "tx_92Hx", customer: "James Patel", amount: 42.5, currency: "GBP", status: "pending", method: "Stripe · Card", flow: "Subscription renewal", at: "11m ago" },
  { id: "tx_b7Q3", customer: "Marcus Kim", amount: 12.99, currency: "USD", status: "failed", method: "Apple Pay", flow: "Quick buy", at: "34m ago" },
  { id: "tx_cN82", customer: "Léa Dubois", amount: 156.0, currency: "EUR", status: "successful", method: "Stripe · SEPA", flow: "Annual plan", at: "1h ago" },
  { id: "tx_kP41", customer: "Priya Shah", amount: 9.99, currency: "USD", status: "successful", method: "MTN MoMo", flow: "In-flow upsell", at: "3h ago" },
];

const statusCls: Record<string, string> = {
  successful: "bg-success/15 text-success border-success/20",
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  failed: "bg-destructive/15 text-destructive border-destructive/20",
};

function PaymentsPage() {
  return (
    <AppLayout>
      <Topbar title="Payments" subtitle="Inline payment requests triggered from flows" />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Volume (30d)" value="$84,210" delta={11.4} icon={CreditCard} accent="bg-success/15 text-success" />
          <StatCard label="Successful" value={1_482} delta={6.8} icon={ShieldCheck} accent="bg-success/15 text-success" />
          <StatCard label="Pending" value={42} delta={-1.2} icon={RefreshCcw} accent="bg-warning/15 text-warning-foreground" />
          <StatCard label="Failed" value={28} delta={2.1} icon={ArrowUpRight} accent="bg-destructive/15 text-destructive" />
        </div>

        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Recent transactions</h3>
            <p className="text-xs text-muted-foreground">Triggered from flows · webhooks update status automatically</p>
          </div>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="px-5 py-2.5 font-medium">Customer</th>
                  <th className="px-3 py-2.5 font-medium text-right">Amount</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium">Method</th>
                  <th className="px-3 py-2.5 font-medium">Flow</th>
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
                    <td className="px-3 py-3 text-muted-foreground">{t.flow}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground text-xs">{t.at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-foreground">Payment flow node</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Add a Payment block in any flow to request and confirm payments inline.</p>
          <pre className="mt-4 rounded-lg bg-foreground text-background text-[11px] p-4 font-mono overflow-x-auto">
{`Trigger → AI Agent → Payment ($amount={{cart.total}})
                       ├── on success → Send confirmation (Email + WhatsApp)
                       ├── on pending → Wait 5m → Send reminder
                       └── on failed  → Retry on alternate method`}
          </pre>
        </Card>
      </main>
    </AppLayout>
  );
}
