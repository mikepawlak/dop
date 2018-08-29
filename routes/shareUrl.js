var express = require('express');
var router = express.Router();

var GoogleURL = require('google-url');
googleUrl = new GoogleURL({key : "AIzaSyB2J1zIyqS9yRSFKApxiTO678videBI_xQ"});
var domain = "http://dataonpolitics.com/";

function createUrl(path) {
  var retString;
  googleUrl.shorten(path, function (err, shortUrl) {
    if (err) {
      retString = "An error has occured";
    } else {
      retString = shortUrl;
    }
    return retString;
  });
}

router.route("/article/:id")
  .get(function (req, res) {
    var path = domain + "article/" + req.params.id;
    googleUrl.shorten(path, function (err, shortUrl) {
      if (err) {
        retString = "An error has occured";
      } else {
        retString = shortUrl;
      }
       res.send(retString);
    });
  });
router.route("/featured/:id")
  .get(function (req, res) {
    var path = domain + "article/" + req.params.id;
    googleUrl.shorten(path, function (err, shortUrl) {
      if (err) {
        retString = "An error has occured";
      } else {
        retString = shortUrl;
      }
       res.send(retString);
    });
  });
router.route("/image/:id")
  .get(function (req, res) {
    var path = domain + "gallery/" + req.params.id;
    googleUrl.shorten(path, function (err, shortUrl) {
      if (err) {
        retString = "An error has occured";
      } else {
        retString = shortUrl;
      }
       res.send(retString);
    });
  });


module.exports = router;
