angular.module("DonP")
.directive("sidebar", function() {
  var controller = function() {};
  return {
    restrict: "E",
    templateUrl: "app/layout/sidebar/sidebar.html",
    controller: controller,
    controllerAs: "sidebar"
  };
});
