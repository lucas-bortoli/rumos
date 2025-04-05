import z from "zod";

const envSchema = z.object({
  HTTP_PORT: z.coerce.number().default(3000),
  TLS_CERT_PATH: z.string().optional(),
  TLS_KEY_PATH: z.string().optional(),
  DATABASE_LOCATION: z.string().default("/data/telemetry.db"),
  CLIENT_PUBLIC_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
