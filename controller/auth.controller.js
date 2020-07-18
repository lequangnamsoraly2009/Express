const sha512 = require('js-sha512')
const db = require('../db')
const { values } = require('../db');

module.exports.login = (req, res) =>
    res.render('auth/login', {
        users: db.get('users').value()
    })


module.exports.postLogin = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    var user = db.get('users').find({ email: email }).value()
    var hashpassword = sha512(password)

    if (!user) {
        res.render('auth/login', {
            errors: [
                'Email does not exist'
            ],
            values: req.body
        })
        return;
    }
    if (user.password !== hashpassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body

        })
        return;
    }
    // Chuyển định dạng cookie + 1 chuỗi hash 
    res.cookie('userId', user.id, {
        signed: true
    })
    res.redirect('/users')
}