const AllLookUp = require("../app/src/modules/allLookUps/allLookUp.model");

async function generateSeatTypes(eachVendor) {
  let seat_types = [];
  const seatTypes = await AllLookUp.find({
    type: "seat_category",
    vendors: {
      $elemMatch: {
        id: eachVendor?._id,
        is_active: true,
      },
    },
  }).select({
    title: 1,
    "vendors.$": 1,
  });

  for (const eachSeatType of seatTypes) {
    if (eachSeatType && eachSeatType?.vendors?.length > 0) {
      const _seatType = {
        title: eachSeatType?.title,
        capacity: eachSeatType?.vendors[0]?.capacity,
        price: eachSeatType?.vendors[0]?.price,
      };
      seat_types.push(_seatType);
    }
  }

  return seat_types;
}

module.exports = { generateSeatTypes };
