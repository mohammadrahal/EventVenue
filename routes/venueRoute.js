const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    getAllVenues,
    getVenueByID,
    addVenue,
    updateVenue,
    deleteVenue
}= require('../controllers/venueController')


router.get('/getallvenus', getAllVenues)
router.get('/getbyid', getVenueByID)
router.post('/addvenue', addVenue)
router.put('/updatevenue', updateVenue)
router.delete('/deletevenue', deleteVenue)


module.exports= router;