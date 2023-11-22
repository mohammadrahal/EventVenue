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
const isAuthenticated = require('../middelware/isAuth');
router.get('/getall', getAllUsers)
router.get('/getbyid/:id', getUserById)
router.post('/register', register )
router.post('/login', login)
router.put('/update/:id', isAuthenticated(['organizer', 'admin']), updateUser);
router.put(
  '/switchadmin/:id',
  isAuthenticated(['admin', 'organizer']),
  switchAdmin
);
router.delete('/delete/:id', isAuthenticated(['admin']), deleteUser);
module.exports= router;