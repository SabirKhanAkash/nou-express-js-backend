const { save } = require("../app/src/modules/ticket/ticket.service");
const { ticketQueue } = require("./bullmq");

const generateTicket = async () => {
  // const seat_types = [
  //   { name: "ফ্লোর", capacity: 36 },
  //   { name: "ডেক", capacity: 81 },
  //   { name: "চেয়ার", capacity: 121 },
  //   { name: "এসি চেয়ার", capacity: 49 },
  //   { name: "সিঙ্গেল কেবিন", capacity: 16 },
  //   { name: "এসি সিঙ্গেল কেবিন", capacity: 4 },
  //   { name: "ডাবল কেবিন", capacity: 16 },
  //   { name: "এসি ডাবল কেবিন", capacity: 4 },
  //   { name: "ভিআইপি", capacity: 4 },
  // ];
  const seat_types = [
    { name: "FLOOR", capacity: 36 },
    { name: "DECK", capacity: 81 },
    { name: "CHAIR", capacity: 121 },
    { name: "AC_CHAIR", capacity: 49 },
    { name: "SINGLE_CABIN", capacity: 16 },
    { name: "AC_SINGLE_CABIN", capacity: 4 },
    { name: "DOUBLE_CABIN", capacity: 16 },
    { name: "AC_DOUBLE_CABIN", capacity: 4 },
    { name: "VIP", capacity: 4 },
  ];

  const masterStations = [
    "ঢাকা",
    "গাজীপুর",
    "নরসিংদী",
    "নারায়ণগঞ্জ",
    "টাঙ্গাইল",
    "কিশোরগঞ্জ",
    "মানিকগঞ্জ",
    "মাদারীপুর",
    "শরীয়তপুর",
    "মুন্সিগঞ্জ",
    "গোপালগঞ্জ",
    "ফরিদপুর",
    "রাজবাড়ী",
    "চট্টগ্রাম",
    "কুমিল্লা",
    "নোয়াখালী",
    "ফেনী",
    "ব্রাহ্মণবাড়িয়া",
    "চাঁদপুর",
    "লক্ষীপুর",
    "কক্সবাজার",
    "খাগড়াছড়ি",
    "রাঙামাটি",
    "বান্দরবান",
    "ময়মনসিংহ",
    "শেরপুর",
    "জামালপুর",
    "নেত্রকোণা",
    "রাজশাহী",
    "বগুড়া",
    "সিরাজগঞ্জ",
    "পাবনা",
    "নাটোর",
    "নওগাঁ",
    "জয়পুরহাট",
    "চাপাইনবাবগঞ্জ",
    "খুলনা",
    "যশোর",
    "বাগেরহাট",
    "সাতক্ষীরা",
    "কুষ্টিয়া",
    "ঝিনাইদহ",
    "মেহেরপুর",
    "নড়াইল",
    "চুয়াডাঙ্গা",
    "মাগুরা",
    "সিলেট",
    "মৌলভিবাজার",
    "হবিগঞ্জ",
    "সুনামগঞ্জ",
    "রংপুর",
    "দিনাজপুর",
    "পঞ্চগড়",
    "ঠাকুরগাঁও",
    "লালমনিরহাট",
    "কুড়িগ্রাম",
    "নীলফামারী",
    "গাইবান্ধা",
    "বরিশাল",
    "পিরোজপুর",
    "ভোলা",
    "ঝালকাঠি",
    "পটুয়াখালী",
    "বরগুনা",
  ];

  // const stations = ["ঢাকা", "চাঁদপুর"];

  const stations = ["DHAKA", "CHADPUR"];

  const journey_time = [
    "06:00 AM",
    "06:45 AM",
    "07:15 AM",
    "08:00 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:40 AM",
    "11:05 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "02:40 PM",
    "03:40 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "09:40 PM",
    "11:10 PM",
    "11:20 PM",
    "12:15 AM",
    "12:45 AM",
  ];

  let totalSuccess = 0,
    totalFailure = 0;

  for (let source = 0; source < stations?.length; source++) {
    for (let destination = 0; destination < stations?.length; destination++) {
      if (stations[source] !== stations[destination]) {
        for (let seat_type of seat_types) {
          const ticketPayload = {
            seat_category: seat_type?.name,
            source: stations[source],
            destination: stations[destination],
            count: seat_type?.capacity,
            journey_time: journey_time,
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
};

ticketQueue.add("generateTicket", {}, { repeat: { cron: "0 1 * * *" } });

module.exports = generateTicket;
