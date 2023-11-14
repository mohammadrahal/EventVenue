const db = require("../config/db");

// get evnet
const getEvnet = async (_, res) => {
  const event = `SELECT  id, title, date, ticket_price, description, venuesid  FROM events`;
  try {
    const [response] = await db.query(event);
    return res.status(200).json({
      success: true,
      message: "Event recived",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while getting events",
      erro: error.message,
    });
  }
};
// by id
const getEvnetById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InfoById(id);
    return res.status(200).json({
      success: true,
      message: "Event recived by id",
      data: response[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while getting events",
      erro: error.message,
    });
  }
};

// add event
const addEvent = async (req, res) => {
  const { title, date, ticket_price, description, venuesid } = req.body;
  const event =
    "INSERT INTO events (title, date, ticket_price, description, venuesid) VALUES (?,?,?,?,?);";

  try {
    const [response] = await db.query(event, [
      title,
      date,
      ticket_price,
      description,
      venuesid,
    ]);

    const [data] = await InfoById(response.insertId);
    return res.status(200).json({
      success: true,
      message: "Event added",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while adding event",
      error: error.message,
    });
  }
};

// update
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, date, ticket_price, description } = req.body;

  const event = `UPADTE events SET title = ?, date = ?, ticket_price = ?, discreption = ? `;
  try {
    const [response] = await db.query(event, [
      title,
      date,
      ticket_price,
      description,
      id,
    ]);

    if (!response.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    const [data] = await InfoById(id);
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update event",
      error: error.message,
    });
  }
};

// delete
const deleteEvent = async (req, res) => {
  const {id}= req.params;
  const event = `DELETE FROM events WHERE id = ?;`;
  try {
    const [response] = await db.query(event, [id]);
    if (!response.affectedRows)
    return res.status(400).json({
      success: false,
      message: `event not found`,
    });
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete data",
      error: error.message,
    });
  }
};

const InfoById = async (id) => {
  const query = `SELECT  id, title, date, ticket_price, description, venuesid  FROM events where id = ?`;
  // or dont work becouse it not giving the right data
  // const query = `SELECT * FROM events  where id = ?`
  
  try {
    const response = await db.query(query, [id]);
    return response;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getEvnet,
  getEvnetById,
  addEvent,
  updateEvent,
  deleteEvent,
};
