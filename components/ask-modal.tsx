"use client";

import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  prefill?: string;
  onClose: () => void;
};

export function AskModal({ open, prefill, onClose }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) {
      setValue(
        prefill ?? "What are the pricing objections that have come up in this deal?",
      );
    }
  }, [open, prefill]);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-card p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2
          id="ask-title"
          className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-semibold tracking-tight text-transparent"
        >
          Ask Anything about this deal
        </h2>

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <label htmlFor="ask-input" className="sr-only">
            Ask a question about this deal
          </label>
          <div className="ai-ring flex items-center gap-3 rounded-full bg-card px-5 py-4">
            <Sparkles
              className="h-5 w-5 shrink-0 text-primary"
              strokeWidth={2.5}
            />
            <input
              id="ask-input"
              type="text"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="What would you like to know?"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Who are the key decision-makers?",
              "Summarize the last call",
              "Draft a follow-up email",
              "What are the next steps?",
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue(s)}
                className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
