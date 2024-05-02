const express = require('express');
const router = express.Router();
const { loginController, registerController, checkUser, logout, deleteUser, getUserDetails, updateUser } = require('../controllers/authControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/csrftoken', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})

/**
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of a user by their ID, including both regular user and seller details.
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                   description: User details
 *                 seller:
 *                   $ref: '#/components/schemas/Seller'
 *                   description: Seller details
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */

router.post('/login', loginController);

router.post('/register', registerController);

router.use(verifyJWT);

router.delete("/", deleteUser);

router.put("/", updateUser);

router.get("/getUserDetails", getUserDetails);

router.get('/check', checkUser);

router.get("/logout", logout);

module.exports = router;