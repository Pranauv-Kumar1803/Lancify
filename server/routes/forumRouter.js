const express = require('express')
const { getAllDiscussions, getForumDiscussions, postDiscussion, getDiscussion } = require('../controllers/forumController');
const { default: verifyJWT } = require('../middleware/verifyJWT');
const router = express.Router();

router.get('/', getAllDiscussions);

router.get('/:forum', getForumDiscussions)

router.get('/:forum/discussion/:id', getDiscussion)

router.post('/:forum/discussion', verifyJWT, postDiscussion)

module.exports = router;