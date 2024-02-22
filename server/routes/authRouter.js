const express = require('express');
const router = express.Router();
const { loginController, registerController, checkUser, logout, deleteUser, getUserDetails, updateUser } = require('../controllers/authControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/csrftoken', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})

router.post('/login', loginController);

router.post('/register', registerController);

router.use(verifyJWT);

router.delete("/", deleteUser);

router.put("/", updateUser);

router.get("/getUserDetails", getUserDetails);

router.get('/check', checkUser);

router.get("/logout", logout);

module.exports = router;