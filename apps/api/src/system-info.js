const { exec } = require("child_process");

/**
 * Get disk usage statistics
 */
function getDiskUsage() {
  return new Promise((resolve, reject) => {
    exec("df -h --output=source,size,used,avail,pcent /", (error, stdout) => {
      if (error) return reject(error);

      const lines = stdout.trim().split("\n");
      const headers = lines[0].split(/\s+/);
      const values = lines[1].split(/\s+/);

      const result = headers.reduce((acc, header, index) => {
        acc[header.toLowerCase()] = values[index];
        return acc;
      }, {});

      /*
      result {
        filesystem: 'overlay',
        size: '147G',
        used: '133G',
        avail: '6.3G',
        'use%': '96%'
      }
      */

      resolve(result);
    });
  });
}

function parseRaidOutput(stdout) {
  const healthInfo = {};
  const lines = stdout.trim().split("\n");

  lines.forEach((line) => {
    if (line.includes("State")) {
      healthInfo.state = line.split(":")[1].trim();
    } else if (line.includes("Array Size")) {
      healthInfo.arraySize = line.split(":")[1].trim();
    } else if (line.includes("Raid Level")) {
      healthInfo.raidLevel = line.split(":")[1].trim();
    } else if (line.includes("Active Devices")) {
      healthInfo.activeDevices = line.split(":")[1].trim();
    } else if (line.includes("Working Devices")) {
      healthInfo.workingDevices = line.split(":")[1].trim();
    } else if (line.includes("Spare Devices")) {
      healthInfo.spareDevices = line.split(":")[1].trim();
    } else if (line.includes("Failed Devices")) {
      healthInfo.failedDevices = line.split(":")[1].trim();
    } else if (line.includes("Degraded")) {
      healthInfo.degraded = line.split(":")[1].trim();
    }
  });

  return healthInfo;
}

/**
 * Get RAID health and status information
 */
function getRaidHealth() {
  return new Promise((resolve, reject) => {
    // @TODO Remove true force
    if (true || process.env.DEVMODE === "1") {
      const mockStdout = `
        /dev/md0:
          Version : 1.2
          Creation Time : Fri Oct 27 12:34:56 2023
          Raid Level : raid5
          Array Size : 1953123456 (1.82 TiB)
          Used Dev Size : 976561728 (931.32 GiB)
          Raid Devices : 3
          Total Devices : 3
          Persistence : Superblock is persistent
        
          State : clean
          Active Devices : 3
          Working Devices : 3
          Failed Devices : 0
          Spare Devices : 0
          Degraded : 0
      `;
      return resolve(parseRaidOutput(mockStdout));
    }

    // @TODO /dev/md0 might not be the raid device we want in the future.
    // this works for my server for now
    exec("mdadm --detail /dev/md0", (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(stderr);

      resolve(parseRaidOutput(stdout));
    });
  });
}

/**
 * Get CPU usage
 */
function getCpuUsage() {
  return new Promise((resolve) => {
    exec(
      "top -bn1 | grep '^%Cpu' | sed 's/.*, *\([0-9.]*\)%* id.*/\x01/' | awk '{print 100 - $1}'",
      (error, stdout, stderr) => {
        if (error || stderr) {
          resolve({
            error: `Error getting CPU usage: ${stderr || error.message}`,
          });
        } else {
          resolve({ cpuUsage: stdout.trim() }); // CPU usage as a percentage
        }
      },
    );
  });
}

/**
 * Get memory usage
 */
function getMemoryUsage() {
  return new Promise((resolve) => {
    exec(
      'free -m | grep Mem | awk \'{print $3 "/" $2 " MB"}\'',
      (error, stdout, stderr) => {
        if (error || stderr) {
          resolve({
            error: `Error getting memory usage: ${stderr || error.message}`,
          });
        } else {
          // Extracting numbers from the string (x/y MB)
          const match = stdout.trim().match(/(\d+)\/(\d+) MB/);

          if (match) {
            const used = parseInt(match[1], 10);
            const total = parseInt(match[2], 10);

            resolve({
              usageString: stdout.trim(),
              used: used,
              total: total,
            });
          } else {
            resolve({ error: "Could not parse memory usage" });
          }
        }
      },
    );
  });
}

/**
 * Get system temperature
 */
function getTemperature() {
  return new Promise((resolve) => {
    exec(
      "sensors | grep 'Core' | awk '{print $1 \": \" $3}'",
      (error, stdout, stderr) => {
        if (error || stderr) {
          resolve({
            error: `Error getting temperature: ${stderr || error.message}`,
          });
        } else {
          resolve({ temperature: stdout.trim() }); // Temperature of CPU cores
        }
      },
    );
  });
}

module.exports = {
  getDiskUsage,
  getRaidHealth,
  getCpuUsage,
  getMemoryUsage,
  getTemperature,
};
