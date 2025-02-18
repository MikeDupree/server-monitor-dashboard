import { ServerInfoCard } from "@/components/server-info-card"
import { DiskSpace } from "@/components/disk-space"
import { CpuUsage } from "@/components/cpu-usage"
import { MemoryUsage } from "@/components/memory-usage"
import { Temperature } from "@/components/temperature"
import { RaidHealth } from "@/components/raid-health"

export default function ServerInfoPage() {
  // In a real application, you would fetch this data from an API
  const serverData = {
    diskSpace: { used: 256, total: 1000 },
    cpuUsage: 45,
    memoryUsage: { used: 8, total: 16 },
    temperature: 42,
    raidStatus: "healthy" as const,
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Server Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ServerInfoCard title="Disk Space">
          <DiskSpace used={serverData.diskSpace.used} total={serverData.diskSpace.total} />
        </ServerInfoCard>
        <ServerInfoCard title="CPU Usage">
          <CpuUsage usage={serverData.cpuUsage} />
        </ServerInfoCard>
        <ServerInfoCard title="Memory Usage">
          <MemoryUsage used={serverData.memoryUsage.used} total={serverData.memoryUsage.total} />
        </ServerInfoCard>
        <ServerInfoCard title="Temperature">
          <Temperature value={serverData.temperature} />
        </ServerInfoCard>
        <ServerInfoCard title="RAID Health">
          <RaidHealth status={serverData.raidStatus} />
        </ServerInfoCard>
      </div>
    </div>
  )
}

