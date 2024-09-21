const AllLookUp = require("../app/src/modules/allLookUps/allLookUp.model");

async function generateJourneyTimes(eachVendor) {
  let journey_times = [];
  const registeredJourneyTimes = await AllLookUp.find({
    type: "journey_time",
    vendors: {
      $elemMatch: {
        id: eachVendor?._id,
        is_active: true,
      },
    },
  }).select({
    title: 1,
  });

  for (const eachJourneyTime of registeredJourneyTimes) {
    if (eachJourneyTime) {
      journey_times.push(eachJourneyTime?.title);
    }
  }

  return journey_times;
}

module.exports = { generateJourneyTimes };
