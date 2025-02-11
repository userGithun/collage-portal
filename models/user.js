const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        Required: true
    },
    password: {
        type: String,
        Required: true
    },
    role: {
        type: String,
        default: "student"
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    token:{
        type:String
    },
    is_verify:{
        type:String,
        default:0
    }

}, { timestamps: true })
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel