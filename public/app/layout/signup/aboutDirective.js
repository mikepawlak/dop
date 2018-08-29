angular.module("DonP")
.directive("about", function() {
  var controller = function($http) {
    var ctl = this;
    this.form = {};

    this.submitMessage = function () {
      var data = ctl.form;
      $http.post("/message", data).then(function(succ, err) {
        if (err) {}
        else {
          console.log(succ);
        }
      });
    };
  };
  return {
    restrict: "E",
    templateUrl: "app/layout/signup/about.html",
    controller: controller,
    controllerAs: "about"
  };
});
