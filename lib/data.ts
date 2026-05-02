// Static seed data for the CRM mockup.

export type SentimentDot = {
  /** 0..1 horizontal position on the sentiment timeline */
  x: number;
  /** Dot size in px */
  size: number;
  /** Color tone */
  tone: "purple" | "magenta" | "pink-light" | "purple-soft";
  /** Short label that surfaces on hover/focus */
  label: string;
  /** Human-readable date for the event */
  date: string;
};

export type TeamMember = {
  initial: string;
  name: string;
  role: string;
  tone: "blue" | "blue-dark" | "sky" | "muted";
};

export type Deal = {
  id: string;
  name: string;
  subtitle: string;
  unread: number;
  warnings: number;
  sentiment: SentimentDot[];
  team: TeamMember[];
  atRisk?: boolean;
  aiNote?: string;
};

export const TEAM_OWNER = {
  initials: "KM",
  name: "Kate Mandel's team",
  role: "Head of customer success",
  commit: "$2.02M",
};

const DEFAULT_TEAM: TeamMember[] = [
  { initial: "M", name: "Marcus Lee", role: "AE", tone: "sky" },
  { initial: "E", name: "Elena Park", role: "SE", tone: "muted" },
  { initial: "D", name: "Diego Ruiz", role: "CSM", tone: "blue" },
  { initial: "D", name: "Diana Ko", role: "Legal", tone: "blue-dark" },
  { initial: "I", name: "Imani Bell", role: "Manager", tone: "blue" },
  { initial: "C", name: "Carla Vance", role: "AE", tone: "muted" },
  { initial: "C", name: "Chen Wu", role: "SDR", tone: "sky" },
  { initial: "C", name: "Cassidy Lin", role: "Ops", tone: "sky" },
];

