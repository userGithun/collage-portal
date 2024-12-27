const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkAuth = require('../middleware/auth')

//route
route.get('/home',checkAuth,FrontController.home)
route.get('/about',checkAuth, FrontController.about)
route.get('/contact',checkAuth, FrontController.contact)
route.get('/', FrontController.login)
route.get('/register', FrontController.register)

//user insert
route.post('/userinsert',FrontController.userinsert)
//login check
route.post('/verifyLogin',FrontController.verifyLogin)
//logout
route.get('/logout',FrontController.logout)

module.exports = route