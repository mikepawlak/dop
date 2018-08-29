angular.module("DonP")
.directive("gallery", function() {
  var controller = function($http) {
    var ctl = this;

    this.gallery = [];

    $http.get("/imageInit/default").then( function (succ, err) {
      if (err) {
        console.log(err);
      } else {
        ctl.gallery = succ.data;
      }
     });

  };
  return {
    restrict: "E",
    templateUrl: "../app/layout/imageViewer/gallery.html",
    controller: controller,
    controllerAs: "gallery"
  };
});
