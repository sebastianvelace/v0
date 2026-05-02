"use client";

import { Filter, PenLine, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { AnalyticsView } from "@/components/analytics-view";
import { AskModal } from "@/components/ask-modal";
import { ComposerModal } from "@/components/composer-modal";
import { DealInsightsPanel } from "@/components/deal-insights-panel";
import { DealsList } from "@/components/deals-list";
import { Sidebar, type SidebarKey } from "@/components/sidebar";
import { TeamHeader } from "@/components/team-header";
import { type Deal } from "@/lib/data";

export default function HomePage() {
  const [nav, setNav] = useState<SidebarKey>("deals");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const [askPrefill, setAskPrefill] = useState<string | undefined>();
  const [composerOpen, setComposerOpen] = useState(false);

  const showAnalytics = nav === "analytics";

  const handleSelectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const openAsk = (prefill?: string) => {
    setAskPrefill(prefill);
    setAskOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active={nav} onChange={setNav} />

      <div className="brand-glow relative flex-1 overflow-hidden">
        <TeamHeader
          actions={
            !showAnalytics ? (
              <>
                <FilterButton label="More views" Icon={SlidersHorizontal} />
                <FilterButton label="Sort views" Icon={Filter} />
                <FilterButton label="Recent only" Icon={Filter} />
                <FilterButton label="Group by" Icon={Filter} />
                <button
                  type="button"
                  onClick={() => setComposerOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(160,32,240,0.55)] transition hover:bg-[#8a1ad6]"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  Compose
                </button>
              </>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(160,32,240,0.55)] transition hover:bg-[#8a1ad6]"
              >
                <Plus className="h-3.5 w-3.5" />
                New report
              </button>
            )
          }
        />

        {showAnalytics ? (
          <AnalyticsView />
        ) : (
          <DealsList
            selectedId={selectedDeal?.id ?? null}
            onSelect={handleSelectDeal}
            focusFirst={!selectedDeal}
          />
        )}

        {selectedDeal && !showAnalytics ? (
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
