"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PIPELINE_CHART_DATA } from "@/lib/data";

const formatY = (value: number) => `$${value}M`;

type LabelProps = {
  viewBox?: { x?: number; y?: number };
};

function TargetPillLabel({ viewBox }: LabelProps) {
  const x = (viewBox?.x ?? 0) + 8;
  const y = (viewBox?.y ?? 0) - 11;
  return (
    <g>
      <rect
        x={x}
        y={y}
        rx={11}
        ry={11}
        width={104}
        height={22}
        fill="#34b7f1"
      />
      <text
        x={x + 52}
        y={y + 15}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill="#ffffff"
      >
        Target: $15M
      </text>
    </g>
  );
}

export function PipelineChart() {
  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={PIPELINE_CHART_DATA}
          margin={{ top: 24, right: 24, bottom: 8, left: 8 }}
          barCategoryGap="32%"
        >
          <CartesianGrid
            stroke="#e3ece6"
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#54656f", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#54656f", fontSize: 12 }}
            tickFormatter={formatY}
            ticks={[0, 5, 10, 15, 20, 25]}
            domain={[0, 25]}
          />
          <Tooltip
            cursor={{ fill: "rgba(37,211,102,0.08)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #d8e1dc",
              fontSize: 12,
            }}
            formatter={(v: number) => `$${v.toFixed(1)}M`}
          />

          {/* Stacked bars (greens, top is brightest) */}
          <Bar dataKey="closed" stackId="pipe" fill="#34b7f1" radius={[0, 0, 4, 4]} />
          <Bar dataKey="expansion" stackId="pipe" fill="#054640" />
          <Bar dataKey="negotiation" stackId="pipe" fill="#0a6e5e" />
          <Bar dataKey="proposal" stackId="pipe" fill="#128c7e" />
          <Bar dataKey="qualified" stackId="pipe" fill="#25d366" radius={[6, 6, 0, 0]} />

          {/* Line overlays */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#fbbf24"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#fbbf24", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="booked"
            stroke="#86efac"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#86efac", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />

          {/* Target reference line */}
          <ReferenceLine
            y={15}
            stroke="#34b7f1"
            strokeDasharray="6 4"
            strokeWidth={2}
            label={<TargetPillLabel />}
            ifOverflow="extendDomain"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
