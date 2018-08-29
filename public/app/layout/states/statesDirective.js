angular.module("DonP")
.directive("states", function() {
  var controller = function($http, $scope) {
    $scope.labels = ["Republicans", "Democrats", "Independents", "Nonpartisan"];
    $scope.series = ['Series A'];
    $scope.data_upper = [];
    $scope.data_lower = [];
    $scope.onClick = function (points, evt) {

    };

    var ctl = this;

    this.ready = false;

    var blue5="#2196F3";
    var blue6="#1E88E5";
    var blue7="#1976D2";
    var blue8="#1565C0";
    var darkBlue="#0D47A1";
    var red5="#F44336";
    var red6="#E53935";
    var red7="#D32F2F";
    var red8="#C62828";
    var darkRed="#B71C1C";
    var purple="#7B1FA2";
    var darkPurple="#6A1B9A";
    var yellow = "#FDD835";
    var darkYellow = "#F57F17";

    this.partyColor=function(party) {
        var returnColor="#000";
        if(party=="R") {
            returnColor=darkRed;
        }
        else if(party=="D") {
            returnColor=darkBlue;
        }
        else {
            returnColor=darkPurple;
        }
        return returnColor;
    };

    function round(num, places) {
      var multiplier = Math.pow(10, places);
      return Math.round(num * multiplier) / multiplier;
  }

    var stateArray = [];

    this.activeState = null;

    function onInit() {
      $http.get("/statePull").then(
        function(succ, err) {
          if (err) {
            console.log(err);
          } else {
            stateArray = succ.data;
            var fillObject = {};
            var hoverObject = {};


            for (i = 0; i < stateArray.length; i++) {

              //so first we need the upper and lower broken down, right?
              var upperBreakdown = [parseInt(stateArray[i].upperR), parseInt(stateArray[i].upperD), parseInt(stateArray[i].upperI), parseInt(stateArray[i].upperN)];
              var lowerBreakdown = [stateArray[i].lowerR, stateArray[i].lowerD, stateArray[i].lowerI, stateArray[i].lowerN];
              var governor = null;
              var governorCtl = 50;
              if (stateArray[i].governor) {
                 governor = stateArray[i].governor.party;
              } else {
                console.log("Exception! ");
                console.log(stateArray[i].state);
              }

              if (governor == "R") {
                governorCtl = 60;

              } else if (governor == "D") {
                governorCtl = 40;
              }
              //then calc percentage of both chambers (or just upper, fucking NE and DC)
              var upperRCtl = (upperBreakdown[0]/(upperBreakdown[0]+upperBreakdown[1]))*100;
              var lowerRCtl = (lowerBreakdown[0]/(lowerBreakdown[0]+lowerBreakdown[1]))*100;
              var stateCtl = (upperRCtl+lowerRCtl+governorCtl)/3;


              var fill = "#666";
              var hover = "#FFF";

              if (stateArray[i].state == "NEBRASKA") {
                console.log("Nebraska");
                fill = yellow;
                hover = darkYellow;
              }
              else if (stateArray[i].state == "DISTRICT OF COLUMBIA") {
                fill = blue8;
                hover = darkBlue;

                stateCtl = 0;

                stateArray[i].ctl = {
                  party: "D",
                  weight: (100 - stateCtl)
                };


              }
              else if (stateCtl >= 50) {
                var repCtl = stateCtl - 50;

                stateArray[i].ctl = {
                  party: "R",
                  weight: stateCtl
                };

                if (repCtl > 30) {fill = red8;}
                else if (repCtl > 20) {fill = red7;}
                else if (repCtl > 10) {fill = red6;}
                else {fill = red5;}

                hover = darkRed;
              } else {
                var demCtl = (100 - stateCtl) - 50;

                stateArray[i].ctl = {
                  party: "D",
                  weight: (100 - stateCtl)
                };

                if (demCtl > 30) {fill = blue8;}
                else if (demCtl > 20) {fill = blue7;}
                else if (demCtl > 10) {fill = blue6;}
                else {fill = blue5;}

                hover = darkBlue;


              }

              fillObject[stateArray[i].abbr] = {
                "fill" : fill
              };
              hoverObject[stateArray[i].abbr] = {
                "fill" : hover
              };

            }


            $(document).ready(function() {
                $('#map').usmap( {
                    stateSpecificStyles:fillObject,
                    stateSpecificHoverStyles:hoverObject,
                    click:function(event, data) {
                        var stateIndex=stateArray.map(function(x) {
                            return x.abbr;
                        }
                      ).indexOf(data.name);
                        ctl.activeState=stateArray[stateIndex];

                        $scope.data_upper = [];
                        $scope.data_upper.push(ctl.activeState.upperR);
                        $scope.data_upper.push(ctl.activeState.upperD);
                        $scope.data_upper.push(ctl.activeState.upperI);
                        $scope.data_upper.push(ctl.activeState.upperN);

                        $scope.data_lower = [];
                        $scope.data_lower.push(ctl.activeState.lowerR);
                        $scope.data_lower.push(ctl.activeState.lowerD);
                        $scope.data_lower.push(ctl.activeState.lowerI);
                        $scope.data_lower.push(ctl.activeState.lowerN);

                        $scope.$digest();
                    }
                });
                ctl.ready = true;
                $scope.$digest();
            });
          }
        }
      );
    }


    onInit();



  };
  return {
    restrict: "E",
    templateUrl: "../app/layout/states/states.html",
    controller: controller,
    controllerAs: "states"
  };
});
