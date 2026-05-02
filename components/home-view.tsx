"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import type { SidebarKey } from "./sidebar";

type Props = {
  onNavigate: (key: SidebarKey) => void;
  onAsk: () => void;
};

const STATS = [
  { label: "Open deals", value: "12", trend: "+3 this week", Icon: Briefcase },
  { label: "Unread messages", value: "48", trend: "19 from Sourcemax", Icon: MessageCircle },
  { label: "Tasks due today", value: "5", trend: "2 high priority", Icon: ClipboardCheck },
  { label: "Pipeline", value: "$30M", trend: "2.5x coverage", Icon: BarChart3 },
];

const ACTIVITY = [
  {
    title: "Sourcemax flagged at risk",
    detail: "AI detected pricing concerns in last 3 messages",
    time: "12 min ago",
    tone: "warning" as const,
  },
  {
    title: "Karishma replied to BitForge thread",
    detail: "\u201CLooks great \u2014 let\u2019s set the technical deep dive.\u201D",
    time: "1 h ago",
    tone: "info" as const,
  },
  {
    title: "Aventine deal moved to Negotiation",
    detail: "Stage updated by Alex Smith",
    time: "3 h ago",
    tone: "success" as const,
  },
  {
    title: "Credax follow-up sent",
    detail: "Template: pricing breakdown v2",
    time: "Yesterday",
    tone: "info" as const,
  },
];

const QUICK_ACTIONS: { label: string; key: SidebarKey; Icon: typeof Briefcase }[] = [
  { label: "View deals", key: "deals", Icon: Briefcase },
  { label: "Open inbox", key: "messages", Icon: MessageCircle },
  { label: "Today\u2019s tasks", key: "tasks", Icon: ClipboardCheck },
  { label: "Pipeline analytics", key: "analytics", Icon: BarChart3 },
  { label: "Upcoming meetings", key: "calendar", Icon: Calendar },
];

export function HomeView({ onNavigate, onAsk }: Props) {
  return (
    <div className="px-8 pb-12">
      {/* Ask AI banner */}
      <button
        type="button"
        onClick={onAsk}
        className="ai-ring mb-6 flex w-full items-center gap-3 rounded-full bg-card px-5 py-3 text-left text-sm text-muted-foreground transition hover:text-foreground"
      >
        <Sparkles className="h-4 w-4 text-primary" strokeWidth={2.5} />
        <span>Ask anything about your pipeline, deals, or team</span>
      </button>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map(({ label, value, trend, Icon }) => (
          <article
            key={label}
            className="rounded-3xl bg-card p-5 ring-1 ring-border"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              {value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{trend}</div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Activity feed */}
        <section className="rounded-3xl bg-card p-6 ring-1 ring-border lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent activity
            </h2>
            <button
              type="button"
              onClick={() => onNavigate("messages")}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul className="space-y-3">
            {ACTIVITY.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/40 p-4"
              >
                <ToneIcon tone={item.tone} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {item.title}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick actions */}
        <section className="rounded-3xl bg-card p-6 ring-1 ring-border">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Quick actions
          </h2>
          <ul className="space-y-2">
            {QUICK_ACTIONS.map(({ label, key, Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onNavigate(key)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-left text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary-soft/40"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span>{label}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function ToneIcon({ tone }: { tone: "warning" | "info" | "success" }) {
  if (tone === "warning") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef3c7] text-[#92400e]">
        <AlertTriangle className="h-4 w-4" strokeWidth={2.4} />
      </span>
    );
  }
  if (tone === "success") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
        <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
      <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
    </span>
  );
}
