const { list, show, save, update } = require("./user.service");
const { createLog } = require("../appLogs/appLog.service");

const index = async (req, res, next) => {
  let users = null;
  try {
    users = await list();
  } catch (e) {
    await createLog(e);
  } finally {
    if (users !== null) {
      res.send({
        users,
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
  const { id } = req.params;
  let user = null;
  try {
    user = await show(id);
  } catch (e) {
    await createLog(e);
  } finally {
    if (user !== null) {
      res.send({
        user,
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
  const data = req.body;
  let user = null;
  try {
    user = await save(data);
  } catch (e) {
    await createLog(e);
  } finally {
    if (user !== null) {
      res.send({
        user,
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

const edit = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    user = await update(id, bodyData);
  } catch (e) {
    await createLog(e);
  } finally {
    if (user !== null) {
      res.send({
        user,
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
