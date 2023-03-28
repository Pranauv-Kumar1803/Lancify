const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceSchema = new schema({
    userName:{
        type: String,
        required: true
    },
    userImg:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Service',serviceSchema);