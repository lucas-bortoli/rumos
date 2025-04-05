# Use the official Bun image
FROM oven/bun:1.2.8

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and lockfile first for caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Create directory for SQLite database (will be overridden by volume mount)
RUN mkdir -p /data

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["bun", "run", "index.ts"]