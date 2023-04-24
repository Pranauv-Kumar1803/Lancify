const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    comment_id: {
        type: String,
    },
    forum:{
        type:String,
    },
    comment: {
        type:String,
    },
    time: {
        type:Date,
    },
    user_name: {
        type:String,
    },
    user_img: {
        type: String,
    },
})

module.exports = mongoose.model('Comment',commentSchema);