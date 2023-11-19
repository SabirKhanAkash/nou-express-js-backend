const mongoose = require("mongoose");

const app = require("./app");
const port = process.env.PORT;

function dbConnection() {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Connected with Nou MongoDB");
  } catch (error) {
    console.log(error);
  }
}

dbConnection();
app.listen(port, () => {
  console.log(`Nou-backend is listening on port ${port}`);
});
