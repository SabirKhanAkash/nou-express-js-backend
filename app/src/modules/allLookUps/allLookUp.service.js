const { userData } = require("../../../../auth/permission");
const AllLookUp = require("./allLookUp.model");
const { createLog } = require("../appLogs/appLog.service");
const package = require("../../../../package.json");
const { paginate } = require("../../../../sharedUtils/paginate");
const version = package?.version;

const list = async (query) => {
  const {
    pageNo = 1,
    perPage = 20,
    type = "",
    title = "",
    titleBn = "",
    vendorId = "",
  } = query;
  let compactData = {};
  try {
    const totalCount = await AllLookUp.countDocuments({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { title_bn: { $regex: titleBn, $options: "i" } },
      ],
      $and: [
        { type: { $regex: type, $options: "i" } },
        { is_active: true },
        {
          vendors: {
            $elemMatch: {
              id: { $regex: vendorId, $options: "i" },
              is_active: true,
            },
          },
        },
      ],
    });

    const { totalPages, skipValue } = paginate({
      pageNumber: pageNo,
      perPage: perPage,
      totalCount: totalCount,
    });

    compactData["allLookUpList"] = await AllLookUp.find({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { title_bn: { $regex: titleBn, $options: "i" } },
      ],
      $and: [
        { type: { $regex: type, $options: "i" } },
        { is_active: true },
        {
          vendors: {
            $elemMatch: {
              id: { $regex: vendorId, $options: "i" },
              is_active: true,
            },
          },
        },
      ],
    })
      .skip(skipValue)
      .limit(perPage)
      .sort({ order_value: 1, _id: -1 })
      .select("type title title_bn")
      .lean();

    compactData["count"] = totalCount;
    compactData["totalPages"] = totalPages;
  } catch (error) {
    await createLog(error);
  } finally {
    return compactData;
  }
};

const show = async (type) => {
  let showData = {};
  try {
    showData = await AllLookUp.findOne({ type: type, is_active: true }).select(
      "-_id type values",
    );
  } catch (error) {
    await createLog(error);
  } finally {
    return showData;
  }
};

const save = async (data) => {
  let saveData = {};
  try {
    data.created_at = new Date();
    data.created_by = userData?.infos?.phone_no || "System";
    data.created_date = new Date();
    saveData = new AllLookUp(data).save();
  } catch (error) {
    await createLog(error);
    saveData["error"] = error?.message;
  } finally {
    return saveData;
  }
};

const update = async (id, data) => {
  let updateData = {};
  try {
    updateData = await AllLookUp.findOneAndUpdate(
      { _id: id },
      {
        ...(data?.vendors ? { $push: { vendors: data.vendors } } : {}),
        is_active: data?.is_active !== undefined ? data.is_active : undefined,
        type: data?.type ? data?.type : undefined,
        title: data?.title ? data?.title : undefined,
        title_bn: data?.title_bn ? data?.title_bn : undefined,
        order_value: data?.order_value ? data?.order_value : undefined,
        updated_date: new Date(),
        updated_at: new Date(),
        updated_by: userData?.infos?.phone_no || "System",
        data_source: "System",
        service_version: version,
      },
      { new: true },
    ).exec();
  } catch (error) {
    await createLog(error);
  } finally {
    return updateData;
  }
};

module.exports = { list, show, save, update };
