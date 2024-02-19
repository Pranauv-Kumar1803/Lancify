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
        type: String,
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
    rating: {
        type: Number,
        default: 0
    },
    starting_price: {
        type: Number,
        required: true
    },
    services: [Object],
    numCustomers: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    avgResponseTime: Number,
    avgCompletionDuration: Number,
    isAdminApproved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Service',serviceSchema);