const express = require('express');
const router = express.Router();

const{
getAllUsers,
addUser
} = require('../controllers/userController')

router.get('/getuser', getAllUsers)
router.post('/adduser', addUser)

module.exports= router;