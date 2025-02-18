"use client";
import { Progress } from "@/components/ui/progress";
import useSocket from "@/hooks/useSocket";

interface MemoryUsageProps {
  used: number;
  total: number;
}

export function MemoryUsage() {
  const { data } = useSocket("http://localhost:6011");
  const memoryUsage = data?.message?.memoryUsage;

  if (!memoryUsage) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span>Fetching memory usage...</span>
        </div>
      </div>
    );
  }

  const total = memoryUsage.total;
  const used = memoryUsage.used;
  const usageString = memoryUsage.usageString;
  const usedPercentage = (used / total) * 100;
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{usageString}</span>
      </div>
      <Progress value={usedPercentage} className="w-full" />
    </div>
  );
}
