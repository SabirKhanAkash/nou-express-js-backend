const { Worker } = require("bullmq");
const generateTicket = require("./generateTicket");
const invalidateTicket = require("./invalidateTicket");
const { workerRedisConnection } = require("./bullmq");

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
    connection: workerRedisConnection,
  },
);

generateWorker.on("completed", (job) => {
  console.log(`job ${job.id} has been completed`);
});

generateWorker.on("failed", (job, err) => {
  console.log(`job ${job.id} failed with error ${err.message}`);
});
