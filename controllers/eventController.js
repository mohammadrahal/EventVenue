const db = require('../config/db')

// get evnet

const getEvnet = async (req, res) =>{
    try {
        const [event] = await db.query('SELECT * from events');
        res.status(200).json({
            success: true,
      message: "Event recived",
      data: event,

        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while getting events",
            erro: error.message,
        })
    }
}

// add event
const addEvent = async(res, req)=>{
    const {title, date, price, descr} = req.body
    try {
        const [event] = await db.query('INSERT INTO events (`title`, `even_date`, `ticket_price`, `descr`, `venuesid`) VALUES (?,?,?,?,?);')
        [title, date, price, descr]
        res.status(200).json({
            success: true,
            message: 'Event added',
            data: event,
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            message: 'Data deleted successfully',
            error:error.message ,
        })
    }
}

// update
const updateEvent = async (req, res) =>{
    
    try {
        
    } catch (error) {
        
    }
}

// delete
const deleteEvent = async (req, res) => {
    try {
      const [event] = await db.query(`DELETE FROM events WHERE id = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to delete data',
        error:error.message
      });
    }
  };
module.exports = {
getEvnet,
addEvent,
deleteEvent
}