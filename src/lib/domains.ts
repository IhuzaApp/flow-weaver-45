export type DomainStatus = "active" | "pending" | "expiring" | "transfer";
export type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS";

export type DnsRecord = {
  id: string;
  type: DnsRecordType;
  name: string;
  value: string;
  ttl: number;
  priority?: number;
};

export type Domain = {
  id: string;
  name: string;
  status: DomainStatus;
  registeredAt: string;
  expiresAt: string;
  autoRenew: boolean;
  nameservers: string[];
  sslActive: boolean;
  priceUsd: number;
  records: DnsRecord[];
};

export const domains: Domain[] = [
  {
    id: "d1",
    name: "relaycomms.io",
    status: "active",
    registeredAt: "2024-02-11",
    expiresAt: "2027-02-11",
    autoRenew: true,
    nameservers: ["ns1.relay.dev", "ns2.relay.dev"],
    sslActive: true,
    priceUsd: 32,
    records: [
      { id: "r1", type: "A", name: "@", value: "185.158.133.1", ttl: 3600 },
      { id: "r2", type: "A", name: "www", value: "185.158.133.1", ttl: 3600 },
      { id: "r3", type: "MX", name: "@", value: "mail.relay.dev", ttl: 3600, priority: 10 },
      { id: "r4", type: "TXT", name: "@", value: "v=spf1 include:relay.dev ~all", ttl: 3600 },
      { id: "r5", type: "CNAME", name: "api", value: "edge.relay.dev", ttl: 600 },
    ],
  },
  {
    id: "d2",
    name: "aurorastore.shop",
    status: "active",
    registeredAt: "2024-09-03",
    expiresAt: "2026-09-03",
    autoRenew: true,
    nameservers: ["ns1.relay.dev", "ns2.relay.dev"],
    sslActive: true,
    priceUsd: 24,
    records: [
      { id: "r1", type: "A", name: "@", value: "185.158.133.1", ttl: 3600 },
      { id: "r2", type: "CNAME", name: "shop", value: "shopify-proxy.relay.dev", ttl: 3600 },
    ],
  },
  {
    id: "d3",
    name: "paylink.africa",
    status: "expiring",
    registeredAt: "2023-12-19",
    expiresAt: "2025-12-19",
    autoRenew: false,
    nameservers: ["ns1.relay.dev", "ns2.relay.dev"],
    sslActive: true,
    priceUsd: 48,
    records: [
      { id: "r1", type: "A", name: "@", value: "185.158.133.1", ttl: 3600 },
    ],
  },
  {
    id: "d4",
    name: "northwind-ai.com",
    status: "pending",
    registeredAt: "2026-04-18",
    expiresAt: "2027-04-18",
    autoRenew: true,
    nameservers: ["ns1.relay.dev", "ns2.relay.dev"],
    sslActive: false,
    priceUsd: 14,
    records: [],
  },
];

export const tldPricing = [
  { tld: ".com", price: 12, popular: true },
  { tld: ".io", price: 32, popular: true },
  { tld: ".ai", price: 78 },
  { tld: ".africa", price: 22 },
  { tld: ".shop", price: 9 },
  { tld: ".dev", price: 14 },
  { tld: ".co", price: 28 },
  { tld: ".app", price: 16 },
];
