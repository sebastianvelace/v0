"use client";

import { AlertTriangle, ArrowUpRight, MessageSquare, PenLine } from "lucide-react";
import { useState } from "react";
import type { Deal, TeamMember } from "@/lib/data";
import { DEALS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AiTooltip } from "./ai-tooltip";
import { SentimentTimeline } from "./sentiment-timeline";

type Props = {
  selectedId: string | null;
  onSelect: (deal: Deal) => void;
  onCompose?: (deal: Deal) => void;
  /** When true a deal row appears focused with the AI tooltip overlay */
  focusFirst?: boolean;
};

const TEAM_TONES: Record<TeamMember["tone"], string> = {
  blue: "bg-[#3b82f6] text-white",
  "blue-dark": "bg-[#2563eb] text-white",
  sky: "bg-[#7dd3fc] text-[#0c4a6e]",
  muted: "bg-[#e2e8f0] text-[#475569]",
};

type ActiveMember = { dealId: string; idx: number };

export function DealsList({ selectedId, onSelect, onCompose, focusFirst = true }: Props) {
  const [activeMember, setActiveMember] = useState<ActiveMember | null>(null);

  return (
    <div className="relative px-8 pb-12">
      {/* Header row */}
      <div className="grid grid-cols-[minmax(0,1.4fr)_72px_72px_minmax(0,2fr)_minmax(0,2.2fr)_88px] items-center gap-6 border-b border-border px-4 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Account</span>
        <span className="text-center">Unread</span>
        <span className="text-center">Risk</span>
        <span>Sentiment timeline</span>
        <span className="text-right">Team</span>
        <span className="text-right">Actions</span>
      </div>

      <ul className="divide-y divide-border">
        {DEALS.map((deal, idx) => {
          const isSelected = selectedId === deal.id;
          const isFocused = focusFirst && idx === 0;
          const isDimmed = focusFirst && idx > 0 && !isSelected;
          return (
            <li key={deal.id} className="group relative">
              <div
                className={cn(
                  "grid w-full grid-cols-[minmax(0,1.4fr)_72px_72px_minmax(0,2fr)_minmax(0,2.2fr)_88px] items-center gap-6 rounded-2xl px-4 py-5 text-left transition",
                  isFocused &&
                    "relative z-10 ring-2 ring-primary ring-offset-2 ring-offset-background",
                  isSelected &&
                    !isFocused &&
                    "bg-primary-soft/60 ring-1 ring-primary/40",
                  !isSelected && !isFocused && "hover:bg-muted",
                  isDimmed && "opacity-50",
                )}
              >
                {/* Account (clickable text) */}
                <button
                  type="button"
                  onClick={() => onSelect(deal)}
                  className="text-left focus:outline-none"
                >
                  <div className="text-base font-semibold text-foreground hover:text-primary">
                    {deal.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deal.subtitle}
                  </div>
                </button>

                {/* Unread badge */}
                <button
                  type="button"
                  onClick={() => onSelect(deal)}
                  className="flex justify-center"
                  aria-label={`${deal.unread} unread messages`}
                >
                  {deal.unread > 0 ? (
                    <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-md bg-accent-soft px-2 text-sm font-semibold text-accent">
                      {deal.unread}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">{"\u2014"}</span>
                  )}
                </button>

                {/* Warning badge */}
                <div className="flex justify-center">
                  {deal.warnings > 0 ? (
                    <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center gap-1 rounded-md bg-[#fef3c7] px-2 text-sm font-semibold text-[#92400e]">
                      <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
                      {deal.warnings}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">{"\u2014"}</span>
                  )}
                </div>

                {/* Sentiment timeline */}
                <SentimentTimeline dots={deal.sentiment} dimmed={isDimmed} />

                {/* Team avatars */}
                <div className="flex justify-end gap-1.5">
                  {deal.team.map((member, i) => {
                    const isActive =
                      activeMember?.dealId === deal.id && activeMember.idx === i;
                    return (
                      <div key={`${deal.id}-${i}`} className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMember(
                              isActive ? null : { dealId: deal.id, idx: i },
                            );
                          }}
                          aria-label={`${member.name} \u2014 ${member.role}`}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ring-2 ring-background transition hover:scale-110",
                            TEAM_TONES[member.tone],
                            isDimmed && "opacity-50",
                            isActive && "ring-primary",
                          )}
                        >
                          {member.initial}
                        </button>
                        {isActive ? (
                          <div
                            role="tooltip"
                            className="absolute right-0 top-full z-30 mt-2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-[11px] text-background shadow-lg"
                          >
                            <div className="font-semibold">{member.name}</div>
                            <div className="text-[10px] opacity-80">{member.role}</div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {/* Row actions (alternative to AI agent) */}
                <div className="flex items-center justify-end gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                  {onCompose ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompose(deal);
                      }}
                      aria-label={`Compose to ${deal.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      <PenLine className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(deal);
                    }}
                    aria-label={`Open brief for ${deal.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  {deal.unread > 0 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(deal);
                      }}
                      aria-label={`Open chat with ${deal.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* AI tooltip overlay */}
      {focusFirst && DEALS[0]?.aiNote ? (
        <AiTooltip message={DEALS[0].aiNote} />
      ) : null}
    </div>
  );
}
