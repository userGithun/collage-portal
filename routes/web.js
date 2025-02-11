const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkAuth = require('../middleware/auth')
const CoureController = require('../controllers/CoureController')
const AdminController = require('../controllers/admin/AdminController')
const ContactController = require('../controllers/ContactController')
const adminRole =require('../middleware/adminRole')
const isLogin = require('../middleware/isLogin')
const authRoles = require('../middleware/adminRole')



//route
route.get('/home', checkAuth, FrontController.home)
route.get('/about', checkAuth, FrontController.about)
route.get('/contact', checkAuth, FrontController.contact)
route.get('/',isLogin, FrontController.login)
route.get('/register', FrontController.register)
route.get('/logout', FrontController.logout)


//contact
route.post('/contact_insert',checkAuth,ContactController.contact_insert)
route.get('/contactDisplay',checkAuth,ContactController.contactDisplay)
route.get('/deleteContact/:id',checkAuth,ContactController.delete_contact)

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
route.get('/admin/dashboard',checkAuth,adminRole('admin'),AdminController.dashboard)
route.get('/admin/courseDisplay',checkAuth,adminRole('admin'),AdminController.courseDisplay)
route.get('/admin/contactDisplay',checkAuth,adminRole('admin'),AdminController.contactDisplay)
route.get('/admin/courseEdit/:id',checkAuth,adminRole('admin'),AdminController.editCourse)

route.get('/admin/contactDisplay',checkAuth,adminRole('admin'),AdminController.contactDisplay)
//post
route.post('/admin/update_status/:id',checkAuth,adminRole('admin'),AdminController.update_status)
route.post('/admin/update_Course/:id',checkAuth,adminRole('admin'),AdminController.update_course)
route.get('/admin/courseView/:id',checkAuth,adminRole('admin'),AdminController.viewCourse)
route.get('/admin/courseDelete/:id',checkAuth,adminRole('admin'),AdminController.courseDelete)
route.get('/admin/deleteMessage/:id',checkAuth,authRoles('admin'),AdminController.delete_message)
route.get('/admin/update_pass',checkAuth,adminRole('admin'),AdminController.update_pass)
route.get('/admin/profile_update',checkAuth,adminRole('admin'),AdminController.profile_update)
route.post('/admin/changePassword',checkAuth,adminRole('admin'),AdminController.changePassword)
route.post('/admin/updateProfile',checkAuth,adminRole('admin'),AdminController.updateProfile)

//Forgot/reset Pass
route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset-password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)



//verify mail
route.get('/register/verify',FrontController.verifyMail)

module.exports = route