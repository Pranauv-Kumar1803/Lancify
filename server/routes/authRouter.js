const express = require('express');
const router = express.Router();
const { loginController, registerController, checkUser, logout, deleteUser, getUserDetails, updateUser } = require('../controllers/authControllers');
const { default: verifyJWT } = require('../middleware/verifyJWT');

router.post('/login', loginController);

router.post('/register', registerController);

router.use(verifyJWT);

router.delete("/", deleteUser);

router.put("/", updateUser);

router.get("/getUserDetails", getUserDetails);

router.get('/check', checkUser);

router.get("/logout", logout);

module.exports = router;