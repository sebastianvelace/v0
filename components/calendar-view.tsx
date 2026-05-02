"use client";

import { Clock, MapPin, Users, Video } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  date: number;
  start: string;
  end: string;
  title: string;
  deal: string;
  attendees: string[];
  type: "video" | "in-person";
  prep?: string;
};

const EVENTS: Event[] = [
  {
    id: "e1",
    day: "Mon",
    date: 5,
    start: "09:30",
    end: "10:00",
    title: "Sourcemax — pricing follow-up",
    deal: "Sourcemax",
    attendees: ["Bill Silver", "Karishma Clarke", "Alex Smith"],
    type: "video",
    prep: "Review ROI deck v3 before the call",
  },
  {
    id: "e2",
    day: "Mon",
    date: 5,
    start: "14:00",
    end: "14:30",
    title: "BitForge weekly sync",
    deal: "BitForge",
    attendees: ["Karishma Clarke", "Alex Smith"],
    type: "video",
  },
  {
    id: "e3",
    day: "Tue",
    date: 6,
    start: "11:00",
    end: "12:00",
    title: "Sourcemax — Technical Deep Dive",
    deal: "Sourcemax",
    attendees: ["IT director", "CFO", "Alex Smith", "Solutions Engineer"],
    type: "video",
    prep: "Pull architecture diagram + SOC 2 attestation",
  },
  {
    id: "e4",
    day: "Wed",
    date: 7,
    start: "10:00",
    end: "10:45",
    title: "Aventine QBR",
    deal: "Aventine",
    attendees: ["Aventine CS team", "Alex Smith"],
    type: "in-person",
  },
  {
    id: "e5",
    day: "Thu",
    date: 8,
    start: "16:00",
    end: "16:30",
    title: "Credax pricing walk-through",
    deal: "Credax",
    attendees: ["Credax procurement", "Alex Smith"],
    type: "video",
  },
  {
    id: "e6",
    day: "Fri",
    date: 9,
    start: "09:00",
    end: "09:30",
    title: "Pipeline review with Kate",
    deal: "Internal",
    attendees: ["Kate Mandel", "Alex Smith"],
    type: "video",
  },
];

const DAYS: Event["day"][] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function CalendarView() {
  const [activeDay, setActiveDay] = useState<Event["day"]>("Mon");

  const visible = EVENTS.filter((e) => e.day === activeDay);

  return (
    <div className="px-8 pb-12">
      {/* Day strip */}
      <div className="mb-6 grid grid-cols-5 gap-3">
        {DAYS.map((d) => {
          const date = EVENTS.find((e) => e.day === d)?.date ?? 0;
          const count = EVENTS.filter((e) => e.day === d).length;
          const isActive = d === activeDay;
          return (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDay(d)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border px-3 py-4 text-sm font-medium transition",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              <span className="text-xs uppercase tracking-wide opacity-80">
                {d}
              </span>
              <span className="text-2xl font-semibold">{date}</span>
              <span className="text-[11px] opacity-80">{count} events</span>
            </button>
          );
        })}
      </div>

      {/* Events for the day */}
      <section className="rounded-3xl bg-card p-6 ring-1 ring-border">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {activeDay} schedule
        </h2>
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No events scheduled.
          </p>
        ) : (
          <ul className="space-y-3">
            {visible.map((e) => (
              <li
                key={e.id}
                className="flex gap-4 rounded-2xl border border-border/60 bg-muted/30 p-4"
              >
                <div className="flex w-20 shrink-0 flex-col items-start gap-0.5 border-r border-border pr-3 text-xs">
                  <span className="font-semibold text-foreground">
                    {e.start}
                  </span>
                  <span className="text-muted-foreground">{e.end}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {e.title}
                    </h3>
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {e.deal}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {e.start} – {e.end}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {e.attendees.length} attendees
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {e.type === "video" ? (
                        <>
                          <Video className="h-3.5 w-3.5" /> Video call
                        </>
                      ) : (
                        <>
                          <MapPin className="h-3.5 w-3.5" /> In person
                        </>
                      )}
                    </span>
                  </div>
                  {e.prep ? (
                    <p className="mt-2 rounded-lg bg-primary-soft/60 px-3 py-1.5 text-xs text-primary">
                      Prep: {e.prep}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="self-start rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:bg-[#1ebe5a]"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
