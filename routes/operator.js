var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('operator', {title: 'Operator'});
});

module.exports = router;
