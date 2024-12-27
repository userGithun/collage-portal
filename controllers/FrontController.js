const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')

// Configuration
cloudinary.config({
    cloud_name: 'ddblbrvxl',
    api_key: '674549153778279',
    api_secret: 'tdXOWN_-uNiQUxj8Emqd8KvJcUA'
});

class FrontController {
    static home = async (req, res) => {
        try { 
            const {name ,image}=req.udata
            res.render("home",{n:name,i:image})
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
            const {name ,image}=req.udata
            res.render("about",{n:name,i:image})
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
        try {
            const {name ,image}=req.udata
            res.render("contact",{n:name,i:image})
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            res.render("login", { msg: req.flash('success'), msg1: req.flash('error') })
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
    //userinsert
    static userinsert = async (req, res) => {
        try {
            // console.log(req.files.image)
            // console.log(req.body)
            const { name, email, password, confirmpassword } = req.body
            if (!name || !email || !password || !confirmpassword) {
                req.flash("error", "All Fields are Required.");
                return res.redirect('/register');
            }
            const isEmail = await UserModel.findOne({ email });
            if (isEmail) {
                req.flash("error", "Email Already Exists.");
                return res.redirect("/register")
            }
            if (password != confirmpassword) {
                req.flash("error", "Password does not match.");
                return res.redirect('/register');
            }

            //image upload
            const file = req.files.image;
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "userprofile"
                }
            );
            //   console.log(imageupload)
            const hashpassword = await bcrypt.hash(password, 10)
            const data = await UserModel.create({
                name,
                email,
                password: hashpassword,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.secure_url
                }
            })
            req.flash("success", "Register Successfully ! please login here");
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }
    //verifyLogin
    static verifyLogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body

            const inUser = await UserModel.findOne({ email });
            if (!inUser) {
                req.flash('error', "You are not a register user")
                return res.redirect('/')
            } else {
                const isMatch = await bcrypt.compare(password, inUser.password)
                console.log(isMatch)

                if (isMatch) {

                    const token = jwt.sign({ Id: inUser.id }, 'khuch bhii');
                    // console.log(token)
                    res.cookie('token',token)


                    return res.redirect('/home')
                } else {
                    req.flash('error', "Email or password does't match.")
                    res.redirect('/')
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    //logout
    static logout = async (req, res) => {
        try {
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = FrontController