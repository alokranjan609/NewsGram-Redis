const { Redis } = require('ioredis');
require('dotenv').config();

// Log REDIS_URL to confirm it's set
console.log("🔍 Checking REDIS_URL:", process.env.REDIS_URL);

if (!process.env.REDIS_URL) {
    console.error("❌ REDIS_URL is not set! Make sure to define it in Render environment variables.");
    process.exit(1);
}

// Initialize Redis client with Upstash credentials
const client = new Redis(process.env.REDIS_URL, {
    tls: {}, // Required for Upstash secure connection
    maxRetriesPerRequest: 5, // Prevent excessive retries
});

client.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});

module.exports = client;
