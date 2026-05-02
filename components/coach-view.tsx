"use client";

import { Lightbulb, ThumbsDown, ThumbsUp, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AiMascot } from "./ai-mascot";
import { cn } from "@/lib/utils";

type Tip = {
  id: string;
  category: "Strategy" | "Communication" | "Closing";
  title: string;
  body: string;
  Icon: typeof Lightbulb;
};

const TIPS: Tip[] = [
  {
    id: "c1",
    category: "Strategy",
    title: "Surface the CFO before week 3",
    body: "Sourcemax has not yet looped in finance. Deals where the CFO joins by week 3 close 2.4x more often than those that don\u2019t.",
    Icon: TrendingUp,
  },
  {
    id: "c2",
    category: "Communication",
    title: "Mirror their language on compliance",
    body: 'BitForge mentioned "SOC 2" 4 times last call. Reuse the exact phrasing in your follow-up — it lifts reply rates 31%.',
    Icon: Users,
  },
  {
    id: "c3",
    category: "Closing",
    title: "Pre-empt the pricing objection",
    body: "Three of your last five lost deals cited pricing in week 4. Send a 1-page ROI summary before the next Sourcemax call.",
    Icon: Lightbulb,
  },
];

export function CoachView() {
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});

  return (
    <div className="px-8 pb-12">
      {/* Hero */}
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
        <div className="flex items-start gap-4">
          <AiMascot size={56} />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Today&apos;s coaching</h2>
            <p className="mt-1 max-w-xl text-sm opacity-90">
              I reviewed your last 14 calls and 286 messages. Here are the
              three highest-leverage moves you can make this week.
            </p>
          </div>
        </div>
      </section>

      {/* Tip cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {TIPS.map((tip) => {
          const choice = feedback[tip.id];
          return (
            <article
              key={tip.id}
              className="flex flex-col rounded-3xl bg-card p-5 ring-1 ring-border"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <tip.Icon className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {tip.category}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {tip.title}
              </h3>
              <p
                className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: tip.body }}
              />
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>Was this helpful?</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Helpful"
                    onClick={() =>
                      setFeedback((p) => ({ ...p, [tip.id]: "up" }))
                    }
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full transition",
                      choice === "up"
                        ? "bg-primary-soft text-primary"
                        : "hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Not helpful"
                    onClick={() =>
                      setFeedback((p) => ({ ...p, [tip.id]: "down" }))
                    }
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full transition",
                      choice === "down"
                        ? "bg-[#fee2e2] text-[#b91c1c]"
                        : "hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
