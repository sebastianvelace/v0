import { TEAM_OWNER } from "@/lib/data";

type Props = {
  /** Override the page title; defaults to the team owner name. */
  title?: string;
  /** Override the page subtitle; defaults to the team owner role. */
  subtitle?: string;
  /** Right-side metric label (e.g. "Commit", "Today") */
  statLabel?: string;
  /** Right-side metric value */
  statValue?: string;
  /** Right-side action buttons appear next to the stat */
  actions?: React.ReactNode;
};

export function TeamHeader({
  title,
  subtitle,
  statLabel = "Commit",
  statValue = TEAM_OWNER.commit,
  actions,
}: Props) {
  return (
    <header className="flex items-center justify-between gap-6 px-8 pt-8 pb-6">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary"
          aria-hidden
        >
          {TEAM_OWNER.initials}
        </div>
        <div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
            {title ?? TEAM_OWNER.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {subtitle ?? TEAM_OWNER.role}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {statLabel && statValue ? (
          <div className="hidden flex-col items-end md:flex">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {statLabel}
            </span>
            <span className="text-lg font-semibold text-foreground">
              {statValue}
            </span>
          </div>
        ) : null}
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
