const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    user_id : String,
    user_type: String,
    user_img : {
        type:String,
    }
})

module.exports = mongoose.model('User',userSchema);