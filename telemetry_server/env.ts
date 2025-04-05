import z from "zod";

const envSchema = z.object({
  HTTP_PORT: z.coerce.number().default(3000),
  DATABASE_LOCATION: z.string().default("/data/telemetry.db"),
  CLIENT_PUBLIC_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
