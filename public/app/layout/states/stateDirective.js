angular.module("DonP")
.directive("state", function() {
  var controller = function($location, $http, $scope, $mdDialog) {
    var ctl = this;
    this.state = getLocation();
    this.stateInfo = null;
    this.legislators = null;
    this.filter_upper = {
      chamber : 'upper'
    };
    this.filter_lower = {
      chamber : 'lower'
    };

    this.targetLeg = null;

    $scope.labels = ["Republicans", "Democrats", "Independents", "Nonpartisan"];
    $scope.series = ['Series A'];
    $scope.data_upper = [];
    $scope.data_lower = [];
    $scope.onClickU = function (points) {
      var party = points[0]._model.label;

      if (party == "Republicans") {
        ctl.filter_upper['party'] = "Republican";
      }
      else if (party == "Democrats") {
        ctl.filter_upper['party'] = "Democratic";
      }
      else if (party == "Independents") {
        ctl.filter_upper['party'] = "Independent";
      }
      else {
        ctl.filter_upper['party'] = "Nonpartisan";
      }

      console.log(ctl.filter_upper);
    };

    $scope.onClickL = function (points) {
      var party = points[0]._model.label;

      if (party == "Republicans") {
        ctl.filter_lower['party'] = "Republican";
      }
      else if (party == "Democrats") {
        ctl.filter_lower['party'] = "Democratic";
      }
      else if (party == "Independents") {
        ctl.filter_lower['party'] = "Independent";
      }
      else {
        ctl.filter_lower['party'] = "Nonpartisan";
      }
    };

    function getLocation() {
      var lString = $location.absUrl().split('/');
      lString = lString[lString.length - 1];

      return lString;
    }
    var pullUrl = "/singleStatePull/" + getLocation().toUpperCase();

    $http.get(pullUrl).then(function (succ, err) {
      if (err) {console.log(err);}
      else {
        ctl.stateInfo = succ.data[0];

        console.log(ctl.stateInfo);
        $scope.data_upper = [];
        $scope.data_upper.push(ctl.stateInfo.upperR);
        $scope.data_upper.push(ctl.stateInfo.upperD);
        $scope.data_upper.push(ctl.stateInfo.upperI);
        $scope.data_upper.push(ctl.stateInfo.upperN);

        $scope.data_lower = [];
        $scope.data_lower.push(ctl.stateInfo.lowerR);
        $scope.data_lower.push(ctl.stateInfo.lowerD);
        $scope.data_lower.push(ctl.stateInfo.lowerI);
        $scope.data_lower.push(ctl.stateInfo.lowerN);

        ctl.legislators = ctl.stateInfo.legAll;
      }
    });


    ctl.viewLeg = function (legislator) {
      ctl.targetLeg = legislator;
      showDialog();
    };

    function showDialog($event) {
        var parentEl=angular.element(document.body);
        var targetLeg=ctl.targetLeg;
        var chamber=ctl.stateInfo.chambers;
        $mdDialog.show( {
            parent:parentEl, targetEvent:$event, clickOutsideToClose:true, fullscreen:true, templateUrl:"../app/layout/states/legPopup.html", locals: {
                leg: targetLeg,
                chamber: chamber
            }, controller:DialogController
        }
        );
    }

    function DialogController($scope, $mdDialog, leg, chamber) {
        $scope.leg=leg;
        console.log(leg);
        $scope.chamber=chamber;
        var blue="#1976D2";
        var darkBlue="#0D47A1";
        var red="#D32F2F";
        var darkRed="#B71C1C";
        var purple="#7B1FA2";
        var darkPurple="#6A1B9A";
        $scope.partyColor=function(party) {
            var returnColor="#000";
            if(party=="Republican") {
                returnColor=darkRed;
            }
            else if(party=="Democratic") {
                returnColor=darkBlue;
            }
            else {
                returnColor=darkPurple;
            }
            return returnColor;
        };

        $scope.close=function() {
            $mdDialog.hide();
        }
        ;
    }


  };
  return {
    restrict: "E",
    templateUrl: "../app/layout/states/state.html",
    controller: controller,
    controllerAs: "state"
  };
});
