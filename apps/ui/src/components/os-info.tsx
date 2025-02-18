"use client";

import { CheckCircle, XCircle } from "lucide-react";
import useSocket from "@/hooks/useSocket";

const OsInfo = () => {
  const { data } = useSocket("http://localhost:6011");
  const osInfo = data?.message?.osInfo;
  if (!osInfo) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span>Fetching OS info...</span>
        </div>
      </div>
    );
  }
  const error = osInfo.error;
  if (error) {
    return (
      <div>
        <div className="flex items-center">
          <XCircle className="mr-2 h-4 w-4 text-red-500" />
          <span>OS Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div>{error}</div>
      <span>{osInfo.value}</span>
    </div>
  );
};

export default OsInfo;
