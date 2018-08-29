angular.module("DonP")
.directive("content", function() {
  var controller = function($http) {
    var ctl = this;
    var featuredId = "59249ccb80a779d2896c132d";


    this.posts = [];
    this.shareUrl = null;

    this.featuredPost = {};

    $http.get("/posts").then(function (succ, err) {
      if (err) {
        console.log(err);
      } else {
        ctl.posts = succ.data;
      }
    });

    $http.get('/shareUrl/featured/' + featuredId).then( function (succ, err) {
      ctl.shareUrl = succ.data;
    });

    $http.get("/featured/" + featuredId).then( function (succ, err) {
      if (err) {
        console.log(err);
      } else {
        ctl.featuredPost = succ.data;
      }
    });


  };
  return {
    restrict: "E",
    templateUrl: "../app/layout/content/content.html",
    controller: controller,
    controllerAs: "content"
  };
});
