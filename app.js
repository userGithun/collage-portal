const express = require('express')
const app = express()
const port = 3000
const web =require('./routes/web')
const connectDb = require('./data Base/connectDb')


//view ejs set
app.set('view engine','ejs')
//css image js link public
app.use(express.static('public'))

//mongoose set up
connectDb()

//route load
app.use('/',web)



//server create
app.listen(port,()=>{
    console.log(`server start localhost:3000`)
})