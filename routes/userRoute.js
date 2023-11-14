const express = require('express');
const router = express.Router();

const{
getAllUsers,
getUserById,
register,
login,
deleteUser,
updateUser,
switchAdmin
} = require('../controllers/userController')

router.get('/getall', getAllUsers)
router.get('/getbyid/:id', getUserById)
router.post('/register', register )
router.post('/login', login)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)
router.put('/switchadmin/:id', switchAdmin)
module.exports= router;