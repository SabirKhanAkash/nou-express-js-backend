const AllLookUp = require("../app/src/modules/allLookUps/allLookUp.model");

async function generateStations(eachVendor) {
  let stations = [];
  const registeredStations = await AllLookUp.find({
    type: "station",
    vendors: {
      $elemMatch: {
        id: eachVendor?._id,
        is_active: true,
      },
    },
  }).select({
    title: 1,
  });

  for (const eachStation of registeredStations) {
    if (eachStation) {
      stations.push(eachStation?.title);
    }
  }

  return stations;
}

module.exports = { generateStations };
