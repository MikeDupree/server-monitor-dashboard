# Linux Server Monitor

A real-time monitoring solution for Linux servers that provides system resource information through a web interface. This application consists of a Node.js API backend and a React frontend, designed to monitor various system metrics including CPU, memory, disk usage, RAID health, and system temperature.

## Features

- Real-time system monitoring
- WebSocket-based live updates
- System metrics including:
  - CPU usage and information
  - Memory usage and statistics
  - Disk usage and storage information
  - RAID health status
  - System temperature
  - Process information
  - System uptime and load averages
- Local network-only access for security
- Docker support for easy deployment

## Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0
- Docker (optional, for containerized deployment)
- Linux system with the following commands available:
  - `df`
  - `free`
  - `top`
  - `sensors`
  - `mdadm` (for RAID monitoring)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/linux-monitor.git
cd linux-monitor
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the application:
```bash
pnpm build
```

## Development

To run the application in development mode:

```bash
pnpm dev
```

This will start both the API server and the frontend development server.

## Production Deployment

1. Set up environment variables:
```bash
cp apps/api/.env.example apps/api/.env
# Edit .env with your secure credentials
```

2. Start the API server:
```bash
cd apps/api
pnpm start:no-watch
```

3. Build and serve the frontend:
```bash
cd apps/ui
pnpm build
pnpm start
```

## Docker Deployment

The application can be deployed using Docker:

```bash
# Build the Docker image
pnpm docker:build

# Run the container
pnpm docker:run
```

For manual Docker deployment:
```bash
pnpm docker:run:manual
```

## API Endpoints

- `GET /` - Welcome page
- `GET /disk-usage` - Get disk usage information
- WebSocket endpoint on port 6011 for real-time updates

## Security Considerations

- The application is designed to run on local networks only
- Basic authentication is required for API access
- Rate limiting is implemented to prevent abuse
- Environment variables should be properly configured in production

## Project Structure

```
linux-monitor/
├── apps/
│   ├── api/         # Node.js backend API
│   ├── ui/          # React frontend
│   └── docs/        # Documentation
├── packages/        # Shared packages
└── turbo.json      # Turborepo configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Michael Dupree - mikerdupree@gmail.com

## Acknowledgments

- [node-os-utils](https://github.com/SunilWang/node-os-utils) for system information utilities
- [Express.js](https://expressjs.com/) for the API framework
- [Socket.IO](https://socket.io/) for real-time communication
