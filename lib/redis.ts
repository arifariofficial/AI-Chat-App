import Redis from "ioredis";

// Determine the environment (production or development)
const isProduction = process.env.NODE_ENV === "production";
const redisUrl = isProduction
  ? process.env.REDIS_URL
  : "redis://localhost:6379";

// Explicitly define the type of 'redis' as 'Redis | undefined'
let redis: Redis | undefined;

if (redisUrl) {
  try {
    redis = new Redis(redisUrl);

    redis.on("error", (err) => {
      console.error("Redis error:", err);
    });
  } catch (error) {
    console.error("Failed to initialize Redis:", error);
  }
} else {
  console.error("REDIS_URL environment variable is not set");
}

export default redis;
