const mongoose = require('mongoose');
const schema = mongoose.Schema;

const replySchema = new schema({
    forum:{
        type:String,
        required:true
    },
    comment: {
        type:String,
        required:true
    },
    time: {
        type:Date,
        required:true
    },
    user_name: {
        type:String,
        required:true
    },
    user_id: {
        type:String,
        required:true
    },
    reply_id: {
        type: String,
        required: true
    },
    replies: [String]
})

module.exports = mongoose.model('replies',replySchema);