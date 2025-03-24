FROM node:20-slim

# Install system utlities
RUN apt-get update && apt-get install -y \
    curl \
    bash \
    inotify-tools \
    util-linux \
    smartmontools \
    sysstat \
    procps \
    mdadm \
    && rm -rf /var/lib/apt/lists/*


# Install pnpm manually
# Set SHELL environment variable to sh
ENV SHELL=/bin/bash
# Create shell profile file to satisfy pnpm
RUN touch /root/.bashrc
RUN npm install -g pnpm
RUN pnpm setup
# Ensure pnpm is in the PATH
ENV PATH="/root/.local/share/pnpm:$PATH"

# set app directory
WORKDIR /app

# Copy files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 6010

CMD ["pnpm", "start"]
