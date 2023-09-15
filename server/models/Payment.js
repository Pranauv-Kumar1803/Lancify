const mongoose = require('mongoose');
const schema = mongoose.Schema;

const paymentSchema = new schema({
    user_id: String,
    seller_id: String,
    price: Number,
    taxes: Number,
    method: String,
    grand_total: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Payment',paymentSchema);