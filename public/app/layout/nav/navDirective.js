angular.module("DonP")
.directive("nav", function() {
  var controller = function() {};
  return {
    restrict: "E",
    templateUrl: "../app/layout/nav/nav.html",
    controller: controller,
    controllerAs: "nav"
  };
});
