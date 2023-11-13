const express = require('express')
const router = express.Router()

const{
    getEvnet,
    addEvent,
    deleteEvent
}= require('../controllers/eventController')

router.get('/getevent', getEvnet)
router.post('/addevent', addEvent)
router.delete('/deleteevent', deleteEvent)

module.exports = router