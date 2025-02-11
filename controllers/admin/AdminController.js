const courseModel = require('../../models/course')
const contactModel = require('../../models/contact')
const UserModel = require('../../models/user')
const nodemailer = require('nodemailer')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt')

// Configuration
cloudinary.config({
    cloud_name: 'ddblbrvxl',
    api_key: '674549153778279',
    api_secret: 'tdXOWN_-uNiQUxj8Emqd8KvJcUA'
});


class AdminController {
    static dashboard = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            const totalUsers = await courseModel.countDocuments(); // Count all users
            const approvedUsers = await courseModel.countDocuments({ status: "Approved" });
            const pendingUsers = await courseModel.countDocuments({ status: "pending" });
            const rejectedUsers = await courseModel.countDocuments({ status: "Reject" });
            
            res.render('admin/dashboard', { n: name, i: image, e: email, totalUsers, approvedUsers, pendingUsers, rejectedUsers })
            // res.render('admin/dashboard', { n: name, i: image, e: email,c:course ,con:contact })
        } catch (error) {
            console.log(error)
        }
    }
    static courseDisplay = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            const course = await courseModel.find()

            res.render('admin/courseDisplay', { n: name, i: image, e: email, c: course, msg: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static contactDisplay = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            const course = await contactModel.find()

            res.render('admin/contactDisplay', { n: name, i: image, e: email, c: course })
        } catch (error) {
            console.log(error)
        }

    }
    static delete_message = async (req, res) => {
        try {
            const id = req.params.id
            await contactModel.findByIdAndDelete(id)

            res.redirect('/admin/contactDisplay')
        } catch (error) {
            console.log(error)
        }

    }


    static update_status = async (req, res) => {
        try {
            const id = req.params.id;
            const { name, email, course, status, comment } = req.body
            await courseModel.findByIdAndUpdate(id, {
                status,
                comment
            })
            if (status == "Reject") {
                this.RejectEmail(name, email, course, status, comment)
            } else {
                this.ApprovedEmail(name, email, course, status, comment)
            }
            res.redirect('/admin/Coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static RejectEmail = async (name, email, course, status, comment) => {
        //console.log(name, email, course)
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
            subject: ` Course ${course} Reject`, // Subject line
            text: "heelo", // plain text body
            html: `<head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .email-body {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .email-footer {
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name}</b>,</p>
                     
                    <p>Unfortunately, your course has been rejected. Please review the feedback below for further details:<br>
                   ${comment}</p>
                    <p>We appreciate your effort and encourage you to reach out if you have any questions or need clarification.</p>
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    };
    static ApprovedEmail = async (name, email, course, status, comment) => {
        // console.log(name, email, course)
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
            from: "test@gmail.com",                // sender address
            to: email,                             // list of receivers
            subject: ` Course ${course} Approved`, // Subject line
            text: "heelo",                         // plain text body
            html: `<head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .email-body {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .email-footer {
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name}</b>,</p>
                   <p>We are pleased to inform you that your course has been approved! Congratulations on your hard work and dedication.<br>
                   ${comment}<p>
                    <p>We appreciate your effort and encourage you to reach out if you have any questions or need clarification.</p>
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    };

    static viewCourse = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            const id = req.params.id
            const course = await courseModel.findById(id)

            res.render('admin/view', { n: name, i: image, e: email, c: course })
        } catch (error) {
            console.log(error)
        }
    }
    static courseDelete = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            const id = req.params.id
            const course = await courseModel.findByIdAndDelete(id)

            res.redirect('/admin/courseDisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static editCourse = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            const id = req.params.id
            const course = await courseModel.findById(id)

            res.render('admin/editCourse', { n: name, i: image, e: email, c: course })
        } catch (error) {
            console.log(error)
        }
    }
    static update_course = async (req, res) => {
        try {
            const id = req.params.id
            const { name, email, phone, education, gender, dob, course, address } = req.body
            await courseModel.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                address,
                dob,
                gender,
                education,
                course
            })
            req.flash('success', 'Course updated successfully by Admin.')
            res.redirect('/admin/Coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static update_pass = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            res.render("admin/update_pass", { n: name, i: image, e: email, msg: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static profile_update = async (req, res) => {
        try {
            const { name, image, email } = req.udata
            res.render("admin/profile_update", { n: name, i: image, e: email, msg: req.flash('success') })
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
                    res.redirect("/admin/update_pass");
                } else {
                    if (np != cp) {
                        req.flash("error", "Password does not match");
                        res.redirect("/admin/update_pass");
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword,
                        });
                        req.flash("success", "Password Updated by Admin successfully ");
                        res.redirect("/");
                    }
                }
            } else {
                req.flash("error", "ALL fields are required ");
                res.redirect("/");
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
            req.flash("success", "Profile Update by Admin successfully");
            res.redirect("/admin/profile_update");
        } catch (error) {
            console.log(error);
        }
    };


}
module.exports = AdminController