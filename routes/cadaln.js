var express = require('express');
var router = express.Router();

const {create} = require('../controllers/controller.user');

router.use('/new',create);

router.post('/new', create);

module.exports = router;
