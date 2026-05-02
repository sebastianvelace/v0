import { KPI_CARDS } from "@/lib/data";
import { PipelineChart } from "./pipeline-chart";

export function AnalyticsView() {
  return (
    <div className="px-8 pb-12">
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KPI_CARDS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Chart card */}
      <section className="mt-4 rounded-3xl bg-card p-6 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            How is your pipeline trending?
          </h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <LegendDot color="#fbbf24" label="Forecast" />
            <LegendDot color="#86efac" label="Booked" />
            <span className="inline-flex items-center gap-1">
              <span
                className="inline-block h-px w-4 border-t-2 border-dashed"
                style={{ borderColor: "#34b7f1" }}
                aria-hidden
              />
              Target
            </span>
          </div>
        </div>
        <div className="mt-4">
          <PipelineChart />
        </div>
      </section>
    </div>
  );
}

type KpiProps = {
  label: string;
  value: string;
  progress?: number;
  progressLabel?: string;
  secondaryValue?: string;
  secondaryLabel?: string;
};

function KpiCard({
  label,
  value,
  progress,
  progressLabel,
  secondaryValue,
  secondaryLabel,
}: KpiProps) {
  return (
    <article className="flex flex-col rounded-3xl bg-card p-5 ring-1 ring-border">
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <div className="mt-2 flex items-end gap-3">
        <span className="text-3xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {secondaryValue ? (
          <span className="text-2xl font-semibold text-foreground">
            {secondaryValue}
          </span>
        ) : null}
      </div>
      {secondaryLabel ? (
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>Coverage</span>
          <span>{secondaryLabel}</span>
        </div>
      ) : null}
      {progress !== undefined ? (
        <div className="mt-4 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.min(100, progress * 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{progressLabel}</span>
        </div>
      ) : (
        <div className="mt-4 h-2" aria-hidden />
      )}
    </article>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
        aria-hidden
      />
      {label}
    </span>
  );
}
