const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    domain_type:{
        type: String,
        required: true
    },
    service_type:{
        type: String,
        required: true
    },
    service_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    user_id: String,
    user_name: String,
    seller_id: String,
    seller_name: String,
    user_rating: Number,
    pending: {
        type: Boolean,
        default: true
    },
    order_date: Date,
    grand_total: {
        type: Number,
        required: true
    },
    rating: false,
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    timeline: [Object]
})

module.exports = mongoose.model('Order',orderSchema);