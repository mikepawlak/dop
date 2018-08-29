angular.module("DonP")
.directive("search", function() {
  var controller = function($location, $http) {
    var ctl = this;
    this.resultsArticles = [];
    this.resultsGallery = [];

    function getLocation() {
      var lString = $location.absUrl().split('/');
      lString = lString[lString.length - 1];

      return lString;
    }

    this.term = getLocation();
    var req = '/searchByTag/' + ctl.term;
    $http.get(req).then(function(succ, err) {
      if (err) {
        console.log(err);
      }
      else {
        ctl.resultsArticles = succ.data.blog;
        ctl.resultsGallery = succ.data.images;

        console.log(ctl.resultsArticles.length > 0);
      }
    });
  };
  return {
    restrict: "E",
    templateUrl: "../app/layout/search/search.html",
    controller: controller,
    controllerAs: "search"
  };
});
