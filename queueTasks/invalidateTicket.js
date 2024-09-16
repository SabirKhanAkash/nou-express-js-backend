const package = require("../package.json");
const version = package?.version;
const Ticket = require("../app/src/modules/ticket/ticket.model");
const { ticketQueue } = require("./bullmq");

const invalidateTicket = async () => {
  let updateData;
  try {
    updateData = await Ticket.updateMany(
      { journey_date_time: { $lt: new Date() }, is_active: true },
      {
        is_active: false,
        updated_date: new Date(),
        updated_by: "System",
        data_source: "System",
        service_version: version,
      },
      {
        new: true,
      },
    ).exec();
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
