const db = require('../config/db');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloudinary_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env,
});



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
  const venue = 'INSERT INTO venues (name, description, capacity, image, address) VALUES (?,?,?,?,?);';

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image not provided',
      });
    }

    const imageBuffer = req.file.buffer.toString('base64');
    const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
      folder: 'venues',
    });

    const [response] = await db.query(venue, [
      name,
      description,
      capacity,
      imageResult.secure_url, // Move this line after imageResult is initialized
      address
    ]);

    console.log(response);
    res.status(201).json({
      success: true,
      message: 'Data added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Unable to add new data',
      error: error.message,
    });
  }
};


  
  const updateVenue = async (req, res) => {
    const { name, description, capacity, address } = req.body;
    const VenueId = req.params.id;
  
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image not provided',
        });
      }
  
      const imageBuffer = req.file.buffer.toString('base64');
      const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
        folder: 'venues', 
      });
  
      
      const venues = await db.query(
        `UPDATE venues SET name = ?, descr= ?, capacity = ?, image = ?, address = ? WHERE id = ?`,
        [name, description, capacity, imageResult.secure_url, address, VenueId]
      );
  
      console.log(venues);
      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: 'Unable to update data',
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