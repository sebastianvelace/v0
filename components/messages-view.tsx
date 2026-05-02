"use client";

import { Search, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Message = { id: string; from: "them" | "me"; text: string; time: string };
type Thread = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread: number;
  messages: Message[];
};

const THREADS: Thread[] = [
  {
    id: "sourcemax",
    name: "Sourcemax",
    initials: "SM",
    preview: "Bill: Pricing still feels high vs the alternative",

    time: "12m",
    unread: 19,
    messages: [
      { id: "m1", from: "them", text: "Hi Alex, thanks for the proposal.", time: "9:02" },
      {
        id: "m2",
        from: "them",
        text: "Pricing still feels high vs the alternative we\u2019re evaluating.",
        time: "9:03",
      },
      {
        id: "m3",
        from: "me",
        text: "Totally understand. Want to set up a 30-min call to walk through ROI?",

        time: "9:14",
      },
    ],
  },
  {
    id: "bitforge",
    name: "BitForge",
    initials: "BF",
    preview: "Karishma: Looks great \u2014 let\u2019s set the deep dive.",
    time: "1h",
    unread: 29,
    messages: [
      { id: "m1", from: "them", text: "Hey, the demo was solid.", time: "Yesterday" },
      { id: "m2", from: "them", text: "Looks great \u2014 let\u2019s set the deep dive.", time: "10:22" },
    ],
  },
  {
    id: "aventine",
    name: "Aventine",
    initials: "AV",
    preview: "You: Sending the redlined contract this afternoon.",
    time: "3h",
    unread: 0,
    messages: [
      { id: "m1", from: "me", text: "Sending the redlined contract this afternoon.", time: "1:14" },
    ],
  },
  {
    id: "apexmind",
    name: "ApexMind",
    initials: "AM",
    preview: "Procurement reviewed the SOW — small tweaks.",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Procurement reviewed the SOW — small tweaks needed.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "credax",
    name: "Credax",
    initials: "CR",
    preview: "You: Pricing breakdown attached.",
    time: "Mon",
    unread: 0,
    messages: [{ id: "m1", from: "me", text: "Pricing breakdown attached.", time: "Mon" }],
  },
];

export function MessagesView() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<string, Message[]>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return THREADS;
    return THREADS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q),
    );
  }, [query]);

  const active = THREADS.find((t) => t.id === activeId) ?? THREADS[0];
  const allMessages = [...active.messages, ...(extraMessages[active.id] ?? [])];

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setExtraMessages((prev) => ({
      ...prev,
      [active.id]: [
        ...(prev[active.id] ?? []),
        {
          id: `local-${Date.now()}`,
          from: "me",
          text: draft.trim(),
          time: "now",
        },
      ],
    }));
    setDraft("");
  };

  return (
    <div className="px-8 pb-12">
      <div className="grid grid-cols-1 gap-4 rounded-3xl bg-card p-2 ring-1 ring-border lg:grid-cols-[320px_1fr]">
        {/* Thread list */}
        <aside className="rounded-2xl bg-muted/30 p-3">
          <div className="relative mb-3">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats"
              className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <ul className="space-y-1">
            {filtered.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition",
                    t.id === active.id
                      ? "bg-primary-soft"
                      : "hover:bg-card",
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {t.initials}
                  </span>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {t.time}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.preview}
                    </p>
                  </div>
                  {t.unread > 0 ? (
                    <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                      {t.unread}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversation */}
        <section className="flex min-h-[520px] flex-col rounded-2xl bg-[#e7f2ec]">
          <header className="flex items-center justify-between rounded-t-2xl bg-card px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {active.initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {active.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Online — typing...
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI summary
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-6">
            {allMessages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  m.from === "me" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                    m.from === "me"
                      ? "rounded-br-sm bg-primary-soft text-foreground"
                      : "rounded-bl-sm bg-card text-foreground",
                  )}
                >
                  <p>{m.text}</p>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={send}
            className="flex items-center gap-2 rounded-b-2xl bg-card px-4 py-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message"
              className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-[#1ebe5a]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
