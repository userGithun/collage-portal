const mongoose = require('mongoose')
const local_url = 'mongodb://127.0.0.1:27017/collegePortal'

const connectDb = ()=>{
    return mongoose.connect(local_url)
    .then(()=>{
        console.log(' Db connected')
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports=connectDb