"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
  deal: string;
  due: string;
  priority: "high" | "medium" | "low";
  done: boolean;
};

const SEED: Task[] = [
  {
    id: "t1",
    title: "Send pricing breakdown to Sourcemax CFO",
    deal: "Sourcemax",
    due: "Today",
    priority: "high",
    done: false,
  },
  {
    id: "t2",
    title: "Schedule technical deep dive with BitForge",
    deal: "BitForge",
    due: "Today",
    priority: "high",
    done: false,
  },
  {
    id: "t3",
    title: "Review proposal feedback from Aventine",
    deal: "Aventine",
    due: "Tomorrow",
    priority: "medium",
    done: false,
  },
  {
    id: "t4",
    title: "Follow up with Karishma on contract redlines",
    deal: "Sourcemax",
    due: "Tomorrow",
    priority: "medium",
    done: false,
  },
  {
    id: "t5",
    title: "Prepare QBR deck for Credax",
    deal: "Credax",
    due: "Fri",
    priority: "low",
    done: false,
  },
  {
    id: "t6",
    title: "Sync with onboarding team about Fundex kickoff",
    deal: "Fundex",
    due: "Mon",
    priority: "low",
    done: true,
  },
];

const PRIORITY_STYLES: Record<Task["priority"], string> = {
  high: "bg-[#fee2e2] text-[#b91c1c]",
  medium: "bg-[#fef3c7] text-[#92400e]",
  low: "bg-primary-soft text-primary",
};

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>(SEED);
  const [filter, setFilter] = useState<"all" | "open" | "done">("open");

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const visible = tasks.filter((t) => {
    if (filter === "open") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const counts = {
    all: tasks.length,
    open: tasks.filter((t) => !t.done).length,
    done: tasks.filter((t) => t.done).length,
  };

  return (
    <div className="px-8 pb-12">
      <div className="rounded-3xl bg-card p-6 ring-1 ring-border">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1 text-xs font-medium">
            {(["open", "all", "done"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-3 py-1.5 capitalize transition",
                  filter === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5a]"
          >
            <Plus className="h-3.5 w-3.5" />
            New task
          </button>
        </div>

        <ul className="divide-y divide-border">
          {visible.length === 0 ? (
            <li className="py-12 text-center text-sm text-muted-foreground">
              Nothing here. Take a breather.
            </li>
          ) : (
            visible.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <button
                  type="button"
                  aria-pressed={t.done}
                  aria-label={t.done ? "Mark as not done" : "Mark as done"}
                  onClick={() => toggle(t.id)}
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition",
                    t.done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary",
                  )}
                >
                  {t.done ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : null}
                </button>
                <div className="flex-1">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      t.done
                        ? "text-muted-foreground line-through"
                        : "text-foreground",
                    )}
                  >
                    {t.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {t.deal}
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                    PRIORITY_STYLES[t.priority],
                  )}
                >
                  {t.priority}
                </span>
                <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                  {t.due}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
