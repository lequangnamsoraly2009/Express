var express = require('express');

var controller = require('../controller/product.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;