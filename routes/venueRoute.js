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

const upload = multer({ storage: multer.memoryStorage() });

router.get('/getall', getAllVenues)
router.get('/getbyid/:id', getVenueByID)
router.post('/add', upload.single('image'), addVenue);
router.put('/update/:id', upload.single('image'), updateVenue);
router.delete('/delete/:id', deleteVenue)


module.exports= router;