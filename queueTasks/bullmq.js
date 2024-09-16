const { Queue } = require("bullmq");
const { default: IORedis } = require("ioredis");
const redisConnection = { connection: new IORedis(process.env.REDIS_URL) };
const workerRedisConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const ticketQueue = new Queue("ticketQueue", redisConnection);

module.exports = {
  ticketQueue,
  workerRedisConnection,
  redisConnection,
};
