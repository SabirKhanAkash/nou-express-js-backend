const { userData } = require("../../../../auth/permission");
const Ticket = require("./ticket.model");
const { createLog } = require("../appLogs/appLog.service");
const package = require("../../../../package.json");
const version = package.version;

const list = async () => {
  let compactData = {};
  try {
    compactData["ticketList"] = await Ticket.find().sort({ _id: -1 });
    compactData["count"] = await Ticket.countDocuments({});
  } catch (error) {
    await createLog(error);
  } finally {
    return compactData;
  }
};

const show = async (id) => {
  let showData = {};
  try {
    showData = await Ticket.findOne({ _id: id }).exec();
  } catch (error) {
    await createLog(error);
  } finally {
    return showData;
  }
};

const save = async (data) => {
  let saveData = {};
  try {
    for (let i = 0; i < 24; i = i + 1) {
      const date = new Date(new Date());
      date.setHours(i);
      date.setMinutes(0);
      data.journeyDateTime = `${date.toDateString()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:00 GMT+0600 (Bangladesh Standard Time)`;
      for (let j = 0; j < data.count; j++) {
        if (data.seat_category == "ফ্লোর" || data.seat_category == "Floor") {
          data.price = 70;
        }
        if (data.seat_category == "ডেক" || data.seat_category == "Deck") {
          data.price = 100;
        }
        if (data.seat_category == "চেয়ার" || data.seat_category == "Chair") {
          data.price = 150;
        }
        if (
          data.seat_category == "এসি চেয়ার" ||
          data.seat_category == "AC Chair"
        ) {
          data.price = 200;
        }
        if (
          data.seat_category == "সিঙ্গেল কেবিন" ||
          data.seat_category == "Single Cabin"
        ) {
          data.price = 800;
        }
        if (
          data.seat_category == "এসি সিঙ্গেল কেবিন" ||
          data.seat_category == "AC Single Cabin"
        ) {
          data.price = 1000;
        }
        if (
          data.seat_category == "ডাবল কেবিন" ||
          data.seat_category == "Double Cabin"
        ) {
          data.price = 1200;
        }
        if (
          data.seat_category == "এসি ডাবল কেবিন" ||
          data.seat_category == "AC Double Cabin"
        ) {
          data.price = 1500;
        }
        if (data.seat_category == "ভিআইপি" || data.seat_category == "VIP") {
          data.price = 2000;
        }
        saveData = new Ticket(data).save();
      }
    }
  } catch (error) {
    await createLog(error);
  } finally {
    return saveData;
  }
};

const update = async (id, data) => {
  let updateData = {};
  try {
    updateData = await Ticket.findByIdAndUpdate(
      id,
      {
        price: data.price,
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
    return updateData;
  }
};

const lookup = async (phone_no, ticketBody) => {
  let lookupData = {};
  try {
    let ticketList;
    const formattedDate = new Date(ticketBody.journeyDateTime);
    const formattedDateString =
      formattedDate.toDateString() +
      " " +
      formattedDate.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Asia/Dhaka",
      }) +
      " GMT+0600 (Bangladesh Standard Time)";
    const availableTicketCount = await Ticket.find({
      seat_category: ticketBody.seat_category,
      source: ticketBody.source,
      destination: ticketBody.destination,
      journeyDateTime: formattedDateString,
      sold: false,
      is_active: true,
    }).countDocuments({});

    if (availableTicketCount >= ticketBody.adultItemCount) {
      ticketList = await Ticket.find({
        seat_category: ticketBody.seat_category,
        source: ticketBody.source,
        destination: ticketBody.destination,
        journeyDateTime: formattedDateString,
        sold: false,
        is_active: true,
      });
    }
    lookupData["ticketList"] = ticketList;
    lookupData["count"] = availableTicketCount;
    lookupData["status"] = "Success";
  } catch (error) {
    await createLog(error);
    lookupData["status"] = "Failed";
  } finally {
    return lookupData;
  }
};

module.exports = { list, show, save, update, lookup };
