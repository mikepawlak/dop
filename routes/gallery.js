var express = require('express');
var router = express.Router();

//var image_controller = require("../controllers/imageCtl.js");
//var Img = require('../db/models/image.js');

router.route("/")
  .get(function (req, res) {
    res.render('infograph');
  });

module.exports = router;
