import { AlertTriangle } from "lucide-react";
import { AiMascot } from "./ai-mascot";

type Props = {
  message: string;
};

/**
 * The mascot + speech-bubble overlay that points at a focused deal row.
 * Positioned absolutely by its parent.
 */
export function AiTooltip({ message }: Props) {
  return (
    <div className="pointer-events-none absolute left-32 top-[112px] z-20 flex flex-col items-start">
      <AiMascot haloed size={48} />
      <div className="relative ml-6 mt-2 max-w-[260px] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground shadow-lg">
        {/* tail */}
        <span
          className="absolute -top-2 left-6 h-4 w-4 rotate-45 rounded-sm bg-primary"
          aria-hidden
        />
        <div className="relative flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
          <p className="text-pretty leading-snug">{message}</p>
        </div>
      </div>
    </div>
  );
}
