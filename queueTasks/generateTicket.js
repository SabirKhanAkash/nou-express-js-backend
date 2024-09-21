const AllLookUp = require("../app/src/modules/allLookUps/allLookUp.model");
const { save } = require("../app/src/modules/ticket/ticket.service");
const User = require("../app/src/modules/users/user.model");
const { ticketQueue } = require("./bullmq");
const { generateJourneyTimes } = require("./generateJourneyTimes");
const { generateSeatTypes } = require("./generateSeatTypes");
const { generateStations } = require("./generateStations");

const generateTicket = async () => {
  const activeVendors = await User.find({ is_active: true, role: "vendor" });

  for (let eachVendor of activeVendors) {
    let totalSuccess = 0;

    let totalFailure = 0;

    let seat_types = await generateSeatTypes(eachVendor);

    let stations = await generateStations(eachVendor);

    let journey_times = await generateJourneyTimes(eachVendor);

    for (let source = 0; source < stations?.length; source++) {
      for (let destination = 0; destination < stations?.length; destination++) {
        if (stations[source] !== stations[destination]) {
          for (let seat_type of seat_types) {
            const ticketPayload = {
              seat_category: seat_type?.title,
              source: stations[source],
              destination: stations[destination],
              count: seat_type?.capacity,
              journey_time: journey_times,
              price: seat_type?.price,
            };
            let { success, failure } = await save(ticketPayload);
            totalSuccess += success;
            totalFailure += failure;
          }
        }
      }
    }
    console.log(
      `Total ${
        totalSuccess - totalFailure
      } Ticket(s) created for ${new Date().toLocaleDateString()}!`,
    );
  }
};

ticketQueue.add("generateTicket", {}, { repeat: { cron: "0 1 * * *" } });

module.exports = generateTicket;
