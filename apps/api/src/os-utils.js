const osutils = require("node-os-utils");

const getProcesses = () => {
  return new Promise((resolve, reject) => {
    return osutils.proc.totalProcesses();
  });
};

module.exports = {
  getProcesses,
};
