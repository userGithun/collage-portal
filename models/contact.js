const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'student'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })
const contactModel = new mongoose.model('contact', contactSchema)
module.exports = contactModel