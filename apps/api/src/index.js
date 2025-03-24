const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { getProcesses } = require("./os-utils");
const sysInfo = require("./system-info");

const app = express();
const server = http.createServer(app);
const PORT = 6010;
const os = require("os");

console.log("CPU Info:", os.cpus());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Uptime:", os.uptime());
console.log("OS Type:", os.type());
console.log("OS Release:", os.release());
console.log("Load Average:", os.loadavg());
console.log("Linux System Info API");
console.log("Available endpoints:");
console.log("GET /disk-usage");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Wildcard to allow all origins temporarily, adjust later
  },
});

// @TODO This functin should be smarter, not loading all the data at once everytime
const getServerData = async () => {
  console.log("getServerData");
  const diskUsage = await sysInfo.getDiskUsage();
  const raidHealth = await sysInfo.getRaidHealth().catch((e) => ({
    error: e.message,
  }));

  const cpuUsage = await sysInfo.getCpuUsage().catch((e) => ({
    error: e.message,
  }));

  const memoryUsage = await sysInfo.getMemoryUsage().catch((e) => ({
    error: e.message,
  }));

  const temperature = await sysInfo.getTemperature().catch((e) => ({
    error: e.message,
  }));

  console.log("getprocesses");
  const processes = [];
  // const processes = await getProcesses().catch((e) => ({
  //   error: e.message,
  // }));
  // console.log("processes", processes);

  console.log("build resonse");

  const response = {
    hostname: os.hostname(),
    os: {
      type: os.type(),
      release: os.release(),
    },
    machine: {
      type: os.machine(),
      platform: os.platform(),
      arch: os.arch(),
    },
    cpus: os.cpus(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    processes,
    uptime: os.uptime(),
    loadAverage: os.loadavg(),
    diskUsage,
    raidHealth,
    cpuUsage,
    memoryUsage,
    temperature,
  };
  console.log("response", response);
  return response;
};

// Listen for client connections
io.listen("6011");
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  const intervalId = setInterval(async () => {
    console.log("Send Update");
    const data = await getServerData();
    console.log("data", data);
    socket.emit("server-data", {
      message: data,
      timestamp: new Date(),
    });
  }, 1000);

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(intervalId);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Linux Server Monitor</h1>");
});

// API endpoint to get disk usage
app.get("/disk-usage", async (req, res) => {
  try {
    const usage = await getDiskUsage();
    res.json({ success: true, diskUsage: usage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`BASEURL: http://localhost:${PORT}`);
});
