const User = require("../app/src/modules/users/user.model");
const { generateOTP } = require("./generateOTP");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");

const isUserAuthorized = async (data) => {
  const authorizedUser = {};
  try {
    const phoneNoFound = await User.findOne({
      phone_no: data?.phoneNo,
      is_active: true,
    }).exec();
    if (phoneNoFound && data?.authSource === "nou-mobile") {
      try {
        generateOTP(data?.phoneNo);
      } catch (err) {
        await createLog(err);
      } finally {
        authorizedUser["isAuthorized"] = true;
      }
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
