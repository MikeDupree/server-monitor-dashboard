"use client";
import useSocket from "@/hooks/useSocket";

export const ServerInfo = () => {
  const { data } = useSocket("http://localhost:6011");
  console.log("data", data);
  const { os, hostname, machine } = data?.message || {
    hostname: "NetUnknown",
    os: { type: "unknown", release: "unknown" },
    machine: { type: "unknown", platform: "unknown", arch: "unknown" },
  };

  return (
    <div className="flex flex-col columns-1 items-center">
      <h1 className="text-2xl font-bold">Server Info</h1>
      <span className="text-gray-500 ml-2">({hostname})</span>
      <h2 className="text-lg font-bold mb-4">
        OS: {os.type} {os.release}
      </h2>

      <h2 className="text-lg font-bold mb-4">
        🖥️: {machine.platform} {machine.type} {machine.arch}
      </h2>
    </div>
  );
};
