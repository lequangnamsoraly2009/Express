// The function check validate input form use middleware
module.exports.postCreate = (req, res, next) => {
    // If input is empty then array errors have length == 0, opposite then render value input on form input 
    // Let's see the function next() in the bottom -> look over file user.router.js -> This validate put before controller 
    // then it process first 
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required')
    }
    if (!req.body.phone) {
        errors.push('Phone is required')
    }
    if (errors.length > 0) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return;
    }
    next()
}