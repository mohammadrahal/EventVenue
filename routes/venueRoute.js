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

const storage = multer.memoryStorage(); 
const upload = multer({ dest: 'uploads/'});

router.get('/getall', getAllVenues)
router.get('/getbyid/:id', getVenueByID)
router.post('/add', upload.single('image'), addVenue)
router.put('/updat/:id', updateVenue)
router.delete('/delete/:id', deleteVenue)


module.exports= router;