const express = require('express')
const router =express.Router()

const {
    getAll,
    getByid,
    getByUserid,
    getByEventid,
    addReservation,
    updateByid,
    deleteByid,
}= require('../controllers/reservation')

router.get('/getAll', getAll);
router.get('/getByID/:id', getByid);
router.get('/getByUserID/:id', getByUserid);
router.get('/getByEventID/:id', getByEventid);
router.post('/add', addReservation);
router.put('/update/:id', updateByid);
router.delete('/delete/:id', deleteByid);

module.exports = router