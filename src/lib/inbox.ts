import type { Channel } from "./mock-data";

export type InboxMessage = {
  id: string;
  from: "customer" | "agent" | "ai";
  text: string;
  timestamp: Date;
};

export type InboxThread = {
  id: string;
  contactName: string;
  contactHandle: string;
  channel: Channel | "instagram";
  status: "open" | "ai-handling" | "needs-human" | "closed";
  unread: number;
  lastActivity: Date;
  assignee?: string;
  tags: string[];
  messages: InboxMessage[];
};

const now = Date.now();
const m = (mins: number) => new Date(now - mins * 60_000);

export const inboxThreads: InboxThread[] = [
  {
    id: "t1",
    contactName: "Alice Chen",
    contactHandle: "@alice.chen",
    channel: "instagram",
    status: "ai-handling",
    unread: 2,
    lastActivity: m(2),
    tags: ["pre-sale", "vip"],
    messages: [
      { id: "m1", from: "customer", text: "Hey! Do you ship the Aurora hoodie to Berlin?", timestamp: m(8) },
      { id: "m2", from: "ai", text: "Hi Alice 👋 Yes — we ship to Germany, usually 3–4 business days via DHL. Want me to share sizing?", timestamp: m(7) },
      { id: "m3", from: "customer", text: "Yes please, I'm usually a M in zip hoodies.", timestamp: m(3) },
      { id: "m4", from: "customer", text: "Also is it warm enough for early winter?", timestamp: m(2) },
    ],
  },
  {
    id: "t2",
    contactName: "James Patel",
    contactHandle: "+44 7700 900812",
    channel: "whatsapp",
    status: "needs-human",
    unread: 1,
    lastActivity: m(11),
    assignee: "Maya R.",
    tags: ["refund"],
    messages: [
      { id: "m1", from: "customer", text: "My order #A2391 hasn't arrived and tracking hasn't moved in 5 days.", timestamp: m(40) },
      { id: "m2", from: "ai", text: "I'm sorry to hear that, James. I've pulled up your order — would you like a refund or a reshipment?", timestamp: m(38) },
      { id: "m3", from: "customer", text: "I want to talk to a human, this is the second time.", timestamp: m(11) },
    ],
  },
  {
    id: "t3",
    contactName: "Léa Dubois",
    contactHandle: "lea@northwind.io",
    channel: "email",
    status: "open",
    unread: 0,
    lastActivity: m(63),
    tags: ["billing"],
    messages: [
      { id: "m1", from: "customer", text: "Could you resend the invoice for INV-204? My accountant lost it.", timestamp: m(80) },
      { id: "m2", from: "agent", text: "Hi Léa — attached. Let me know if you need a different format.", timestamp: m(63) },
    ],
  },
  {
    id: "t4",
    contactName: "Marcus Kim",
    contactHandle: "+1 (628) 555-0199",
    channel: "sms",
    status: "ai-handling",
    unread: 0,
    lastActivity: m(140),
    tags: ["onboarding"],
    messages: [
      { id: "m1", from: "ai", text: "Welcome to Relay, Marcus! Want a 2-min tour of flows?", timestamp: m(150) },
      { id: "m2", from: "customer", text: "yes", timestamp: m(140) },
    ],
  },
  {
    id: "t5",
    contactName: "Priya Shah",
    contactHandle: "@priya.s",
    channel: "instagram",
    status: "closed",
    unread: 0,
    lastActivity: m(720),
    tags: ["resolved"],
    messages: [
      { id: "m1", from: "customer", text: "Got my package, thanks!", timestamp: m(720) },
    ],
  },
];

// Mock AI suggestions (canned, but feel real)
export function suggestReplies(thread: InboxThread): string[] {
  const last = thread.messages[thread.messages.length - 1];
  const text = last.text.toLowerCase();

  if (text.includes("refund") || text.includes("human")) {
    return [
      "I completely understand, James. I'm escalating to our team now — someone will reply within 10 minutes.",
      "I've issued a full refund for order #A2391. You'll see it in 3–5 business days. Anything else?",
      "Let me get a senior agent on this. While you wait, would a 20% credit on your next order help?",
    ];
  }
  if (text.includes("ship") || text.includes("size") || text.includes("warm")) {
    return [
      "M is the right call — runs true to size. The Aurora is rated for ~5°C, perfect for Berlin autumn.",
      "Yes, ships to Berlin in 3–4 days. M fits true to size and is rated for cool weather down to ~5°C.",
      "Great pick! It's 80% cotton / 20% recycled poly — warm but breathable.",
    ];
  }
  if (text.includes("invoice") || text.includes("billing")) {
    return [
      "Sent! Let me know if you need it as a PDF instead of HTML.",
      "Attached. Want me to set up auto-receipts to your accountant directly?",
    ];
  }
  return [
    "Thanks for reaching out! Let me look into that for you.",
    "Got it — give me one moment to pull up your account.",
    "Happy to help! Could you share a bit more detail?",
  ];
}
