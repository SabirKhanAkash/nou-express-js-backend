const schedule = require("node-schedule");
const axios = require("axios");

const generateTicket = schedule.scheduleJob("08 01 * * *", async function () {
  const url = process.env.BASE_URL + "/internal/ticket/create";
  const dhaToChadFloor = {
    seat_category: "ফ্লোর",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaFloor = {
    seat_category: "ফ্লোর",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadDeck = {
    seat_category: "ডেক",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaDeck = {
    seat_category: "ডেক",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadChair = {
    seat_category: "চেয়ার",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaChair = {
    seat_category: "চেয়ার",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadACChair = {
    seat_category: "এসি চেয়ার",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaACChair = {
    seat_category: "এসি চেয়ার",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadSingleCabin = {
    seat_category: "সিঙ্গেল কেবিন",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaSingleCabin = {
    seat_category: "সিঙ্গেল কেবিন",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadACSingleCabin = {
    seat_category: "এসি সিঙ্গেল কেবিন",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaACSingleCabin = {
    seat_category: "এসি সিঙ্গেল কেবিন",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadDoubleCabin = {
    seat_category: "ডাবল কেবিন",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaDoubleCabin = {
    seat_category: "ডাবল কেবিন",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadACDoubleCabin = {
    seat_category: "এসি ডাবল কেবিন",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaACDoubleCabin = {
    seat_category: "এসি ডাবল কেবিন",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  const dhaToChadVIP = {
    seat_category: "ভিআইপি",
    source: "ঢাকা",
    destination: "চাঁদপুর",
    count: 5,
  };
  const ChadToDhaVIP = {
    seat_category: "ভিআইপি",
    destination: "ঢাকা",
    source: "চাঁদপুর",
    count: 5,
  };
  await axios.post(url, dhaToChadFloor);
  await axios.post(url, ChadToDhaFloor);
  await axios.post(url, dhaToChadDeck);
  await axios.post(url, ChadToDhaDeck);
  await axios.post(url, dhaToChadChair);
  await axios.post(url, ChadToDhaChair);
  await axios.post(url, dhaToChadACChair);
  await axios.post(url, ChadToDhaACChair);
  await axios.post(url, dhaToChadSingleCabin);
  await axios.post(url, ChadToDhaSingleCabin);
  await axios.post(url, dhaToChadACSingleCabin);
  await axios.post(url, ChadToDhaACSingleCabin);
  await axios.post(url, dhaToChadDoubleCabin);
  await axios.post(url, ChadToDhaDoubleCabin);
  await axios.post(url, dhaToChadACDoubleCabin);
  await axios.post(url, ChadToDhaACDoubleCabin);
  await axios.post(url, dhaToChadVIP);
  await axios.post(url, ChadToDhaVIP);
  console.log(`Ticket created for ${new Date()}!`);
});

module.exports = generateTicket;
