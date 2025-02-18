"use client";
import { Progress } from "@/components/ui/progress";
import useSocket from "@/hooks/useSocket";

export function CpuUsage() {
  const { data } = useSocket("http://localhost:6011");
  const cpuUsage = data?.message?.cpuUsage;
  const cpus = data?.message?.cpus;
  if (!cpuUsage || !cpus) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span>Fetching CPU usage...</span>
        </div>
      </div>
    );
  }
  const usage = cpuUsage.cpuUsage;
  return (
    <div>
      <div className="flex flex-col justify-between mb-2">
        <span>Cores: {cpus?.length}</span>
        <span>{usage}%</span>
      </div>
      <Progress value={usage} className="w-full" />
    </div>
  );
}
