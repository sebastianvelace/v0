"use client";

import {
  CheckCheck,
  Copy,
  FileText,
  Link2,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { THREAD_INSIGHTS, type Brief } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AiMascot } from "./ai-mascot";

type Message = { id: string; from: "them" | "me"; text: string; time: string };
type Thread = {
  id: string;
  name: string;
  initials: string;
  avatarTone: "green" | "purple" | "pink" | "amber" | "fuchsia";
  phone: string;
  preview: string;
  time: string;
  unread: number;
  team: { initial: string; tone: "blue" | "sky" | "rose" | "amber" }[];
  messages: Message[];
};

const THREAD_TONES: Record<Thread["avatarTone"], string> = {
  green: "bg-[#25d366] text-white",
  purple: "bg-[#a855f7] text-white",
  pink: "bg-[#ec4899] text-white",
  amber: "bg-[#f59e0b] text-white",
  fuchsia: "bg-[#d946ef] text-white",
};

const TEAM_DOT: Record<NonNullable<Thread["team"]>[number]["tone"], string> = {
  blue: "bg-[#3b82f6] text-white",
  sky: "bg-[#7dd3fc] text-[#0c4a6e]",
  rose: "bg-[#fda4af] text-[#7f1d1d]",
  amber: "bg-[#fcd34d] text-[#78350f]",
};

const THREADS: Thread[] = [
  {
    id: "sourcemax",
    name: "Sourcemax",
    initials: "SO",
    avatarTone: "purple",
    phone: "+1 (555) 824-9910",
    preview: "Can we revi...",
    time: "Now",
    unread: 3,
    team: [
      { initial: "KM", tone: "blue" },
      { initial: "AS", tone: "sky" },
    ],
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Morning Alex \u2014 looping in procurement on the SLA items we discussed.",
        time: "8:12 AM",
      },
      {
        id: "m2",
        from: "me",
        text: "Perfect \u2014 I can send a one-pager summarizing SLA + security posture.",
        time: "8:14 AM",
      },
      {
        id: "m3",
        from: "them",
        text: "Great. Also, can we tighten the onboarding timeline?",
        time: "8:16 AM",
      },
      {
        id: "m4",
        from: "me",
        text: "Yes \u2014 I will propose two working sessions next week.",
        time: "8:18 AM",
      },
      {
        id: "m5",
        from: "them",
        text: "Pricing feedback is mixed \u2014 CFO wants clearer ROI guardrails.",
        time: "9:03 AM",
      },
    ],
  },
  {
    id: "bitforge",
    name: "BitForge",
    initials: "BI",
    avatarTone: "amber",
    phone: "+1 (555) 412-7708",
    preview: "Thanks \u2014 we will loop in...",
    time: "12 min",
    unread: 0,
    team: [{ initial: "KC", tone: "rose" }],
    messages: [
      { id: "m1", from: "them", text: "The technical deep dive went well.", time: "Yesterday" },
      {
        id: "m2",
        from: "them",
        text: "Thanks \u2014 we will loop in our IT director by Friday.",
        time: "10:22",
      },
    ],
  },
  {
    id: "aventine",
    name: "Aventine",
    initials: "AV",
    avatarTone: "pink",
    phone: "+1 (555) 902-3344",
    preview: "Pricing doc l...",
    time: "38 min",
    unread: 12,
    team: [
      { initial: "BS", tone: "blue" },
      { initial: "AS", tone: "sky" },
    ],
    messages: [
      { id: "m1", from: "me", text: "Pricing doc landing in your inbox in 5.", time: "1:14" },
    ],
  },
  {
    id: "apexmind",
    name: "ApexMind",
    initials: "AP",
    avatarTone: "fuchsia",
    phone: "+1 (555) 211-5588",
    preview: "Let us reschedule t...",
    time: "1 h",
    unread: 1,
    team: [{ initial: "KM", tone: "blue" }],
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Let us reschedule today's sync \u2014 procurement is double-booked.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "credax",
    name: "Credax",
    initials: "CR",
    avatarTone: "amber",
    phone: "+1 (555) 660-1224",
    preview: "Approved NDA \u2014...",
    time: "Yesterday",
    unread: 0,
    team: [{ initial: "KC", tone: "rose" }],
    messages: [{ id: "m1", from: "me", text: "NDA approved on our side.", time: "Mon" }],
  },
  {
    id: "pondeix",
    name: "Pondeix",
    initials: "PO",
    avatarTone: "pink",
    phone: "+1 (555) 778-9012",
    preview: "Can you sen...",
    time: "3 h",
    unread: 5,
    team: [
      { initial: "KM", tone: "blue" },
      { initial: "BS", tone: "sky" },
    ],
    messages: [
      { id: "m1", from: "them", text: "Can you send the references for fintech wins?", time: "11:02" },
    ],
  },
];

