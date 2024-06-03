import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379, // Explicitly parse as number
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
