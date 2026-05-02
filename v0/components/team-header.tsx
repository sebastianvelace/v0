import { TEAM_OWNER } from "@/lib/data";

type Props = {
  /** Right-side action buttons appear next to the commit metric */
  actions?: React.ReactNode;
};

export function TeamHeader({ actions }: Props) {
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
            {TEAM_OWNER.name}
          </h1>
          <p className="text-sm text-muted-foreground">{TEAM_OWNER.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden flex-col items-end md:flex">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Commit
          </span>
          <span className="text-lg font-semibold text-foreground">
            {TEAM_OWNER.commit}
          </span>
        </div>
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
