// Static seed data for the CRM mockup.

export type SentimentDot = {
  /** 0..1 horizontal position on the sentiment timeline */
  x: number;
  /** Dot size in px */
  size: number;
  /** Color tone */
  tone: "purple" | "magenta" | "pink-light" | "purple-soft";
};

export type Deal = {
  id: string;
  name: string;
  subtitle: string;
  unread: number;
  warnings: number;
  sentiment: SentimentDot[];
  team: { initial: string; tone: "blue" | "blue-dark" | "sky" | "muted" }[];
  atRisk?: boolean;
  aiNote?: string;
};

export const TEAM_OWNER = {
  initials: "KM",
  name: "Kate Mandel's team",
  role: "Head of customer success",
  commit: "$2.02M",
};

export const DEALS: Deal[] = [
  {
    id: "sourcemax",
    name: "Sourcemax",
    subtitle: "Sourcemax — Inside Business",
    unread: 19,
    warnings: 2,
    atRisk: true,
    aiNote: "Sourcemax is at risk, but I think we can win this deal.",
    sentiment: [
      { x: 0.05, size: 14, tone: "purple" },
      { x: 0.14, size: 6, tone: "magenta" },
      { x: 0.2, size: 4, tone: "pink-light" },
      { x: 0.28, size: 8, tone: "magenta" },
      { x: 0.36, size: 5, tone: "pink-light" },
      { x: 0.46, size: 12, tone: "purple-soft" },
      { x: 0.56, size: 14, tone: "purple" },
      { x: 0.68, size: 16, tone: "magenta" },
      { x: 0.82, size: 18, tone: "magenta" },
    ],
    team: [
      { initial: "M", tone: "sky" },
      { initial: "E", tone: "muted" },
      { initial: "D", tone: "blue" },
      { initial: "D", tone: "blue-dark" },
      { initial: "I", tone: "blue" },
      { initial: "C", tone: "muted" },
      { initial: "C", tone: "sky" },
      { initial: "C", tone: "sky" },
    ],
  },
  {
    id: "bitforge",
    name: "BitForge",
    subtitle: "BitForge IO",
    unread: 29,
    warnings: 1,
    sentiment: [
      { x: 0.06, size: 8, tone: "magenta" },
      { x: 0.14, size: 12, tone: "purple" },
      { x: 0.24, size: 6, tone: "pink-light" },
      { x: 0.34, size: 10, tone: "magenta" },
      { x: 0.46, size: 7, tone: "pink-light" },
      { x: 0.58, size: 14, tone: "magenta" },
      { x: 0.7, size: 9, tone: "purple-soft" },
      { x: 0.82, size: 12, tone: "purple" },
    ],
    team: [
      { initial: "M", tone: "sky" },
      { initial: "E", tone: "muted" },
      { initial: "D", tone: "blue" },
      { initial: "D", tone: "blue-dark" },
      { initial: "I", tone: "blue" },
      { initial: "C", tone: "muted" },
      { initial: "C", tone: "sky" },
      { initial: "C", tone: "sky" },
    ],
  },
  {
    id: "aventine",
    name: "Aventine",
    subtitle: "Aventine 4.0",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.08, size: 10, tone: "purple-soft" },
      { x: 0.18, size: 6, tone: "pink-light" },
      { x: 0.3, size: 12, tone: "magenta" },
      { x: 0.42, size: 5, tone: "pink-light" },
      { x: 0.56, size: 9, tone: "purple" },
      { x: 0.68, size: 7, tone: "magenta" },
      { x: 0.82, size: 11, tone: "purple-soft" },
    ],
    team: [
      { initial: "M", tone: "sky" },
      { initial: "E", tone: "muted" },
      { initial: "D", tone: "blue" },
      { initial: "D", tone: "blue-dark" },
      { initial: "I", tone: "blue" },
      { initial: "C", tone: "muted" },
      { initial: "C", tone: "sky" },
      { initial: "C", tone: "sky" },
    ],
  },
  {
    id: "apexmind",
    name: "ApexMind",
    subtitle: "ApexMind 1.2",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.08, size: 8, tone: "purple-soft" },
      { x: 0.2, size: 10, tone: "magenta" },
      { x: 0.32, size: 6, tone: "pink-light" },
      { x: 0.46, size: 12, tone: "magenta" },
      { x: 0.6, size: 8, tone: "purple" },
      { x: 0.74, size: 10, tone: "magenta" },
      { x: 0.86, size: 7, tone: "pink-light" },
    ],
    team: [
      { initial: "M", tone: "sky" },
      { initial: "E", tone: "muted" },
      { initial: "D", tone: "blue" },
      { initial: "D", tone: "blue-dark" },
      { initial: "I", tone: "blue" },
      { initial: "C", tone: "muted" },
      { initial: "C", tone: "sky" },
      { initial: "C", tone: "sky" },
    ],
  },
  {
    id: "credax",
    name: "Credax",
    subtitle: "Credax 1.0",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.06, size: 6, tone: "pink-light" },
      { x: 0.18, size: 12, tone: "magenta" },
      { x: 0.3, size: 14, tone: "purple-soft" },
      { x: 0.46, size: 10, tone: "magenta" },
      { x: 0.6, size: 6, tone: "pink-light" },
      { x: 0.74, size: 9, tone: "purple-soft" },
      { x: 0.86, size: 8, tone: "magenta" },
    ],
    team: [
      { initial: "M", tone: "sky" },
      { initial: "E", tone: "muted" },
      { initial: "D", tone: "blue" },
      { initial: "D", tone: "blue-dark" },
      { initial: "I", tone: "blue" },
      { initial: "C", tone: "muted" },
      { initial: "C", tone: "sky" },
      { initial: "C", tone: "sky" },
    ],
  },
  {
    id: "fundex",
    name: "Fundex",
    subtitle: "Fundex 1.0",
    unread: 0,
    warnings: 0,
    sentiment: [
      { x: 0.06, size: 8, tone: "magenta" },
      { x: 0.18, size: 10, tone: "purple-soft" },
      { x: 0.3, size: 6, tone: "pink-light" },
      { x: 0.42, size: 12, tone: "magenta" },
      { x: 0.56, size: 8, tone: "purple" },
      { x: 0.7, size: 6, tone: "pink-light" },
      { x: 0.84, size: 9, tone: "purple-soft" },
    ],
    team: [
      { initial: "M", tone: "sky" },
      { initial: "E", tone: "muted" },
      { initial: "D", tone: "blue" },
      { initial: "D", tone: "blue-dark" },
      { initial: "I", tone: "blue" },
      { initial: "C", tone: "muted" },
      { initial: "C", tone: "sky" },
      { initial: "C", tone: "sky" },
    ],
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
  {
    label: "Gap to target",
    value: "$10.85M",
  },
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
  {
    week: "Jan 06",
    qualified: 2,
    proposal: 4,
    negotiation: 5,
    closed: 0.5,
    expansion: 1,
    forecast: 11,
    booked: 9,
  },
  {
    week: "Jan 13",
    qualified: 1.5,
    proposal: 3,
    negotiation: 4.5,
    closed: 1,
    expansion: 1,
    forecast: 9,
    booked: 8.5,
  },
  {
    week: "Jan 20",
    qualified: 2,
    proposal: 3,
    negotiation: 5,
    closed: 1,
    expansion: 1.5,
    forecast: 12,
    booked: 9,
  },
  {
    week: "Jan 27",
    qualified: 2.5,
    proposal: 3.5,
    negotiation: 5.5,
    closed: 1,
    expansion: 1.5,
    forecast: 13,
    booked: 9,
  },
  {
    week: "Feb 03",
    qualified: 3,
    proposal: 4,
    negotiation: 6,
    closed: 1.5,
    expansion: 1.5,
    forecast: 14,
    booked: 9.5,
  },
  {
    week: "Feb 10",
    qualified: 3,
    proposal: 4.5,
    negotiation: 6.5,
    closed: 2,
    expansion: 1.5,
    forecast: 15,
    booked: 9.5,
  },
  {
    week: "Feb 17",
    qualified: 2.5,
    proposal: 4,
    negotiation: 5,
    closed: 1.5,
    expansion: 1.5,
    forecast: 11.5,
    booked: 9,
  },
  {
    week: "Feb 24",
    qualified: 2,
    proposal: 3.5,
    negotiation: 5,
    closed: 1.5,
    expansion: 1.5,
    forecast: 13,
    booked: 9.5,
  },
];

// Insights panel content
export const INSIGHTS = {
  obstacles: [
    "There is no clear timeline for a decision from Sourcemax",
    "Sourcemax has raised concerns about buy-in from key decision-makers (IT director and CFO)",
    "Pricing appears to be a significant factor for Sourcemax",
  ],
  progress: [
    'The prospect has confirmed that critical requirements like security, compliance, and scalability are well-addressed by RealityCorp',
    'The prospect has scheduled a "Technical Deep Dive" call, showing active engagement and interest',
  ],
};
