import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "staging", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  DATABASE_SCHEMA: z.string(),
  JWT_SECRET: z.string(),
  CLOUDFARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  CLOUDFARE_PUBLIC_CDN: z.string(),
});

const _env = schema.safeParse(process.env);

if (_env.error) {
  console.error("❌ Invalid environment variables", _env.error.issues);
  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
