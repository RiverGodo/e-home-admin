var express = require('express');
var router = express.Router();

router.use('/admin/adminUser',require('../controller/adminUser'))

module.exports = router;
