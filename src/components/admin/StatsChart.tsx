"use client";

interface StatsChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
}

export default function StatsChart({ data, maxValue }: StatsChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">{item.label}</span>
            <span className="text-white font-medium">{item.value}</span>
          </div>
          <div className="h-2 rounded-full bg-[#1f2937] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color || "#f97316",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
