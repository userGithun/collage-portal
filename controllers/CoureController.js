const CouresModel = require('../models/course')
class CoureController {
    static createCourse = async (req, res) => {
        try {
            // console.log(req.body)
            const { id } = req.udata
            const { name, email, phone, dob, address, gender, education, course } = req.body
            await CouresModel.create({
                name,
                email,
                phone,
                dob,
                address,
                gender,
                education,
                course,
                user_id: id
            });
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static coursedisplay = async (req, res) => {
        try {
            const { id, name, image } = req.udata
            const course = await CouresModel.find({ user_id: id })
            // console.log(course)
            res.render('course/display', { c: course, n: name, i: image , msg:req.flash('success')})
        } catch (error) {
            console.log(error)
        }
    }
    static viewCourse = async (req, res) => {
        try {
            const { name, image } = req.udata
            const id = req.params.id
            // console.log(id)

            const course = await CouresModel.findById(id)
            // console.log(course)
            res.render('course/view', { c: course, n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    static editCourse = async (req, res) => {
        try {
            const { name, image } = req.udata
            const id = req.params.id
            // console.log(id)

            const course = await CouresModel.findById(id)
            // console.log(course)
            res.render('course/edit', { c: course, n: name, i: image })
        } catch (error) {
            console.log(error)
        }
    }
    static courseUpdate = async (req, res) => {
        try {

            const id = req.params.id
            // console.log(id)
            const { name, email, phone, dob, address, gender, education, course } = req.body
            await CouresModel.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                dob,
                address,
                gender,
                education,
                course,
            })
            req.flash('success',"Course Successfully updated!")
            res.redirect('/coursedisplay')
          
        } catch (error) {
            console.log(error)
        }
    }
    static deleteCourse = async (req, res) => {
        try {
            const { name, image } = req.udata
            const id = req.params.id
            // console.log(id)

            const course = await CouresModel.findByIdAndDelete(id)
            // console.log(course)
            res.redirect('/courseDisplay')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = CoureController