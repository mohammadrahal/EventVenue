const db = require("../config/db");

// get 
const getAll = async (_, res) => {
const query = `SELECT reservations.id AS reservationid, reservations.userid, users.fullName, users.email, users.role, reservations.eventid, events.title, events.date, events.ticketPrice, events.description, events.venueid, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.id = reservations.userid
                    INNER JOIN events ON events.id = reservations.eventid
                    INNER JOIN venues ON venues.id = events.venueid;`;

  try {
    const [response] = await connection.query(query);
    res.status(200).json({
      success: true,
      message: `All reservations retrieved successfully `,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get all reservations`,
      error: error.message,
    });
  }
};

const getByid = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getReservationByid(id);
    return res.status(200).json({
      success: true,
      message: `Reservation of id = ${id} data retrieved successfully `,
      data: response[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get reservation by id = ${id}`,
      error: error.message,
    });
  }
};

const getByUserid = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT reservations.id AS reservationid, reservations.userid, users.fullName, users.email, users.role, reservations.eventid, events.title, events.date, events.ticketPrice, events.description, events.venueid, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.id = reservations.userid
                    INNER JOIN events ON events.id = reservations.eventid
                    INNER JOIN venues ON venues.id = events.venueid
                    WHERE reservations.userid = ?;`;

  try {
    const [response] = await connection.query(query, [id]);
    res.status(200).json({
      success: true,
      message: `All reservations for user with id = ${id} retrieved successfully `,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get all reservations for user with id = ${id}`,
      error: error.message,
    });
  }
};

const getByEventid = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT reservations.id AS reservationid, reservations.userid, users.fullName, users.email, users.role, reservations.eventid, events.title, events.date, events.ticketPrice, events.description, events.venueid, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.id = reservations.userid
                    INNER JOIN events ON events.id = reservations.eventid
                    INNER JOIN venues ON venues.id = events.venueid
                    WHERE reservations.eventid = ?;`;

  try {
    const [response] = await connection.query(query, [id]);
    res.status(200).json({
      success: true,
      message: `All reservations for event with id = ${id} retrieved successfully `,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get all reservations for event with id = ${id}`,
      error: error.message,
    });
  }
};

const addReservation = async (req, res) => {
  const { eventid, userid } = req.body;
  const query = `INSERT INTO reservations (eventid, userid) VALUES (?, ?);`;

  try {
    const [response] = await connection.query(query, [eventid, userid]);

    const [data] = await getReservationByid(response.insertid);
    res.status(200).json({
      success: true,
      message: `Reservation added successfully`,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to reserve a ticket for user with id ${userid} in event with id = ${eventid}`,
      error: error.message,
    });
  }
};

const updateByid = async (req, res) => {
  const { id } = req.params;
  const { eventid, userid } = req.body;
  const query = `UPDATE reservations SET eventid = ?, userid = ? WHERE id = ?;`;

  try {
    const [response] = await connection.query(query, [eventid, userid, id]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `Reservation with id = ${id} not found`,
      });
    const data = await getReservationByid(id);
    res.status(200).json({
      success: true,
      message: `Reservation with id = ${id} updated successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to update reservation with id = ${id}`,
      error: error.message,
    });
  }
};

const deleteByid = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM reservations WHERE id = ?;`;
  try {
    const [response] = await connection.query(query, [id]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `Reservation with id = ${id} not found`,
      });
    return res.status(200).json({
      success: true,
      message: `Reservation with id = ${id} deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to delete reservation with id = ${id}`,
      error: error.message,
    });
  }
};

const getReservationByid = async (id) => {
  const query = `SELECT reservations.id AS reservationid, reservations.userid, users.fullName, users.email, users.role, reservations.eventid, events.title, events.date, events.ticketPrice, events.description, events.venueid, venues.name, venues.description,venues.capacity,venues.image,venues.address
                    FROM reservations
                    INNER JOIN users ON users.id = reservations.userid
                    INNER JOIN events ON events.id = reservations.eventid
                    INNER JOIN venues ON venues.id = events.venueid
                    WHERE reservations.id = ?;`;
  try {
    const [response] = await connection.query(query, [id]);
    return response;
  } catch (error) {
    return error;
  }
};


module.exports = {
    getAll,
    getByid,
    getByEventid,
    getByUserid,
    addReservation,
    updateByid,
    deleteByid
}