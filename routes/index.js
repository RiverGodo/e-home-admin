var express = require('express');
var router = express.Router();

router.use('/admin/adminUser',require('../controller/adminUser'))
router.use('/admin/news', require('../controller/news'))

module.exports = router;
