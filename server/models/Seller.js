const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sellerSchema = new schema({
    seller_id: {
        type: String,
        required: true
    },
    seller_fname: String,
    seller_lname: String,
    seller_desc: String,
    seller_from : Date,
    occupation: String,
    country: String,
    institute: String,
    degree_title: String,
    degree_major: String,
    year_education: Number,
    portfolio_website: String,
    github: String,
    StackOverflow: String,
    linkedin: String,
    languages: Array,
    certificates: Array,
    rating: Number,
    numberRating: Number,
    completed: Number,
    ongoing: Number,
    balance: {  
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Seller',sellerSchema);