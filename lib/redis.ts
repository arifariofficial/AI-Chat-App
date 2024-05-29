import { Redis } from "ioredis";
import RedisClient from "ioredis";

// Determine the environment (production or development)
const isProduction = process.env.NODE_ENV === "production";
const redisUrl = isProduction
  ? process.env.REDIS_URL
  : "redis://localhost:6379";

let redis: Redis | undefined;

if (redisUrl) {
  redis = new RedisClient(redisUrl);
} else {
  console.error("REDIS_URL environment variable is not set");
}

export default redis;
