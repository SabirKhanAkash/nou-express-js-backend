const { userData } = require("../../../../auth/permission");
const User = require("./user.model");
const { createLog } = require("../appLogs/appLog.service");
const package = require("../../../../package.json");
const version = package.version;

const list = async () => {
  let compactData = {};
  try {
    compactData["userList"] = await User.find().sort({ _id: -1 });
    compactData["count"] = await User.countDocuments({});
  } catch (error) {
    await createLog(error);
    compactData["error"] = error.message;
  } finally {
    return compactData;
  }
};

const show = async (id) => {
  let showData = {};
  try {
    showData = await User.findOne({ _id: id }).exec();
  } catch (error) {
    await createLog(error);
    showData["error"] = error.message;
  } finally {
    return showData;
  }
};

const save = async (data) => {
  let saveData = {};
  try {
    saveData = new User(data).save();
  } catch (error) {
    await createLog(error);
    saveData["error"] = error.message;
  } finally {
    return saveData;
  }
};

const update = async (id, data) => {
  let updateData = {};
  try {
    updateData = await User.findByIdAndUpdate(
      id,
      {
        username: data.username,
        village: data.village,
        dob: data.dob,
        updated_date: new Date(),
        updated_by: userData.infos.phone_no,
        data_source: data.data_source,
        app_version: data.app_version,
        service_version: version,
      },
      {
        new: true,
      },
    ).exec();
  } catch (error) {
    await createLog(error);
    updateData["error"] = error.message;
  } finally {
    return updateData;
  }
};

module.exports = { list, show, save, update };
