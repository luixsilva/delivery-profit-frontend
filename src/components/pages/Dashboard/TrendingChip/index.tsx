import { ArrowUp, ArrowDown } from "lucide-react";

interface TrendChipProps {
  value: number;
  direction: "up" | "down";
}

export default function TrendChip({ value, direction }: TrendChipProps) {
  const isUp = direction === "up";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium ${
        isUp
          ? "bg-success-500/10 text-success-500"
          : "bg-danger-500/10 text-danger-500"
      }`}
    >
      {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {value}%
    </span>
  );
}
