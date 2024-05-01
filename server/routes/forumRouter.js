const express = require('express')
const { getAllDiscussions, getForumDiscussions, postDiscussion, getDiscussion } = require('../controllers/forumController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

/**
 * @swagger
 * /forum:
 *   get:
 *     summary: Get all discussions
 *     description: Retrieves all discussions along with user information sorted by time.
 *     tags:
 *       - Discussions
 *     responses:
 *       '200':
 *         description: Successful response with discussions data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 forum:
 *                   type: string
 *                   description: Forum name
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


router.get('/', getAllDiscussions);

router.get('/:forum', getForumDiscussions)

router.get('/:forum/discussion/:id', getDiscussion)

router.post('/:forum/discussion', verifyJWT, postDiscussion)

module.exports = router;