export const DEALS: Deal[] = [
  {
    id: "sourcemax",
    name: "Sourcemax",
    subtitle: "Sourcemax \u2014 Inside Business",
    unread: 19,
    warnings: 2,
    atRisk: true,
    aiNote: "Sourcemax is at risk, but I think we can win this deal.",
    sentiment: [
      { x: 0.05, size: 14, tone: "purple", label: "Initial outreach", date: "Jan 06" },
      { x: 0.14, size: 6, tone: "magenta", label: "Discovery call", date: "Jan 09" },
      { x: 0.2, size: 4, tone: "pink-light", label: "Stakeholder added", date: "Jan 13" },
      { x: 0.28, size: 8, tone: "magenta", label: "Demo delivered", date: "Jan 18" },
      { x: 0.36, size: 5, tone: "pink-light", label: "Pricing question", date: "Jan 22" },
      { x: 0.46, size: 12, tone: "purple-soft", label: "Security review", date: "Jan 28" },
      { x: 0.56, size: 14, tone: "purple", label: "CFO objection", date: "Feb 03" },
      { x: 0.68, size: 16, tone: "magenta", label: "Pricing pushback", date: "Feb 10" },
      { x: 0.82, size: 18, tone: "magenta", label: "Decision pending", date: "Feb 18" },
    ],
    team: DEFAULT_TEAM,
  },
  {
    id: "bitforge",
    name: "BitForge",
    subtitle: "BitForge IO",
    unread: 29,
    warnings: 1,
    sentiment: [
      { x: 0.06, size: 8, tone: "magenta", label: "Cold intro", date: "Jan 04" },
      { x: 0.14, size: 12, tone: "purple", label: "Discovery", date: "Jan 11" },
      { x: 0.24, size: 6, tone: "pink-light", label: "Tech evaluation", date: "Jan 18" },
      { x: 0.34, size: 10, tone: "magenta", label: "Procurement loop-in", date: "Jan 25" },
      { x: 0.46, size: 7, tone: "pink-light", label: "Champion identified", date: "Feb 01" },
      { x: 0.58, size: 14, tone: "magenta", label: "Pricing review", date: "Feb 08" },
      { x: 0.7, size: 9, tone: "purple-soft", label: "Deep dive scheduled", date: "Feb 14" },
      { x: 0.82, size: 12, tone: "purple", label: "Verbal commit", date: "Feb 20" },
    ],
    team: DEFAULT_TEAM,
  },
  {
    id: "aventine",
    name: "Aventine",
    subtitle: "Aventine 4.0",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.08, size: 10, tone: "purple-soft", label: "Renewal kickoff", date: "Jan 07" },
      { x: 0.18, size: 6, tone: "pink-light", label: "Health check", date: "Jan 14" },
      { x: 0.3, size: 12, tone: "magenta", label: "Expansion ask", date: "Jan 22" },
      { x: 0.42, size: 5, tone: "pink-light", label: "Legal review", date: "Jan 30" },
      { x: 0.56, size: 9, tone: "purple", label: "Contract redlines", date: "Feb 06" },
      { x: 0.68, size: 7, tone: "magenta", label: "Final pricing", date: "Feb 13" },
      { x: 0.82, size: 11, tone: "purple-soft", label: "Awaiting signature", date: "Feb 20" },
    ],
    team: DEFAULT_TEAM,
  },
  {
    id: "apexmind",
    name: "ApexMind",
    subtitle: "ApexMind 1.2",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.08, size: 8, tone: "purple-soft", label: "Inbound lead", date: "Jan 05" },
      { x: 0.2, size: 10, tone: "magenta", label: "Qualifying call", date: "Jan 12" },
      { x: 0.32, size: 6, tone: "pink-light", label: "POC kickoff", date: "Jan 20" },
      { x: 0.46, size: 12, tone: "magenta", label: "POC results", date: "Jan 28" },
      { x: 0.6, size: 8, tone: "purple", label: "SOW review", date: "Feb 05" },
      { x: 0.74, size: 10, tone: "magenta", label: "Procurement", date: "Feb 12" },
      { x: 0.86, size: 7, tone: "pink-light", label: "Awaiting signoff", date: "Feb 19" },
    ],
    team: DEFAULT_TEAM,
  },
  {
    id: "credax",
    name: "Credax",
    subtitle: "Credax 1.0",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.06, size: 6, tone: "pink-light", label: "Referral intro", date: "Jan 04" },
      { x: 0.18, size: 12, tone: "magenta", label: "Discovery", date: "Jan 11" },
      { x: 0.3, size: 14, tone: "purple-soft", label: "NDA signed", date: "Jan 18" },
      { x: 0.46, size: 10, tone: "magenta", label: "Demo", date: "Jan 27" },
      { x: 0.6, size: 6, tone: "pink-light", label: "Stakeholder map", date: "Feb 03" },
      { x: 0.74, size: 9, tone: "purple-soft", label: "Pricing sent", date: "Feb 10" },
      { x: 0.86, size: 8, tone: "magenta", label: "Negotiation", date: "Feb 18" },
    ],
    team: DEFAULT_TEAM,
  },
  {
    id: "fundex",
    name: "Fundex",
    subtitle: "Fundex 1.0",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.06, size: 8, tone: "magenta", label: "First touch", date: "Jan 06" },
      { x: 0.18, size: 10, tone: "purple-soft", label: "Discovery", date: "Jan 13" },
      { x: 0.3, size: 6, tone: "pink-light", label: "Champion intro", date: "Jan 20" },
      { x: 0.42, size: 12, tone: "magenta", label: "Demo", date: "Jan 28" },
      { x: 0.56, size: 8, tone: "purple", label: "Tech review", date: "Feb 04" },
      { x: 0.7, size: 6, tone: "pink-light", label: "Pricing sent", date: "Feb 11" },
      { x: 0.84, size: 9, tone: "purple-soft", label: "Verbal commit", date: "Feb 19" },
    ],
    team: DEFAULT_TEAM,
  },
];

// Analytics view ----------------------------------------------------------

