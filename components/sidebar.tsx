"use client";

import {
  BarChart3,
  Briefcase,
  Calendar,
  ClipboardCheck,
  Home,
  Megaphone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarKey =
  | "home"
  | "tasks"
  | "messages"
  | "analytics"
  | "deals"
  | "coach"
  | "calendar";

type Props = {
  active: SidebarKey;
  onChange: (key: SidebarKey) => void;
};

const ITEMS: { key: SidebarKey; label: string; Icon: typeof Home }[] = [
  { key: "home", label: "Home", Icon: Home },
  { key: "tasks", label: "Tasks", Icon: ClipboardCheck },
  { key: "messages", label: "Messages", Icon: MessageCircle },
  { key: "analytics", label: "Analytics", Icon: BarChart3 },
  { key: "deals", label: "Deals", Icon: Briefcase },
  { key: "coach", label: "Coach", Icon: Megaphone },
  { key: "calendar", label: "Calendar", Icon: Calendar },
];

export function Sidebar({ active, onChange }: Props) {
  return (
    <aside
      className="flex h-screen w-16 shrink-0 flex-col bg-sidebar text-sidebar-foreground"
      aria-label="Main navigation"
    >
      {/* Logo tile */}
      <div className="flex h-20 items-center justify-center bg-primary">
        <Sparkles className="h-7 w-7 text-white" strokeWidth={2.5} />
        <span className="sr-only">Deep</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col items-center gap-1 py-4">
        {ITEMS.map(({ key, label, Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex h-11 w-11 items-center justify-center rounded-xl transition",
                isActive
                  ? "bg-primary text-white shadow-[0_8px_20px_-8px_rgba(160,32,240,0.6)]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-light/60 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
