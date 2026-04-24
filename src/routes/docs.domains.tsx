import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { DocPage, Step } from "@/components/docs/DocPage";

export const Route = createFileRoute("/docs/domains")({
  head: () => ({
    meta: [
      { title: "Domains — Relay docs" },
      { name: "description", content: "Search 200+ TLDs, buy a domain, and manage DNS, nameservers and SSL." },
    ],
  }),
  component: () => (
    <DocPage
      slug="domains"
      icon={Globe}
      title="Domains"
      intro="Search, buy and manage domains in one place — register, edit DNS, point nameservers and track SSL all from your dashboard."
      cta={{ label: "Open Domains", to: "/domains" }}
    >
      <Step n={1} title="Search & buy">
        <p>Use the search to check availability across 200+ TLDs with live pricing. Add to cart and check out with the same card you use for messaging credits.</p>
      </Step>
      <Step n={2} title="DNS records">
        <p>Edit A, CNAME, MX, TXT records inline. Changes propagate within minutes.</p>
      </Step>
      <Step n={3} title="Nameservers & SSL">
        <p>Switch nameservers, enable auto-renewal, and lock transfers. SSL is managed automatically.</p>
      </Step>
    </DocPage>
  ),
});
