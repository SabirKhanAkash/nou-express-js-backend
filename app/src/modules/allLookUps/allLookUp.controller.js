const { list, show, save, update } = require("./allLookUp.service");
const { createLog } = require("../appLogs/appLog.service");

const index = async (req, res, next) => {
  let allLookUps = null;
  try {
    allLookUps = await list(req?.query);
  } catch (e) {
    await createLog(e);
  } finally {
    if (allLookUps !== null) {
      res.send({
        data: allLookUps,
        status: "Success",
      });
    } else {
      res.send({
        message: "Sorry! something went wrong. Please try again",
        status: "Failed",
      });
    }
  }
};

const view = async (req, res, next) => {
  const { type } = req?.params;
  let allLookUp = null;
  try {
    allLookUp = await show(type);
  } catch (e) {
    await createLog(e);
  } finally {
    if (allLookUp !== null) {
      res.send({
        data: allLookUp,
        status: "Success",
      });
    } else {
      res.send({
        message: "Sorry! something went wrong. Please try again",
        status: "Failed",
      });
    }
  }
};

const create = async (req, res, next) => {
  const data = req?.body;
  try {
    allLookUp = await save(data);
  } catch (e) {
    await createLog(e);
  } finally {
    if (allLookUp !== null) {
      res.send({
        status: "Success",
        data: allLookUp,
      });
    } else {
      res.send({
        message: "Sorry! something went wrong. Please try again",
        status: "Failed",
      });
    }
  }
};

const edit = async (req, res, next) => {
  const { id } = req?.params;
  const bodyData = req?.body;
  try {
    allLookUp = await update(id, bodyData);
  } catch (e) {
    await createLog(e);
  } finally {
    if (allLookUp !== null) {
      res.send({
        data: allLookUp,
        status: "Success",
      });
    } else {
      res.send({
        message: "Sorry! something went wrong. Please try again",
        status: "Failed",
      });
    }
  }
};

module.exports = { index, view, create, edit };
