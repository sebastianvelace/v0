"use client";

import {
  ChevronDown,
  Eye,
  FileText,
  Image as ImageIcon,
  Layout,
  Lightbulb,
  Maximize2,
  Minus,
  Paperclip,
  PencilLine,
  Send,
  Smile,
  Sparkles,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Pill = { label: string; tone: "purple" | "muted" };

const TO_PILLS: Pill[] = [
  { label: "Bill Silver", tone: "muted" },
  { label: "Karishma Clarke", tone: "muted" },
];
const FROM_PILLS: Pill[] = [{ label: "Alex Smith", tone: "muted" }];

const TOOLBAR = [
  { Icon: FileText, label: "Templates" },
  { Icon: Layout, label: "Blocks" },
  { Icon: Lightbulb, label: "Inspiration" },
];

const FORMATTERS = [
  { Icon: Type, label: "Text" },
  { Icon: Smile, label: "Emoji" },
  { Icon: Paperclip, label: "Attach" },
  { Icon: ImageIcon, label: "Image" },
  { Icon: PencilLine, label: "Draw" },
  { Icon: Sparkles, label: "AI assist" },
];

const ACCORDIONS = ["Participants", "Call brief", "Next Steps"];

export function ComposerModal({ open, onClose }: Props) {
  const [body, setBody] = useState(
    `Hi Bill,
Thanks for the call yesterday.
I understand that your procurement team is still unsure on the pricing,
and your IT team have a few loose ends they want to button up.
Can we set up two calls next week to address those concerns directly?
Talk Soon,
Alex`,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-6 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="composer-title"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex h-10 items-center justify-between bg-primary px-4 text-primary-foreground">
          <span id="composer-title" className="sr-only">
            Compose message to Sourcemax
          </span>
          <span aria-hidden />
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Minimize"
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/15"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Maximize"
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/15"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/15"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
          {/* Editor */}
          <div className="flex flex-col gap-4 px-6 py-5">
            <Recipients label="To:" pills={TO_PILLS} />
            <Recipients label="From:" pills={FROM_PILLS} />

            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {TOOLBAR.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>

            <label htmlFor="composer-body" className="sr-only">
              Message body
            </label>
            <textarea
              id="composer-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="min-h-[260px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground focus:outline-none"
            />

            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_18px_-6px_rgba(160,32,240,0.55)] transition hover:bg-[#8a1ad6]"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </button>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {FORMATTERS.map(({ Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
                <span className="mx-1 h-5 w-px bg-border" aria-hidden />
                <button
                  type="button"
                  aria-label="Discard"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Side info */}
          <aside className="border-t border-border bg-muted/40 p-5 lg:border-l lg:border-t-0">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold text-foreground">
                  Sourcemax
                </div>
                <div className="text-xs text-muted-foreground">Jun 30, 2025</div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-primary">
                <button type="button" className="hover:underline">
                  Go to call
                </button>
                <button type="button" className="hover:underline">
                  Copy link
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {ACCORDIONS.map((title, idx) => (
                <details
                  key={title}
                  className="group rounded-xl border border-border bg-card px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2">
                      {title}
                      {idx === 0 ? (
                        <span className="flex items-center gap-1">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7dd3fc] text-[10px] font-semibold text-[#0c4a6e]">
                            B
                          </span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                            K
                          </span>
                        </span>
                      ) : null}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        "group-open:rotate-180",
                      )}
                    />
                  </summary>
                </details>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Recipients({ label, pills }: { label: string; pills: Pill[] }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-sm text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {pills.map((p) => (
          <span
            key={p.label}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
          >
            {p.label}
            <button
              type="button"
              aria-label={`Remove ${p.label}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
