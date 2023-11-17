const db = require('../config/db');
const { imageUploader } = require('../extra/imageUploader');

const getAllVenues = async (_, res) => {
  const venues=  `SELECT id, name, description, capacity, image, address from venues `;
  try {
   const [response] =await db.query(venues)
return    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get new data',
      error:error.message,
    });
  }
};

// by id
const getVenueByID= async (req, res) => {
  const { id } = req.params;
  try {
    const response = await InfoById(id);
    return res.status(200).json({
      success: true,
      message: "Venue recived by id",
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


// add venue with image
const addVenue = async (req, res) => {
  const { name, description, capacity, address } = req.body;
  const query = `INSERT INTO venues (name, description, capacity, image, address) VALUES (?, ?, ?, ?, ?);`;
  try {
    const imageURL = await imageUploader(req.file);
    const [response] = await db.query(query, [
      name,
      description,
      capacity,
      imageURL,
      address,
    ]);
    const [data] = await InfoById(response.insertId);
    res.status(200).json({
      success: true,
      message: `Venue added successfully`,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to add venue`,
      error: error.message,
    });
  }
};

// update
const updateVenue = async (req, res) => {
  const { ID } = req.params;
  const { name, description, capacity, image, address } = req.body;
  const query = `UPDATE venues SET name = ?, description = ?, capacity = ?, image = ?, address = ? WHERE ID = ?;`;
  let imageURL = '';
  try {
    if (req.file) {
      imageURL = await imageUploader(req.file);
    } else {
      imageURL = image;
    }
    console.log(imageURL);
    const [response] = await db.query(query, [
      name,
      description,
      capacity,
      imageURL,
      address,
      ID,
    ]);
    const data = await getVenueByID(ID);
    res.status(200).json({
      success: true,
      message: `Venue with ID = ${ID} updated successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to update venue with id = ${ID}`,
      error: error.message,
    });
  }
};



  // delete
const deleteVenue = async (req, res) => {
  const {id}= req.params;
  const event = `DELETE FROM venues WHERE id = ?;`;
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
  const query = `SELECT id, name, description, capacity, image, address from venues  WHERE id = ? `;
  try {
    const response = await db.query(query, [id]);
    return response;
  } catch (error) {
    return error;
  }
};
  module.exports = {
     getAllVenues, 
     getVenueByID, 
     addVenue, 
     updateVenue,
     deleteVenue  
    };