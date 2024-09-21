const package = require("../package.json");
const version = package?.version;
const Ticket = require("../app/src/modules/ticket/ticket.model");
const { ticketQueue } = require("./bullmq");

const invalidateTicket = async () => {
  let updateData;
  try {
    updateData = await Ticket.deleteMany({
      journey_date_time: { $lt: new Date() },
      sold: false,
    }).exec();
  } catch (error) {
    await createLog(error);
  } finally {
    console.log(
      `Tickets invalidated which was before ${new Date().toLocaleTimeString()} of ${new Date().toLocaleDateString()} !`,
    );
  }
};

ticketQueue.add("invalidateTicket", {}, { repeat: { cron: "1 * * * * *" } });

module.exports = invalidateTicket;
