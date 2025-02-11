const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')
const courseModel = require('../models/course')

// Configuration
cloudinary.config({
    cloud_name: 'ddblbrvxl',
    api_key: '674549153778279',
    api_secret: 'tdXOWN_-uNiQUxj8Emqd8KvJcUA'
});

class FrontController {
    static home = async (req, res) => {
        try {
            const { name, image, email, id } = req.udata
            const btech = await courseModel.findOne({ user_id: id, course: "btech" })
            const bca = await courseModel.findOne({ user_id: id, course: "bca" })
            const mca = await courseModel.findOne({ user_id: id, course: "mca" })
            // console.log(bca)
            res.render("home", { n: name, i: image, e: email, bca: bca, btech: btech, mca: mca, msg:req.flash("error") })
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
            const { name, image } = req.udata
            res.render("about", { n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
        try {
            const { name, image } = req.udata
            res.render("contact", { n: name, i: image })
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

            if (data) {

                this.sendVerifymail(name, email, data.id)
                req.flash('error', 'Your Register Success, Plz verify mail')
                res.redirect('/register')
            } else {
                req.flash('error', 'not found')
                req.redirect('/register')
            }

        } catch (error) {
            console.log(error)
        }
    }
    //email verification 
    static sendVerifymail = async (name, email, user_id) => {
        //console.log(name, email, user_id);
        // connenct with the smtp server
    
        let transporter = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
    
          auth: {
            user: "chacha45454@gmail.com",
            pass: "pdub zjqm lwdl zykw",
          },
        });
        let info = await transporter.sendMail({
          from: "test@gmail.com", // sender address
          to: email, // list of receivers
          subject: "For Verification mail", // Subject line
          text: "heelo", // plain text body
          html: "<p>Hii " +
            name +
            ',Please click here to <a href="http://localhost:3000/register/verify?id=' +
            user_id +
            '">Verify</a>Your mail</p>.',
    
        });
        //console.log(info);
    };
    static verifyMail = async (req, res) => {
        try {
            //console.log(req.query.id)
            const updateinfo = await UserModel.findByIdAndUpdate(req.query.id, {
                is_verify: 1,
            });
            // console.log(updateinfo)
            if (updateinfo) {
                let token = jwt.sign({ Id: updateinfo.id }, 'khuch bhii')
                //console.log(token)middleware
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 3600000,
                })
                res.redirect("/home");
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                    //token
                    if (inUser.role == 'admin' && inUser.is_verify==1) {

                        const token = jwt.sign({ Id: inUser.id }, 'khuch bhii');
                        // console.log(token)
                        res.cookie('token', token)

                        return res.redirect('/admin/dashboard')
                    }
                    if (inUser.role == 'student'&& inUser.is_verify==1) {

                        const token = jwt.sign({ Id: inUser.id }, 'khuch bhii');
                        // console.log(token)
                        res.cookie('token', token)

                        return res.redirect('/home')
                    }



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
            res.clearCookie('token');
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
    //profile
    static profile = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            res.render("profile", { n: name, i: image, e: email, message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static changePassword = async (req, res) => {
        try {
            const { id } = req.udata;
            // console.log(req.body);
            const { op, np, cp } = req.body;
            if (op && np && cp) {
                const user = await UserModel.findById(id);
                const isMatched = await bcrypt.compare(op, user.password);
                //console.log(isMatched)
                if (!isMatched) {
                    req.flash("error", "Current password is incorrect ");
                    res.redirect("/profile");
                } else {
                    if (np != cp) {
                        req.flash("error", "Password does not match");
                        res.redirect("/profile");
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword,
                        });
                        req.flash("success", "Password Updated successfully ");
                        res.redirect("/");
                    }
                }
            } else {
                req.flash("error", "ALL fields are required ");
                res.redirect("/profile");
            }
        } catch (error) {
            console.log(error);
        }

    };

    static updateProfile = async (req, res) => {
        try {
            const { id } = req.udata;
            const { name, email } = req.body;
            if (req.files) {
                const user = await UserModel.findById(id);
                const imageID = user.image.public_id;
                // console.log(imageID);

                //deleting image from Cloudinary
                await cloudinary.uploader.destroy(imageID);
                //new image update
                const imagefile = req.files.image;
                const imageupload = await cloudinary.uploader.upload(
                    imagefile.tempFilePath,
                    {
                        folder: "userprofile",
                    }
                );
                var data = {
                    name: name,
                    email: email,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url,
                    },
                };
            } else {
                var data = {
                    name: name,
                    email: email,
                };
            }
            await UserModel.findByIdAndUpdate(id, data);
            req.flash("success", "Update Profile successfully");
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
        }
    };
    static forgetPasswordVerify = async (req, res) => {
        try {
            const { email } = req.body;
            const userData = await UserModel.findOne({ email: email });
            //console.log(userData)
            if (userData) {
                const randomString = randomstring.generate();
                await UserModel.updateOne(
                    { email: email },
                    { $set: { token: randomString } }
                );
                this.sendEmail(userData.name, userData.email, randomString);
                req.flash("success", "Plz Check Your mail to reset Your Password!");
                res.redirect("/");
            } else {
                req.flash("error", "You are not a registered Email");
                res.redirect("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    static sendEmail = async (name, email, token) => {
        // console.log(name,email,status,comment)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "chacha45454@gmail.com",
                pass: "pdub zjqm lwdl zykw",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com",       // sender address
            to: email,                    // list of receivers
            subject: "Reset Password",    // Subject line
            text: "heelo",                // plain text body
            html: "<p>Hii " + name + ',Please click here to <a href="http://localhost:3000/reset-password?token=' + token + '">Reset</a>Your Password.',

        });
    };
    static reset_Password = async (req, res) => {
        try {
            const token = req.query.token;
            const tokenData = await UserModel.findOne({ token: token });
            if (tokenData) {
                res.render("reset-password", { user_id: tokenData._id });
            } else {
                res.render("404");
            }
        } catch (error) {
            console.log(error);
        }
    };
    static reset_Password1 = async (req, res) => {
        try {
            const { password, user_id } = req.body;
            const newHashPassword = await bcrypt.hash(password, 10);
            await UserModel.findByIdAndUpdate(user_id, {
                password: newHashPassword,
                token: "",
            });
            req.flash("success", "Reset Password Updated successfully ");
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    };


}
module.exports = FrontController