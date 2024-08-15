import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "staging"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = schema.safeParse(process.env);

if (_env.error) {
  console.error(
    "❌ Invalid environment variables",
    _env.error.formErrors.fieldErrors
  );
  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
