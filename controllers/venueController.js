const db = require('../config/db');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloudinary_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET,
});



const getAllVenues = async (req, res) => {
  try {
    const [venues] = await db.query(`SELECT * FROM venues`);
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: venues,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get new data',
      error,
    });
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// add venue with image
const addVenue = async (req, res) => {
  const { name, description, capacity, address } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image not provided',
      });
    }

    const venues = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
      folder: 'venues',
    });
    const [venue] = await db.query(
      'INSERT INTO venues (name, descr capacity, image, address) VALUES (?,?,?,?,?);',
      [name, description, capacity, venues.secure_url, address]
    );

    res.status(201).json({
      success: true,
      message: 'Data added successfully',
      data: venue,
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

  const getVenueByID = async (req, res) => {
    try {
      const [venues] = await db.query(`SELECT * FROM venues WHERE id = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: venues,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get data',
        error,
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
  


  const deleteVenue = async (req, res) => {
    try {
      const [venues] = await db.query(`DELETE FROM venues WHERE id= ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        data: venues,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to delete data',
        error,
      });
    }
  };

  module.exports = {
     getAllVenues, 
     getVenueByID, 
     addVenue, 
     updateVenue,
     deleteVenue  
    };