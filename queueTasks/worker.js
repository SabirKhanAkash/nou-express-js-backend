const { Worker } = require("bullmq");
const { default: IORedis } = require("ioredis");
const generateTicket = require("./generateTicket");
const invalidateTicket = require("./invalidateTicket");

const redisConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const generateWorker = new Worker(
  "ticketQueue",
  async (job) => {
    if (job.name === "generateTicket") {
      await generateTicket();
    } else if (job.name === "invalidateTicket") {
      await invalidateTicket();
    }
  },
  {
    connection: redisConnection,
  },
);

generateWorker.on("completed", (job) => {
  console.log(`job ${job.id} has been completed`);
});
generateWorker.on("failed", (job, err) => {
  console.log(`job ${job.id} failed with error ${err.message}`);
});
