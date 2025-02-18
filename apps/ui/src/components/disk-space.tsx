"use client";
import { Progress } from "@/components/ui/progress";
import useSocket from "@/hooks/useSocket";
interface DiskSpaceProps {
  used: number;
  total: number;
}

/*
 {
    "filesystem": "overlay",
    "size": "147G",
    "used": "133G",
    "avail": "6.3G",
    "use%": "96%"
}
*/

const convertSizeStringToInt = (value) => {
  const number = parseFloat(value.slice(0, -1)); // Get the numeric part

  return number;
};

export function DiskSpace() {
  const { data } = useSocket("http://localhost:6011");

  const diskUsage = data?.message?.diskUsage;

  if (!diskUsage) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span>Fetching disk usage...</span>
        </div>
      </div>
    );
  }

  const unitOfMeasure = diskUsage.size.slice(-1);
  const total = convertSizeStringToInt(diskUsage.size);
  const used = convertSizeStringToInt(diskUsage.used);
  const avail = convertSizeStringToInt(diskUsage.avail);
  const usedPercentage = (used / total) * 100;

  return (
    <div>
      <div className="flex  mb-2">
        <span>{used.toFixed(1)} / </span>
        <span>
          {total.toFixed(1)} {unitOfMeasure}
        </span>
      </div>
      <div className="flex  mb-2">
        <span>
          {avail} {unitOfMeasure} available
        </span>
      </div>
      <Progress value={usedPercentage} className="w-full" />
    </div>
  );
}
