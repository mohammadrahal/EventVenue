const express = require('express')
const router = express.Router()

const{
    getEvnet,
    getEvnetById,
    addEvent,
    updateEvent,
    deleteEvent
}= require('../controllers/eventController')

router.get('/getevent', getEvnet)
router.get('/geteventbyid/:id', getEvnetById)
router.post('/addevent', addEvent)
router.put('/updateEvent', updateEvent)
router.delete('/deleteevent', deleteEvent)

module.exports = router