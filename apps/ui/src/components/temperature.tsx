"use client";
import useSocket from "@/hooks/useSocket";
import { Thermometer } from "lucide-react";

export function Temperature() {
  const { data } = useSocket("http://localhost:6011");
  const temperature = data?.message?.temperature;
  if (!temperature) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span>Fetching temperature...</span>
        </div>
      </div>
    );
  }
  const error = temperature.error;
  if (error) {
    return (
      <div>
        <div className="flex items-center">
          <span>Error getting temperature: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Thermometer className="mr-2 h-4 w-4" />
      <span>{temperature.value}°C</span>
    </div>
  );
}
