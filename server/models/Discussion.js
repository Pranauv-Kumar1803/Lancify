const mongoose = require('mongoose');
const schema = mongoose.Schema;

const discussionSchema = new schema({
    forum:{
        type:String,
        required:true
    },
    discussion: {
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
        type: String,
        required:true
    },
    user_img: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Discussion',discussionSchema);