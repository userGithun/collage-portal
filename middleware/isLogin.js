const jwt = require('jsonwebtoken')
const UserModel = require('../models/user');


const isLogin = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        verifyLogin = jwt.decode(token);
        // console.log(verifyLogin)
        const data = await UserModel.findOne({_id: verifyLogin.Id})

        if(data.role=='student'){
            res.redirect('/home')
        } else if(data.role=='admin'){
            res.redirect('/admin/dashboard')
        }
        next()
    } else{
        next()
    }
}

module.exports = isLogin