const { list, show, save, update, lookup } = require("./ticket.service");
const { createLog } = require("../appLogs/appLog.service");

const index = async (req, res, next) => {
  let tickets = null;
  try {
    tickets = await list();
  } catch (e) {
    await createLog(e);
  } finally {
    if (tickets !== null) {
      res.send({
        tickets,
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
  let ticket = null;
  try {
    ticket = await show(id);
  } catch (e) {
    await createLog(e);
  } finally {
    if (ticket !== null) {
      res.send({
        ticket,
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
    ticket = await save(data);
  } catch (e) {
    await createLog(e);
  } finally {
    if (ticket !== null) {
      res.send({
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
    ticket = await update(id, bodyData);
  } catch (e) {
    await createLog(e);
  } finally {
    if (ticket !== null) {
      res.send({
        ticket,
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

const search = async (req, res, next) => {
  const phone_no = req.headers.phone_no;
  const ticketBody = req.body;
  let tickets = null;
  try {
    tickets = await lookup(phone_no, ticketBody);
  } catch (e) {
    await createLog(e);
  } finally {
    if (tickets !== null && tickets.status === "Success") {
      res.send({
        tickets,
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

module.exports = { index, view, create, edit, search };
