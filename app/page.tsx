"use client";

import { Filter, PenLine, Plus, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { AnalyticsView } from "@/components/analytics-view";
import { AskModal } from "@/components/ask-modal";
import { CalendarView } from "@/components/calendar-view";
import { CoachView } from "@/components/coach-view";
import { ComposerModal } from "@/components/composer-modal";
import { DealInsightsPanel } from "@/components/deal-insights-panel";
import { DealsList } from "@/components/deals-list";
import { HomeView } from "@/components/home-view";
import { MessagesView } from "@/components/messages-view";
import { Sidebar, type SidebarKey } from "@/components/sidebar";
import { TasksView } from "@/components/tasks-view";
import { TeamHeader } from "@/components/team-header";
import { type Deal } from "@/lib/data";

type ViewMeta = {
  title: string;
  subtitle: string;
  statLabel?: string;
  statValue?: string;
};

const VIEW_META: Record<SidebarKey, ViewMeta> = {
  home: {
    title: "Good morning, Kate",
    subtitle: "Here is what needs your attention today",
    statLabel: "Pipeline",
    statValue: "$30M",
  },
  tasks: {
    title: "Tasks",
    subtitle: "Stay on top of your follow-ups",
    statLabel: "Due today",
    statValue: "5",
  },
  messages: {
    title: "Inbox",
    subtitle: "Conversations across all your deals",
    statLabel: "Unread",
    statValue: "48",
  },
  analytics: {
    title: "Pipeline analytics",
    subtitle: "How is your pipeline trending this quarter",
    statLabel: "Coverage",
    statValue: "2.5x",
  },
  deals: {
    title: "Kate Mandel's team",
    subtitle: "Head of customer success",
    statLabel: "Commit",
    statValue: "$2.02M",
  },
  coach: {
    title: "AI Coach",
    subtitle: "Personalized recommendations from your last 14 calls",
    statLabel: "Insights",
    statValue: "3 new",
  },
  calendar: {
    title: "Calendar",
    subtitle: "Your week at a glance",
    statLabel: "Meetings",
    statValue: "6",
  },
};

export default function HomePage() {
  const [nav, setNav] = useState<SidebarKey>("home");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const [askPrefill, setAskPrefill] = useState<string | undefined>();
  const [composerOpen, setComposerOpen] = useState(false);

  const meta = VIEW_META[nav];

  const handleSelectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const openAsk = (prefill?: string) => {
    setAskPrefill(prefill);
    setAskOpen(true);
  };

  // Switch which action buttons appear in the header per view
  const headerActions = (() => {
    switch (nav) {
      case "deals":
        return (
          <>
            <FilterButton label="More views" Icon={SlidersHorizontal} />
            <FilterButton label="Sort views" Icon={Filter} />
            <FilterButton label="Recent only" Icon={Filter} />
            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5a]"
            >
              <PenLine className="h-3.5 w-3.5" />
              Compose
            </button>
          </>
        );
      case "messages":
        return (
          <button
            type="button"
            onClick={() => setComposerOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5a]"
          >
            <PenLine className="h-3.5 w-3.5" />
            New message
          </button>
        );
      case "home":
      case "coach":
        return (
          <button
            type="button"
            onClick={() => openAsk()}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5a]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ask AI
          </button>
        );
      default:
        return (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5a]"
          >
            <Plus className="h-3.5 w-3.5" />
            {nav === "tasks"
              ? "New task"
              : nav === "calendar"
                ? "New event"
                : nav === "analytics"
                  ? "New report"
                  : "New"}
          </button>
        );
    }
  })();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        active={nav}
        onChange={(key) => {
          setNav(key);
          setSelectedDeal(null);
        }}
      />

      <div className="brand-glow relative flex-1 overflow-hidden">
        <TeamHeader
          title={meta.title}
          subtitle={meta.subtitle}
          statLabel={meta.statLabel}
          statValue={meta.statValue}
          actions={headerActions}
        />

        {nav === "home" ? (
          <HomeView
            onNavigate={(key) => {
              setNav(key);
              setSelectedDeal(null);
            }}
            onAsk={() => openAsk()}
          />
        ) : null}
        {nav === "tasks" ? <TasksView /> : null}
        {nav === "messages" ? <MessagesView /> : null}
        {nav === "analytics" ? <AnalyticsView /> : null}
        {nav === "coach" ? <CoachView /> : null}
        {nav === "calendar" ? <CalendarView /> : null}
        {nav === "deals" ? (
          <DealsList
            selectedId={selectedDeal?.id ?? null}
            onSelect={handleSelectDeal}
            onCompose={() => setComposerOpen(true)}
            focusFirst={!selectedDeal}
          />
        ) : null}

        {selectedDeal && nav === "deals" ? (
          <DealInsightsPanel
            deal={selectedDeal}
            onClose={() => setSelectedDeal(null)}
            onAsk={(prefill) => openAsk(prefill)}
          />
        ) : null}
      </div>

      <AskModal
        open={askOpen}
        prefill={askPrefill}
        onClose={() => setAskOpen(false)}
      />
      <ComposerModal
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
      />
    </div>
  );
}

function FilterButton({
  label,
  Icon,
}: {
  label: string;
  Icon: typeof Filter;
}) {
  return (
    <button
      type="button"
      className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary lg:inline-flex"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
