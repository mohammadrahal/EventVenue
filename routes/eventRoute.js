const express = require('express')
const router = express.Router()

const{
    getEvnet,
    getEvnetById,
    addEvent,
    updateEvent,
    deleteEvent
}= require('../controllers/eventController')

router.get('/getall', getEvnet)
router.get('/getbyid/:id', getEvnetById)
router.post('/add', addEvent)
router.put('/update/:id', updateEvent)
router.delete('/delete/:id', deleteEvent)

module.exports = router