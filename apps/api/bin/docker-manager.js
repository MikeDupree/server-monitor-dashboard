const { execSync, spawn } = require("child_process");

const CONTAINER_NAME = "linux-monitor-api";
const IMAGE_NAME = "linux-monitor-api";

function isContainerRunning() {
  try {
    const output = execSync(
      `docker ps --filter "name=${CONTAINER_NAME}" --format '{{.Names}}'`,
      { encoding: "utf8" },
    ).trim();
    return output === CONTAINER_NAME;
  } catch (error) {
    return false;
  }
}

function isImageAvailable() {
  try {
    const output = execSync(`docker images -q ${IMAGE_NAME}`, {
      encoding: "utf8",
    }).trim();
    return output.length > 0;
  } catch (error) {
    return false;
  }
}

function buildImage() {
  console.log(`Building Docker image: ${IMAGE_NAME}...`);
  execSync(`docker build -t ${IMAGE_NAME} .`, { stdio: "inherit" });
}

function runContainer() {
  console.log(`Running Docker container: ${CONTAINER_NAME}...`);
  spawn(
    "docker",
    [
      "run",
      "--rm",
      "-it",
      "-v",
      `${process.cwd()}:/app`,
      "-v",
      "/app/node_modules",
      "--privileged",
      "-p",
      "-v",
      "/dev:/dev",
      "-v",
      "/proc:/proc",
      "-v",
      "/sys:/sys",
      "6010:6010",
      "--name",
      CONTAINER_NAME,
      IMAGE_NAME,
    ],
    { stdio: "inherit" },
  );
}

function manageDocker() {
  if (isContainerRunning()) {
    console.log("✅ Container is already running. Nothing to do.");
    return;
  }

  if (!isImageAvailable()) {
    buildImage();
  }

  runContainer();
}

manageDocker();
