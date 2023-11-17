const User = require("../app/src/modules/users/user.model");
const { generateOTP } = require("./generateOTP");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");

const isUserAuthorized = async (phone_no) => {
  const authorizedUser = {};
  try {
    phoneNoFound = await User.findOne({ phone_no: phone_no }).exec();
    if (phoneNoFound) {
      generateOTP(phone_no);
      authorizedUser["isAuthorized"] = true;
    } else {
      authorizedUser["isAuthorized"] = false;
    }
  } catch (error) {
    await createLog(error);
    authorizedUser["isAuthorized"] = false;
  } finally {
    return authorizedUser;
  }
};

module.exports = { isUserAuthorized };
