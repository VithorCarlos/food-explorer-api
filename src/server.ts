import { env } from "@/env";
import { buildApp } from "./app";

async function start() {
  const app = await buildApp();

  await app.listen({
    port: env.PORT,
    host: "0.0.0.0",
  });

  console.log("Server is running at port:", env.PORT);
}

start();
