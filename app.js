const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./data Base/connectDb')
var cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload')

//image upload
app.use(fileUpload({useTempFiles : true}))
//token get cookie
app.use(cookieParser())

//view ejs set
app.set('view engine', 'ejs')
//css image js link public
app.use(express.static('public'))

//parse application
app.use(express.urlencoded({ extended: false }))

//mongoose set up
connectDb()


// connect flash and session
const session = require('express-session')
const flash = require('connect-flash')

// for massages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}));
//Flash massage
app.use(flash());


//route load
app.use('/', web)

//server create
app.listen(port, () => {
    console.log(`server start localhost:3000`)
})