import { ServerInfoCard } from "@/components/server-info-card";
import { DiskSpace } from "@/components/disk-space";
import { CpuUsage } from "@/components/cpu-usage";
import { MemoryUsage } from "@/components/memory-usage";
import { Temperature } from "@/components/temperature";
import { RaidHealth } from "@/components/raid-health";
import { ServerInfo } from "@/components/server-info";

function ServerInfoPage() {
  // In a real application, you would fetch this data from an API

  return (
    <div className="container mx-auto p-4">
      <ServerInfo />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ServerInfoCard title="Disk Space">
          <DiskSpace />
        </ServerInfoCard>
        <ServerInfoCard title="CPU Usage">
          <CpuUsage />
        </ServerInfoCard>
        <ServerInfoCard title="Memory Usage">
          <MemoryUsage />
        </ServerInfoCard>
        <ServerInfoCard title="Temperature">
          <Temperature />
        </ServerInfoCard>
        <ServerInfoCard title="RAID Health">
          <RaidHealth />
        </ServerInfoCard>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ServerInfoPage />
      </main>
    </div>
  );
}
