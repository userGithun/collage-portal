const contactModel = require('../models/contact')


class ContactController {
    static contact_insert = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, phone, message } = req.body
            await contactModel.create({
                name,
                email,
                phone,
                message
            })
            res.redirect('/contactDisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static contactDisplay = async (req, res) => {
        try {
            const { name, email,image } = req.udata
            const contact = await contactModel.find()

            res.render('contact/display', {c:contact,i:image, n: name, e: email })
        } catch (error) {
            console.log(error)
        }
    }
  
    static delete_contact = async(req,res)=>{
        try {
            const id =req.params.id
            await contactModel.findByIdAndDelete(id)

            res.redirect('/contactDisplay')
        } catch (error) {
            
        }
    }

}
module.exports = ContactController