export function MessagesView() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<string, Message[]>>({});
  const [briefOpen, setBriefOpen] = useState(true);
  const [tab, setTab] = useState<Tab>("brief");
  const [toast, setToast] = useState<string | null>(null);

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
  const brief: Brief = THREAD_INSIGHTS[active.id] ?? THREAD_INSIGHTS.sourcemax;

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

  const flashToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const useTemplate = (text: string) => {
    setDraft((prev) => (prev ? prev : text));
  };

  return (
    <div className="relative px-8 pb-12">
      <div
        className={cn(
          "grid gap-4",
          briefOpen
            ? "grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px]"
            : "grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]",
        )}
      >
        {/* Thread list */}
        <ThreadList
          threads={filtered}
          activeId={active.id}
          onSelect={(id) => setActiveId(id)}
          query={query}
          onQuery={setQuery}
        />

        {/* Conversation */}
        <section className="flex min-h-[560px] flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                  THREAD_TONES[active.avatarTone],
                )}
                aria-hidden
              >
                {active.initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">{active.name}</div>
                <div className="text-xs text-muted-foreground">{active.phone}</div>
                <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBriefOpen((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  briefOpen
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Resumen IA
              </button>
              <button
                type="button"
                onClick={() => flashToast("Calling " + active.name + "...")}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" />
                Go to call
              </button>
              <button
                type="button"
                onClick={() => flashToast("Link copied")}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Link2 className="h-3.5 w-3.5" />
                Copy link
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#e7f2ec] px-6 py-6">
            {allMessages.map((m) => (
              <div
                key={m.id}
                className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                    m.from === "me"
                      ? "rounded-br-sm bg-[#dcf8c6] text-foreground"
                      : "rounded-bl-sm bg-card text-foreground",
                  )}
                >
                  <p>{m.text}</p>
                  <span
                    className={cn(
                      "mt-1 flex items-center justify-end gap-1 text-[10px]",
                      m.from === "me" ? "text-[#34a854]" : "text-muted-foreground",
                    )}
                  >
                    {m.time}
                    {m.from === "me" ? <CheckCheck className="h-3 w-3" /> : null}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Templates row */}
          <div className="flex items-center gap-2 border-t border-border bg-card px-4 py-3">
            <button
              type="button"
              onClick={() =>
                useTemplate("Hi " + active.name + ", following up on our last note \u2014 happy to jump on a quick call this week.")
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <FileText className="h-3.5 w-3.5" />
              Templates
            </button>
            <button
              type="button"
              onClick={() => useTemplate("Sending the SLA + security one-pager now.")}
              className="inline-flex rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              SLA recap
            </button>
            <button
              type="button"
              onClick={() => useTemplate("Are you free for a 20-minute ROI walkthrough this week?")}
              className="inline-flex rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              ROI walkthrough
            </button>
          </div>

          {/* Composer */}
          <form onSubmit={send} className="flex items-center gap-2 border-t border-border bg-card px-4 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2">
              <button type="button" aria-label="Attach" className="text-muted-foreground hover:text-primary">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="button" aria-label="Emoji" className="text-muted-foreground hover:text-primary">
                <Smile className="h-4 w-4" />
              </button>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5a]"
            >
              <Send className="h-3.5 w-3.5" />
              Send
            </button>
          </form>
        </section>

        {/* Brief panel */}
        {briefOpen ? (
          <aside className="relative">
            <div className="rounded-3xl bg-card p-5 ring-1 ring-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" strokeWidth={2.5} />
                  <div>
                    <div className="text-base font-semibold text-foreground">
                      {active.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      WhatsApp Business
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <button
                    type="button"
                    aria-label="More options"
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBriefOpen(false)}
                    aria-label="Close brief"
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Ask input */}
              <div className="ai-ring mt-4 flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" strokeWidth={2.5} />
                <span className="truncate">Ask anything related to this conversation</span>
              </div>

              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Conversation insights"
                className="mt-5 flex items-center gap-5 border-b border-border text-sm"
              >
                {(["brief", "score", "contacts", "warnings"] as Tab[]).map((key) => {
                  const isActive = key === tab;
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setTab(key)}
                      className={cn(
                        "relative -mb-px pb-2 font-medium capitalize transition",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {key}
                      {isActive ? (
                        <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-primary/40 bg-card p-4 shadow-[0_8px_24px_-12px_rgba(37,211,102,0.25)]">
                {tab === "brief" ? (
                  <BriefBlock brief={brief} />
                ) : tab === "score" ? (
                  <p className="py-2 text-sm text-muted-foreground">
                    Health score and stage progression appear here.
                  </p>
                ) : tab === "contacts" ? (
                  <ContactsBlock thread={active} />
                ) : (
                  <p className="py-2 text-sm text-muted-foreground">
                    No active warnings on this conversation.
                  </p>
                )}
              </div>

              {/* Quick actions (alternatives to AI) */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => flashToast("Brief copied to clipboard")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy brief
                </button>
                <button
                  type="button"
                  onClick={() => flashToast("Shared with team")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Send className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>
            </div>

            {/* Floating mascot */}
            <div className="pointer-events-none absolute -left-7 top-44">
              <AiMascot haloed size={56} />
            </div>
          </aside>
        ) : null}
      </div>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}

type Tab = "brief" | "score" | "contacts" | "warnings";

function ThreadList({
  threads,
  activeId,
  onSelect,
  query,
  onQuery,
}: {
  threads: Thread[];
  activeId: string;
  onSelect: (id: string) => void;
  query: string;
  onQuery: (v: string) => void;
}) {
  return (
    <aside className="rounded-3xl bg-card p-3 ring-1 ring-border">
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search chats"
          className="w-full rounded-full border border-border bg-muted/40 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>
      <ul className="space-y-1">
        {threads.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => onSelect(t.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition",
                t.id === activeId ? "bg-primary-soft" : "hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
                  THREAD_TONES[t.avatarTone],
                )}
              >
                {t.initials}
              </span>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{t.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-muted-foreground">{t.preview}</p>
                  {t.unread > 0 ? (
                    <span className="shrink-0 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                      {t.unread}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex shrink-0 -space-x-1">
                {t.team.map((m, i) => (
                  <span
                    key={i}
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold ring-2 ring-card",
                      TEAM_DOT[m.tone],
                    )}
                    aria-hidden
                  >
                    {m.initial}
                  </span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function BriefBlock({ brief }: { brief: Brief }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-foreground">
      <section>
        <h3 className="mb-2 text-sm font-semibold">Obstacles</h3>
        <ul className="space-y-1.5">
          {brief.obstacles.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
              <span className="text-[13px]">{line}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-2 text-sm font-semibold">Progress</h3>
        <ul className="space-y-1.5">
          {brief.progress.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
              <span className="text-[13px]">{line}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ContactsBlock({ thread }: { thread: Thread }) {
  return (
    <ul className="space-y-2 text-sm">
      <li className="flex items-center justify-between">
        <span className="font-medium text-foreground">{thread.name}</span>
        <span className="text-xs text-muted-foreground">Buyer</span>
      </li>
      {thread.team.map((m, i) => (
        <li key={i} className="flex items-center justify-between">
          <span className="text-foreground">Internal: {m.initial}</span>
          <span className="text-xs text-muted-foreground">Team</span>
        </li>
      ))}
    </ul>
  );
}
