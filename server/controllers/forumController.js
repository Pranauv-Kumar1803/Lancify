const express = require('express');
const Discussion = require('../models/Discussion');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

const getAllDiscussions = async (req, res) => {
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

    return res.status(200).json({ data: docs, forum: 'Home' });
}

const getForumDiscussions = async (req, res) => {
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

    return res.status(200).json({ data: docs, forum });
}

const postDiscussion = async (req, res) => {
    console.log(req.body);

    const user = await User.findOne({ user_id: req._id });

    if (!user) {
        return res.status(404).json({ msg: "user not found!" });
    }

    console.log(user._id, typeof user._id);

    const d = new Discussion({
        discussion: req.body.msg,
        forum: req.params.forum,
        time: new Date(),
        user_name: user.username,
        user_img: user.user_img,
        user_id: user._id,
    });
    const r = await d.save();

    return res.status(201).json(r);
}

const getDiscussion = async (req, res) => {
    const id = req.params.id;
    const discussion = await Discussion.findById(new mongoose.Types.ObjectId(id))
        .populate("comments")
        .sort({ "comments.time": -1 });

    return res.status(200).json({
        discussion,
        comments: discussion.comments,
    });
}

module.exports = { getAllDiscussions, getForumDiscussions, postDiscussion, getDiscussion }