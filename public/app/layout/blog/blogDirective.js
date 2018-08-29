angular.module("DonP")
.directive("blog", function() {
  var controller = function($http) {
    var ctl = this;

    this.posts = [];

    $http.get("/posts").then(function(res, err) {
      if (err) {
        console.log(err);
      } else {
        ctl.posts = res.data;
      }
    }
    );
  };
  return {
    restrict: "E",
    templateUrl: "app/layout/blog/blog.html",
    controller: controller,
    controllerAs: "blog"
  };
});
