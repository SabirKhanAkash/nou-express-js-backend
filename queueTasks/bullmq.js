const { Queue } = require("bullmq");
const { default: IORedis } = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

const ticketQueue = new Queue("ticketQueue", {
  connection,
});

module.exports = {
  ticketQueue,
};