export const KPI_CARDS = [
  {
    label: "Booking attainment",
    value: "$4.15M",
    progress: 4.15 / 15,
    progressLabel: "$15M",
  },
  { label: "Gap to target", value: "$10.85M" },
  {
    label: "Coverage",
    value: "2.5x",
    secondaryValue: "$27.1M",
    secondaryLabel: "Open Pipeline ($)",
  },
  {
    label: "Total pipeline created",
    value: "$30M",
    progress: 30 / 45,
    progressLabel: "$45M",
  },
];

export const PIPELINE_CHART_DATA = [
  { week: "Jan 06", qualified: 2, proposal: 4, negotiation: 5, closed: 0.5, expansion: 1, forecast: 11, booked: 9 },
  { week: "Jan 13", qualified: 1.5, proposal: 3, negotiation: 4.5, closed: 1, expansion: 1, forecast: 9, booked: 8.5 },
  { week: "Jan 20", qualified: 2, proposal: 3, negotiation: 5, closed: 1, expansion: 1.5, forecast: 12, booked: 9 },
  { week: "Jan 27", qualified: 2.5, proposal: 3.5, negotiation: 5.5, closed: 1, expansion: 1.5, forecast: 13, booked: 9 },
  { week: "Feb 03", qualified: 3, proposal: 4, negotiation: 6, closed: 1.5, expansion: 1.5, forecast: 14, booked: 9.5 },
  { week: "Feb 10", qualified: 3, proposal: 4.5, negotiation: 6.5, closed: 2, expansion: 1.5, forecast: 15, booked: 9.5 },
  { week: "Feb 17", qualified: 2.5, proposal: 4, negotiation: 5, closed: 1.5, expansion: 1.5, forecast: 11.5, booked: 9 },
  { week: "Feb 24", qualified: 2, proposal: 3.5, negotiation: 5, closed: 1.5, expansion: 1.5, forecast: 13, booked: 9.5 },
];

// Insights panel content (default brief) ---------------------------------

export type Brief = {
  obstacles: string[];
  progress: string[];
};

export const INSIGHTS: Brief = {
  obstacles: [
    "There is no clear timeline for a decision from Sourcemax",
    "Sourcemax has raised concerns about buy-in from key decision-makers (IT director and CFO)",
    "Pricing appears to be a significant factor for Sourcemax",
  ],
  progress: [
    "The prospect has confirmed that critical requirements like security, compliance, and scalability are well-addressed by RealityCorp",
    "The prospect has scheduled a \"Technical Deep Dive\" call, showing active engagement and interest",
  ],
};

// Per-thread brief used by the inbox right panel
export const THREAD_INSIGHTS: Record<string, Brief> = {
  sourcemax: INSIGHTS,
  bitforge: {
    obstacles: [
      "Procurement is requesting a 12-month opt-out clause",
      "Champion is on PTO until next Tuesday",
    ],
    progress: [
      "Technical deep-dive scheduled for Friday with the IT director",
      "Verbal alignment from the CTO on the proposed architecture",
    ],
  },
  aventine: {
    obstacles: [
      "Legal redlines on data residency are still open",
    ],
    progress: [
      "Renewal scope confirmed at $480k ARR",
      "Expansion to the EU team approved by the buyer",
    ],
  },
  apexmind: {
    obstacles: [
      "Procurement asked for two minor SOW tweaks",
      "Need to align on a go-live date",
    ],
    progress: [
      "POC results exceeded the success criteria by 22%",
      "Executive sponsor confirmed budget for Q2",
    ],
  },
  credax: {
    obstacles: ["Awaiting countersignature"],
    progress: [
      "Pricing accepted",
      "MSA fully redlined and approved by both sides",
    ],
  },
  pondeix: {
    obstacles: [
      "Buyer asked for references in the same vertical",
    ],
    progress: [
      "Demo received positive feedback from the full evaluation team",
    ],
  },
};
