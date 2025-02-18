"use client";
import { CheckCircle, XCircle } from "lucide-react";
import useSocket from "@/hooks/useSocket";

const RaidDriveVisualizer = ({
  activeDevices,
  failedDevices,
  spareDevices,
  workingDevices,
  degraded,
}: {
  activeDevices: number;
  failedDevices: number;
  spareDevices: number;
  workingDevices: number;
  degraded: number;
}) => {
  const drives = [];
  for (let i = 0; i < activeDevices; i++) {
    drives.push({ name: i, state: "active" });
  }
  for (let i = 0; i < workingDevices; i++) {
    drives.push({ name: i, state: "working" });
  }
  for (let i = 0; i < failedDevices; i++) {
    drives.push({ name: i, state: "failed" });
  }
  for (let i = 0; i < spareDevices; i++) {
    drives.push({ name: i, state: "spare" });
  }
  for (let i = 0; i < degraded; i++) {
    drives.push({ name: i, state: "degraded" });
  }

  return (
    <div className="flex">
      {drives.map((drive, index) => (
        <div
          key={index}
          className="flex items-center justify-center h-8 w-8 mr-1"
        >
          <div
            className={`h-4 w-4 rounded-full ${drive.state === "active"
                ? "bg-green-500"
                : drive.state === "working"
                  ? "bg-green-500"
                  : drive.state === "failed"
                    ? "bg-red-500"
                    : drive.state === "spare"
                      ? "bg-blue-500"
                      : drive.state === "degraded"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
              }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export function RaidHealth() {
  const { data } = useSocket("http://localhost:6011");
  const raidHealth = data?.message?.raidHealth;
  if (!raidHealth) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span>Fetching RAID health...</span>
        </div>
      </div>
    );
  }
  const error = raidHealth.error;
  if (error) {
    return (
      <div>
        <div className="flex items-center">
          <XCircle className="mr-2 h-4 w-4 text-red-500" />
          <span>RAID Error: {error}</span>
        </div>
      </div>
    );
  }

  const {
    raidLevel,
    arraySize,
    state,
    activeDevices,
    workingDevices,
    failedDevices,
    spareDevices,
    degraded,
  } = raidHealth;

  return (
    <div className="flex flex-col">
      <span className="mr-2">Level: {raidLevel}</span>
      <span className="mr-2">Size: {arraySize}</span>
      <div className="flex flex-wrap">
        <span className="mr-2">
          Working: {workingDevices} / {activeDevices}
        </span>
        {failedDevices > 0 && (
          <span className="mr-2">Failed: {failedDevices}</span>
        )}
        {spareDevices > 0 && (
          <span className="mr-2">Spare: {spareDevices}</span>
        )}
        {degraded > 0 && <span className="mr-2">Degraded: {degraded}</span>}
      </div>

      <RaidDriveVisualizer
        activeDevices={activeDevices}
        failedDevices={failedDevices}
        spareDevices={spareDevices}
        workingDevices={workingDevices}
        degraded={degraded}
      />

      <div className="flex flex-wrap">
        {state === "clean" ? (
          <div className="flex badge bg-green-500">
            <CheckCircle className="mt-1 mr-1 h-4 w-4 text-black-500" />
            <span className="text-black-500 ">RAID Healthy</span>
          </div>
        ) : (
          <>
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
            <span>RAID {status === "degraded" ? "Degraded" : "Failed"}</span>
          </>
        )}
      </div>
    </div>
  );
}
