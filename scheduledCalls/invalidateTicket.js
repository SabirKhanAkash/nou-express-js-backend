const schedule = require("node-schedule");
const package = require("../package.json");
const version = package?.version;
const Ticket = require("../app/src/modules/ticket/ticket.model");

const invalidateTicket = schedule.scheduleJob("01 * * * *", async function () {
  let updateData;
  try {
    updateData = await Ticket.updateMany(
      { journey_date_time: { $lt: new Date() } },
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
      `Total ${
        updateData?.nModified || 0
      } Ticket(s) invalidated which was before ${new Date().toLocaleTimeString()} of ${new Date().toLocaleDateString()} !`,
    );
  }
});

module.exports = invalidateTicket;
