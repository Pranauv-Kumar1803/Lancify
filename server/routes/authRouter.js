const express = require('express');
const router = express.Router();
const { loginController, registerController, checkUser, logout, deleteUser, getUserDetails, updateUser } = require('../controllers/authControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/csrftoken', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: |
 *       Logs in a user and returns a JWT token for authentication.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       '400':
 *         description: Incorrect password or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */



/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /userDetails:
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