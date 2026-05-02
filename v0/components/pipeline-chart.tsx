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
        fill="#26c6c2"
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
            stroke="#ece8f0"
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b6577", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b6577", fontSize: 12 }}
            tickFormatter={formatY}
            ticks={[0, 5, 10, 15, 20, 25]}
            domain={[0, 25]}
          />
          <Tooltip
            cursor={{ fill: "rgba(160,32,240,0.06)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e6e3ec",
              fontSize: 12,
            }}
            formatter={(v: number) => `$${v.toFixed(1)}M`}
          />

          {/* Stacked bars */}
          <Bar dataKey="closed" stackId="pipe" fill="#29b6f6" radius={[0, 0, 4, 4]} />
          <Bar dataKey="expansion" stackId="pipe" fill="#4a148c" />
          <Bar dataKey="negotiation" stackId="pipe" fill="#6b1f9e" />
          <Bar dataKey="proposal" stackId="pipe" fill="#a020f0" />
          <Bar dataKey="qualified" stackId="pipe" fill="#e91e9d" radius={[6, 6, 0, 0]} />

          {/* Line overlays */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#ffd54f"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#ffd54f", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="booked"
            stroke="#f48fb1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#f48fb1", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />

          {/* Target reference line */}
          <ReferenceLine
            y={15}
            stroke="#26c6c2"
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
