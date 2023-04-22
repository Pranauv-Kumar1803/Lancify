const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    comment_id: {
        type: String,
        // required: true
    },
    forum:{
        type:String,
        // required:true
    },
    comment: {
        type:String,
        // required:true
    },
    level: Number,
    parents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    time: {
        type:Date,
        // required:true
    },
    user_name: {
        type:String,
        // required:true
    },
    user_img: {
        type: String,
    },
    discussion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion'
    }
})

module.exports = mongoose.model('Comment',commentSchema);