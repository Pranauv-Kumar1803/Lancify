const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceSchema = new schema({
    service_type:{
        type: String,
        required: true
    },
    domain_type:{
        type: String,
        required: true
    },
    seller_type: {
        type:String
    },
    seller_id: {
        type: Number,
        required: true
    },
    seller_name: {
        type: String,
        required: true
    },
    seller_img: String,
    main_img:{
        type: String,
        required: true
    },
    min_duration: Number,
    seller_desc: {
        type: String,
        required: true
    },
    seller_title:{
        type: String,
        required: true
    },
    rating: Number,
    starting_price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Service',serviceSchema);