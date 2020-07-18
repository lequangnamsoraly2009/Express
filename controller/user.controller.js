const db = require('../db')
const shortid = require('shortid');
const { values } = require('../db');


module.exports.index = (req, res) => res.render('users/index', {
    users: db.get('users').value()
})

module.exports.cookie = (req, res, next) => {
    res.cookie('cookie-id', 123)
}

module.exports.search_user = (req, res) => {
    const q = req.query.q;
    let searchedQ = db.get("users").filter((x) => {
        return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: searchedQ
    })
}

module.exports.create_user = (req, res) => res.render('users/create')

module.exports.get_user = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    })
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
}