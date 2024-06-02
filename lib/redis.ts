import Redis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";
const redisUrl = isProduction
  ? process.env.REDIS_URL
  : "redis://localhost:6379";

let redis;

if (redisUrl) {
  redis = new Redis(redisUrl);
} else {
  console.error("REDIS_URL environment variable is not set");
}

export default redis;
