angular.module("DonP")
.directive("content", function() {
  var controller = function($http, $location) {
    var ctl = this;

    this.posts = [];
    this.gallery = [];

    this.featuredPost = {};
    this.featuredString = null;
    this.shareUrl = null; 

    this.getArt = function () {
      var lString = $location.absUrl().split("/");
      lString = lString[lString.length -1];
      ctl.featuredId = lString;
    };

    ctl.getArt();

    $http.get("/posts").then(function (succ, err) {
      if (err) {
        console.log(err);
      } else {
        ctl.posts = succ.data;
      }
    });
    $http.get("/featured/"+ ctl.featuredId).then( function (succ, err) {
      if (err) {
        console.log(err);
      } else {
        ctl.featuredPost = succ.data;
      }
    });

    $http.get('/shareUrl/featured/' + ctl.featuredId).then( function (succ, err) {
      ctl.shareUrl = succ.data;
    });

  };
  return {
    restrict: "E",
    templateUrl: "../app/layout/article/article.html",
    controller: controller,
    controllerAs: "content"
  };
});
