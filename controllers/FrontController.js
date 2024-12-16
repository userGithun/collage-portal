const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

class FrontController {
    static home = async (req, res) => {
        try {
            res.render("home")
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
            res.render("about")
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
        try {
            res.render("contact")
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            res.render("login", { msg: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static register = async (req, res) => {
        try {
            res.render("register", { msg: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static userinsert = async (req, res) => {
        try {
            console.log(req.files.image)
            // console.log(req.body)
            // const { name, email, password, confirmpassword } = req.body
            // if (!name || !email || !password || !confirmpassword) {
            //     req.flash("error", "All Fields are Required.");
            //     return res.redirect('/register');
            // }
            // const isEmail = await UserModel.findOne({ email });
            // if (isEmail) {
            //     req.flash("error", "Email Already Exists.");
            //     return res.redirect("/register")
            // }
            // if (password != confirmpassword) {
            //     req.flash("error", "Password does not match.");
            //     return res.redirect('/register');
            // }
            // const hashpassword = await bcrypt.hash(password,10)
            // const data = await UserModel.create({
            //     name,
            //     email,
            //     password:hashpassword
            // })
            // req.flash("success", "Register Successfully ! please login here");
            // res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = FrontController