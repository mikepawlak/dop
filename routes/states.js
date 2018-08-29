var express = require('express');
var router = express.Router();

//var image_controller = require("../controllers/imageCtl.js");
//var Img = require('../db/models/image.js');

router.route("/")
    .get(function (req, res) {
      res.render('statesMain');
    });
router.route("/:state")
    .get(function (req, res) {
      var state = req.params.state;

      if (state.toUpperCase() == "ALL") {
        res.render("statesMain");
      }
       else  {
         res.render("stateIndividual"); 
       }
    });

module.exports = router;
