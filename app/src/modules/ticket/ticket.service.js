const { userData } = require("../../../../auth/permission");
const Ticket = require("./ticket.model");
const { createLog } = require("../appLogs/appLog.service");
const package = require("../../../../package.json");
const { paginate } = require("../../../../sharedUtils/paginate");
const version = package?.version;

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
  let saveData = {},
    success = 0,
    failure = 0;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed

  try {
    for (let hour = 0; hour < data?.journey_time?.length; hour++) {
      const day =
        data?.journey_time[hour]?.startsWith("12") &&
        data?.journey_time[hour]?.includes("AM")
          ? String(today.getDate() + 1).padStart(2, "0")
          : String(today.getDate()).padStart(2, "0");
      const dateTimeString = `${year}-${month}-${day} ${data?.journey_time[hour]}`;
      const journeyDate = new Date(dateTimeString);
      data.journey_date_time = journeyDate.getTime();

      for (let seat_count = 0; seat_count < data?.count; seat_count++) {
        if (data?.seat_category == "ফ্লোর") data.price = 70;
        if (data?.seat_category == "ডেক") data.price = 100;
        if (data?.seat_category == "চেয়ার") data.price = 150;
        if (data?.seat_category == "এসি চেয়ার") data.price = 200;
        if (data?.seat_category == "সিঙ্গেল কেবিন") data.price = 800;
        if (data?.seat_category == "এসি সিঙ্গেল কেবিন") data.price = 1000;
        if (data?.seat_category == "ডাবল কেবিন") data.price = 1200;
        if (data?.seat_category == "এসি ডাবল কেবিন") data.price = 1500;
        if (data?.seat_category == "ভিআইপি") data.price = 2000;
        saveData = new Ticket(data).save();
        success++;
      }
    }
  } catch (error) {
    failure++;
    await createLog(error);
  } finally {
    return { success, failure, saveData };
  }
};

const update = async (id, data) => {
  let updateData = {};
  try {
    updateData = await Ticket.findOneAndUpdate(
      { _id: id },
      {
        is_active:
          data && data?.is_active != undefined ? data?.is_active : undefined,
        price: data && data?.price ? data?.price : undefined,
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

const lookup = async (query, ticketBody) => {
  const {
    pageNo = 1,
    date = "date 31/12/9999",
    time = "time 11:59 PM",
    seatType = "",
    source = "",
    destination = "",
    passengerCount = 0,
    childPassengerCount = 0,
  } = query;
  let lookupData = {};
  const perPage = 48;
  try {
    const formattedDate = date?.trim()?.split(" ")[1];
    const formattedTime = `${time?.trim()?.split(" ")[1]} ${
      time?.split(" ")[2]
    }`;
    const [day, month, year] = formattedDate?.split("/");
    const dateTime = `${month}/${day}/20${year} ${formattedTime}`;
    const dateTimeObject = new Date(dateTime);
    const journeyDateTime = dateTimeObject?.getTime();

    const totalCount = await Ticket.countDocuments({
      seat_category: { $regex: seatType.toString() },
      source: { $regex: source.toString() },
      destination: { $regex: destination.toString() },
      journey_date_time: journeyDateTime,
      sold: false,
      is_active: true,
    });

    const { totalPages, skipValue } = paginate({
      pageNumber: pageNo,
      perPage: perPage,
      totalCount: totalCount,
    });

    const ticketList = await Ticket.find({
      seat_category: { $regex: seatType.toString() },
      source: { $regex: source.toString() },
      destination: { $regex: destination.toString() },
      journey_date_time: journeyDateTime,
      sold: false,
      is_active: true,
    })
      .skip(skipValue)
      .sort({ price: 1 })
      .lean();

    lookupData = {
      ticketList:
        ticketList?.length < passengerCount + childPassengerCount
          ? []
          : ticketList,
      count:
        ticketList?.length < passengerCount + childPassengerCount
          ? 0
          : totalCount,
      totalPages: totalPages,
      status: "Success",
    };
  } catch (error) {
    await createLog(error);
    lookupData = {
      status: "Failed",
    };
    lookupData["status"] = "Failed";
  } finally {
    return lookupData;
  }
};

module.exports = { list, show, save, update, lookup };
