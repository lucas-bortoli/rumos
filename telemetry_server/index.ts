import type { Frame } from "../src/Lib/telemetry";

import { Database } from "bun:sqlite";
import { z } from "zod";
import { env } from "./env";
import Logger from "./logger";
import * as cors from "./cors";

const logger = new Logger("Main");

// SQLite Database Setup
const db = new Database(env.DATABASE_LOCATION);
db.exec(`
  CREATE TABLE IF NOT EXISTS frames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id TEXT NOT NULL,
    server_timestamp INTEGER NOT NULL,
    client_timestamp INTEGER NOT NULL,
    sequence INTEGER NOT NULL,
    data TEXT NOT NULL
  );
`);

// Zod schema for validating the request body
const FrameSchema = z.object({
  timestamp: z.number(),
  sequence: z.number(),
  content: z.any(),
});

logger.info(`Starting server listening on port ${env.HTTP_PORT}`);

const server = Bun.serve({
  port: env.HTTP_PORT,
  async fetch(request) {
    const url = new URL(request.url);

    logger.info(`${request.method.toUpperCase()} ${url.pathname}`, request.headers.toJSON());

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return cors.handleOptions();
    }

    // Health Check Endpoint
    if (url.pathname === "/health" && request.method === "GET") {
      return cors.enableCORS(new Response("OK"));
    }

    // Telemetry Endpoint
    if (url.pathname === "/telemetry" && request.method === "POST") {
      try {
        // Middleware: Extract client ID from headers
        const userId = request.headers.get("X-User-Id");
        if (!userId) {
          return cors.enableCORS(
            new Response(JSON.stringify({ error: "X-User-Id header is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            })
          );
        }

        const clientKey = request.headers.get("Authorization");
        if (!clientKey || clientKey !== env.CLIENT_PUBLIC_API_KEY) {
          return cors.enableCORS(
            new Response(
              JSON.stringify({ error: "Authorization header is required or is invalid" }),
              {
                status: 403,
                headers: { "Content-Type": "application/json" },
              }
            )
          );
        }

        const body = await request.json();
        const parsedFrames = FrameSchema.array().parse(body);
        const now = Date.now();

        // Prepare batch insert
        const insert = db.prepare(`
          INSERT INTO frames 
          (client_id, server_timestamp, client_timestamp, sequence, data)
          VALUES (?, ?, ?, ?, ?)
        `);

        // Use transaction for better performance
        db.transaction(() => {
          for (const frame of parsedFrames) {
            insert.run(userId, now, frame.timestamp, frame.sequence, JSON.stringify(frame.content));
          }
        })();

        return cors.enableCORS(
          new Response(JSON.stringify({ message: "Telemetry received" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } catch (error) {
        logger.error("Error processing telemetry:", error);
        return cors.enableCORS(
          new Response(JSON.stringify({ error: "Invalid telemetry data" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
    }

    // Not found handler
    return new Response("Not Found", { status: 404 });
  },
  error(error) {
    logger.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
});
