const AppLog = require("./appLog.model");

const createLog = async (error) => {
  try {
    AppLog.create({
      timestamp: new Date(),
      name: error.name,
      message: error.message,
      filepath: error.stack,
    });
  } catch (error) {
    console.log(`Failed to create new Error for ${error.message}`);
  }
};

module.exports = { createLog };
