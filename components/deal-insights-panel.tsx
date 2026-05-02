"use client";

import { MoreVertical, Sparkles, X } from "lucide-react";
import { useState } from "react";
import type { Deal } from "@/lib/data";
import { INSIGHTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AiMascot } from "./ai-mascot";

type Tab = "brief" | "score" | "contacts" | "warnings";

type Props = {
  deal: Deal;
  onClose: () => void;
  onAsk: (prefill?: string) => void;
};

const TABS: { key: Tab; label: string }[] = [
  { key: "brief", label: "Brief" },
  { key: "score", label: "Score" },
  { key: "contacts", label: "Contacts" },
  { key: "warnings", label: "Warnings" },
];

export function DealInsightsPanel({ deal, onClose, onAsk }: Props) {
  const [tab, setTab] = useState<Tab>("brief");

  return (
    <div
      className="absolute inset-0 z-30 flex items-start justify-center bg-foreground/10 px-8 pt-24"
      role="dialog"
      aria-modal="true"
      aria-labelledby="insights-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-card p-6 shadow-2xl ring-1 ring-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2
              id="insights-title"
              className="text-xl font-semibold text-foreground"
            >
              {deal.name}
            </h2>
            <p className="text-sm text-muted-foreground">{deal.subtitle}</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button
              type="button"
              aria-label="More options"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Close panel"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Ask input */}
        <button
          type="button"
          onClick={() => onAsk()}
          className="ai-ring mt-5 flex w-full items-center gap-3 rounded-full bg-card px-5 py-3 text-left text-sm text-muted-foreground transition hover:text-foreground"
        >
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={2.5} />
          <span>Ask anything related to this deal</span>
        </button>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Deal insight sections"
          className="mt-6 flex items-center gap-6 border-b border-border"
        >
          {TABS.map(({ key, label }) => {
            const isActive = key === tab;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(key)}
                className={cn(
                  "relative -mb-px flex items-center gap-1.5 pb-3 text-sm font-medium transition",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {key === "brief" ? (
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                ) : null}
                {label}
                {isActive ? (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-5 rounded-2xl border border-primary/40 bg-card p-5 shadow-[0_8px_24px_-12px_rgba(37,211,102,0.25)]">
          {tab === "brief" ? <BriefContent /> : <EmptyTab tab={tab} />}
        </div>

        {/* Floating mascot */}
        <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2">
          <AiMascot haloed size={64} />
        </div>
      </div>
    </div>
  );
}

function BriefContent() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-foreground">
      <section>
        <h3 className="mb-2 text-base font-semibold">Obstacles</h3>
        <ul className="space-y-1.5">
          {INSIGHTS.obstacles.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-2 text-base font-semibold">Progress</h3>
        <ul className="space-y-1.5">
          {INSIGHTS.progress.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function EmptyTab({ tab }: { tab: Tab }) {
  const COPY: Record<Tab, string> = {
    brief: "",
    score: "Deal health score and stage progression will appear here.",
    contacts: "Stakeholders and decision-makers will appear here.",
    warnings: "Risks and AI-detected red flags will appear here.",
  };
  return (
    <p className="py-6 text-center text-sm text-muted-foreground">
      {COPY[tab]}
    </p>
  );
}
