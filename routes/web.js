const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkAuth = require('../middleware/auth')
const CoureController = require('../controllers/CoureController')
const AdminController = require('../controllers/admin/AdminController')

//route
route.get('/home', checkAuth, FrontController.home)
route.get('/about', checkAuth, FrontController.about)
route.get('/contact', checkAuth, FrontController.contact)
route.get('/', FrontController.login)
route.get('/register', FrontController.register)
route.get('/logout', FrontController.logout)

//user insert
route.post('/userinsert', FrontController.userinsert)
//login check
route.post('/verifyLogin', FrontController.verifyLogin)

//profile
route.get('/profile',checkAuth,FrontController.profile)
route.post('/changePassword',checkAuth,FrontController.changePassword)
route.post('/updateProfile',checkAuth,FrontController.updateProfile)

//course
route.post('/course_insert', checkAuth, CoureController.createCourse)

route.get('/coursedisplay', checkAuth, CoureController.coursedisplay)
route.get('/viewCourse/:id', checkAuth, CoureController.viewCourse)
route.get('/deleteCourse/:id', checkAuth, CoureController.deleteCourse)
route.get('/editCourse/:id', checkAuth, CoureController.editCourse)
route.post('/courseUpdate/:id', checkAuth, CoureController.courseUpdate)


//adminController
route.get('/admin/dashboard',checkAuth,AdminController.dashboard)

module.exports = route