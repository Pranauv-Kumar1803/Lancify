const express = require('express')
const Comment = require("../models/Comment");
const User = require("../models/User");
const Discussion = require('../models/Discussion');
const router = express.Router();

router.get('/', async (req, res) => {
    const docs = await Discussion.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        { $sort: { 'time': -1 } }
    ]);

    // console.log(docs);
    docs.forEach((d) => {
        console.log(d.discussion.split('><'));
    })


    res.render('pages/forum', { data: docs, forum: 'Home' });
})

router.get('/:forum', async (req, res) => {
    const forum = req.params.forum;

    let docs = [];

    if (forum === 'home') {
        docs = await Discussion.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            { $sort: { 'time': -1 } }
        ]);
    }
    else {
        docs = await Discussion.aggregate([
            {
                $match: { "forum": forum }
            },
            { $sort: { 'time': -1 } }
        ]);
    }

    console.log(docs.length);

    res.render('pages/forum', { data: docs, forum });

})


module.exports = router;