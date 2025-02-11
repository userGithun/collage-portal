const mongoose = require('mongoose')
const local_url = 'mongodb://127.0.0.1:27017/collegePortal'
const live_URL = 'mongodb+srv://chacha45454:ram123@cluster0.edlqo.mongodb.net/collegePortal?retryWrites=true&w=majority&appName=Cluster0'

const connectDb = () => {
    return mongoose.connect(live_URL)
        .then(() => {
            console.log('Db connected')
        })
        .catch((error) => {
            console.log(error)
        })
}
module.exports = connectDb