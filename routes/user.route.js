const express = require('express')
const multer = require('multer')
const controller = require('../controller/user.controller')
const validate = require('../validate/user.validate')
var upload = multer({ dest: './public/uploads/' })


const router = express.Router()

router.get('/', controller.index)
router.get('/cookie', controller.cookie)
router.get('/search', controller.search_user)
router.get('/create', controller.create_user)
router.get('/:id', controller.get_user)
    // cookie

// MiddleWare : Xử lý tuần tự theo thứ tự nếu gặp next() thì sẽ xử lý tiếp -> còn nếu không sẽ dừng lại
router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate)

module.exports = router;