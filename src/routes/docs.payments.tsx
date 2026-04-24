import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { DocPage, Step } from "@/components/docs/DocPage";

export const Route = createFileRoute("/docs/payments")({
  head: () => ({
    meta: [
      { title: "Payments — Relay docs" },
      { name: "description", content: "Take payments inside any conversation — payment nodes, links, or drop-in script." },
    ],
  }),
  component: () => (
    <DocPage
      slug="payments"
      icon={CreditCard}
      title="Payments"
      intro="Get paid wherever the conversation happens. Drop a payment node into a flow, send a payment link over WhatsApp, or embed our drop-in script on your site."
      cta={{ label: "Open Payments", to: "/payments" }}
    >
      <Step n={1} title="In a flow">
        <p>Drag a Payment node onto the canvas, set the amount and currency, and connect it after a confirmation step.</p>
      </Step>
      <Step n={2} title="As a shareable link">
        <p>From Payments, click <strong>New payment link</strong>. Share via any channel — paid status streams back into the dashboard.</p>
      </Step>
      <Step n={3} title="On your website">
        <p>Copy our drop-in <code>{`<script>`}</code> snippet into your site to accept one-time, subscription or domain payments. Everything lands in one ledger.</p>
      </Step>
    </DocPage>
  ),
});
