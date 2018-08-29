angular.module("DonP").directive("mappingTool", function() {
    var controller=function($window, $http, $scope, $mdDialog) {
        var ctl=this;
        this.activeState=null;
        this.searchText=null;
        var stateArray=[];
        this.searchArray=[];
        var blue="#1976D2";
        var darkBlue="#0D47A1";
        var red="#D32F2F";
        var darkRed="#B71C1C";
        var purple="#673AB7";
        var darkPurple="#6A1B9A";
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
        }
        ;
        this.snapsearch=function() {
            ctl.searchArray=[];
            var StateLookupArray=[ {
                "name": "Alabama", "abbr": "AL"
            }
            , {
                "name": "Alaska", "abbr": "AK"
            }
            , {
                "name": "Arizona", "abbr": "AZ"
            }
            , {
                "name": "Arkansas", "abbr": "AR"
            }
            , {
                "name": "California", "abbr": "CA"
            }
            , {
                "name": "Colorado", "abbr": "CO"
            }
            , {
                "name": "Connecticut", "abbr": "CT"
            }
            , {
                "name": "Delaware", "abbr": "DE"
            }
            , {
                "name": "District of Columbia", "abbr": "DC"
            }
            , {
                "name": "Florida", "abbr": "FL"
            }
            , {
                "name": "Georgia", "abbr": "GA"
            }
            , {
                "name": "Hawaii", "abbr": "HI"
            }
            , {
                "name": "Idaho", "abbr": "ID"
            }
            , {
                "name": "Illinois", "abbr": "IL"
            }
            , {
                "name": "Indiana", "abbr": "IN"
            }
            , {
                "name": "Iowa", "abbr": "IA"
            }
            , {
                "name": "Kansa", "abbr": "KS"
            }
            , {
                "name": "Kentucky", "abbr": "KY"
            }
            , {
                "name": "Lousiana", "abbr": "LA"
            }
            , {
                "name": "Maine", "abbr": "ME"
            }
            , {
                "name": "Maryland", "abbr": "MD"
            }
            , {
                "name": "Massachusetts", "abbr": "MA"
            }
            , {
                "name": "Michigan", "abbr": "MI"
            }
            , {
                "name": "Minnesota", "abbr": "MN"
            }
            , {
                "name": "Mississippi", "abbr": "MS"
            }
            , {
                "name": "Missouri", "abbr": "MO"
            }
            , {
                "name": "Montana", "abbr": "MT"
            }
            , {
                "name": "Nebraska", "abbr": "NE"
            }
            , {
                "name": "Nevada", "abbr": "NV"
            }
            , {
                "name": "New Hampshire", "abbr": "NH"
            }
            , {
                "name": "New Jersey", "abbr": "NJ"
            }
            , {
                "name": "New Mexico", "abbr": "NM"
            }
            , {
                "name": "New York", "abbr": "NY"
            }
            , {
                "name": "North Carolina", "abbr": "NC"
            }
            , {
                "name": "North Dakota", "abbr": "ND"
            }
            , {
                "name": "Ohio", "abbr": "OH"
            }
            , {
                "name": "Oklahoma", "abbr": "OK"
            }
            , {
                "name": "Oregon", "abbr": "OR"
            }
            , {
                "name": "Pennsylvania", "abbr": "PA"
            }
            , {
                "name": "Rhode Island", "abbr": "RI"
            }
            , {
                "name": "South Carolina", "abbr": "SC"
            }
            , {
                "name": "South Dakota", "abbr": "SD"
            }
            , {
                "name": "Tennessee", "abbr": "TN"
            }
            , {
                "name": "Texas", "abbr": "TX"
            }
            , {
                "name": "Utah", "abbr": "UT"
            }
            , {
                "name": "Vermont", "abbr": "VT"
            }
            , {
                "name": "Virginia", "abbr": "VA"
            }
            , {
                "name": "Washington", "abbr": "WA"
            }
            , {
                "name": "West Virginia", "abbr": "WV"
            }
            , {
                "name": "Wisconsin", "abbr": "WI"
            }
            , {
                "name": "Wyoming", "abbr": "WY"
            }
            ];
            stateArray.map(function(x) {
                for(var i=0;
                i<x.senators.length;
                i++) {
                    var iteration=x.senators[i];
                    if(iteration.last_name.toUpperCase().indexOf(ctl.searchText.toUpperCase())!=-1) {
                        ctl.searchArray.push(iteration);
                    }
                    else {
                        if(iteration.first_name.toUpperCase().indexOf(ctl.searchText.toUpperCase())!=-1) {
                            ctl.searchArray.push(iteration);
                        }
                    }
                }
            }
            );
            stateLookupArray.map(function(x) {
                if(x.name.toUpperCase().indexOf(ctl.searchText.toUpperCase())!=-1) {
                    stateArray.map(function(y) {
                        if(y.state==x.abbr) {
                            ctl.searchArray.push(y.senators);
                        }
                    }
                    );
                }
            }
            );
        }
        ;
        function onInit() {
            $http.get("/senatePull").then(function(succ, err) {
                if(err) {
                    console.log(err);
                }
                else {
                    var senateArray=succ.data;
                    for(var i=0;
                    i<senateArray.length;
                    i++) {
                        var stateTest=senateArray[i].state;
                        if(stateArray.map(function(x) {
                            return x.state;
                        }
                        ).indexOf(stateTest)==-1) {
                            stateArray.push( {
                                state: stateTest, senators: [senateArray[i]]
                            }
                            );
                        }
                        else {
                            stateArray.map(function(x) {
                                if(x.state===stateTest) {
                                    x.senators.push(senateArray[i]);
                                }
                            }
                            );
                        }
                    }
                    var fillObject= {}
                    ;
                    var hoverObject= {}
                    ;
                    stateArray.map(function(x) {
                        var sen1=x.senators[0].party;
                        var color="#FFF";
                        var hoverColor="#000";
                        if(sen1=="R") {
                            if(x.senators[1].party=="R") {
                                color=red;
                                hoverColor=darkRed;
                            }
                            else {
                                color=purple;
                                hoverColor=darkPurple;
                            }
                        }
                        else {
                            if(x.senators[1].party=="D") {
                                color=blue;
                                hoverColor=darkBlue;
                            }
                            else {
                                color=purple;
                                hoverColor=darkPurple;
                            }
                        }
                        fillObject[x.state]= {
                            fill: color
                        }
                        ;
                        hoverObject[x.state]= {
                            fill: hoverColor
                        }
                        ;
                    }
                    );
                    $(document).ready(function() {
                        $('#map').usmap( {
                            stateSpecificStyles:fillObject, stateSpecificHoverStyles:hoverObject, click:function(event, data) {
                                var stateIndex=stateArray.map(function(x) {
                                    return x.state;
                                }
                                ).indexOf(data.name);
                                ctl.activeState=stateArray[stateIndex];
                                showDialog();
                                $scope.$digest();
                            }
                        }
                        );
                    }
                    );
                }
            }
            );
        }
        function showDialog($event) {
            var parentEl=angular.element(document.body);
            var targetState=ctl.activeState;
            $mdDialog.show( {
                parent:parentEl, targetEvent:$event, clickOutsideToClose:true, fullscreen:true, templateUrl:"app/layout/maptool/senatePopup.html", locals: {
                    state: targetState
                }
                , controller:DialogController
            }
            );
        }
        function DialogController($scope, $mdDialog, state) {
            var blue="#1976D2";
            var darkBlue="#0D47A1";
            var red="#D32F2F";
            var darkRed="#B71C1C";
            var purple="#7B1FA2";
            var darkPurple="#6A1B9A";
            $scope.partyColor=function(party) {
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
            }
            ;
            $scope.state=state;
            $scope.close=function() {
                $mdDialog.hide();
            }
            ;
        }
        onInit();
    }
    ;
    return {
        restrict: "E", templateUrl: "../app/layout/maptool/map.html", controller: controller, controllerAs: "map"
    }
    ;
}

).directive("congressTool", function() {
    var controller=function($window, $http, $scope, $mdDialog) {
        var ctl=this;
        this.activeState=null;
        this.searchText=null;
        var stateArray=[];
        this.searchArray=[];
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
        }
        ;
        this.snapsearch=function() {
            ctl.searchArray=[];
            var StateLookupArray=[
                    {
                      "name": "Alabama", "abbr": "AL"
                  }
                  , {
                      "name": "Alaska", "abbr": "AK"
                  }
                  , {
                      "name": "Arizona", "abbr": "AZ"
                  }
                  , {
                      "name": "Arkansas", "abbr": "AR"
                  }
                  , {
                      "name": "California", "abbr": "CA"
                  }
                  , {
                      "name": "Colorado", "abbr": "CO"
                  }
                  , {
                      "name": "Connecticut", "abbr": "CT"
                  }
                  , {
                      "name": "Delaware", "abbr": "DE"
                  }
                  , {
                      "name": "District of Columbia", "abbr": "DC"
                  }
                  , {
                      "name": "Florida", "abbr": "FL"
                  }
                  , {
                      "name": "Georgia", "abbr": "GA"
                  }
                  , {
                      "name": "Hawaii", "abbr": "HI"
                  }
                  , {
                      "name": "Idaho", "abbr": "ID"
                  }
                  , {
                      "name": "Illinois", "abbr": "IL"
                  }
                  , {
                      "name": "Indiana", "abbr": "IN"
                  }
                  , {
                      "name": "Iowa", "abbr": "IA"
                  }
                  , {
                      "name": "Kansa", "abbr": "KS"
                  }
                  , {
                      "name": "Kentucky", "abbr": "KY"
                  }
                  , {
                      "name": "Lousiana", "abbr": "LA"
                  }
                  , {
                      "name": "Maine", "abbr": "ME"
                  }
                  , {
                      "name": "Maryland", "abbr": "MD"
                  }
                  , {
                      "name": "Massachusetts", "abbr": "MA"
                  }
                  , {
                      "name": "Michigan", "abbr": "MI"
                  }
                  , {
                      "name": "Minnesota", "abbr": "MN"
                  }
                  , {
                      "name": "Mississippi", "abbr": "MS"
                  }
                  , {
                      "name": "Missouri", "abbr": "MO"
                  }
                  , {
                      "name": "Montana", "abbr": "MT"
                  }
                  , {
                      "name": "Nebraska", "abbr": "NE"
                  }
                  , {
                      "name": "Nevada", "abbr": "NV"
                  }
                  , {
                      "name": "New Hampshire", "abbr": "NH"
                  }
                  , {
                      "name": "New Jersey", "abbr": "NJ"
                  }
                  , {
                      "name": "New Mexico", "abbr": "NM"
                  }
                  , {
                      "name": "New York", "abbr": "NY"
                  }
                  , {
                      "name": "North Carolina", "abbr": "NC"
                  }
                  , {
                      "name": "North Dakota", "abbr": "ND"
                  }
                  , {
                      "name": "Ohio", "abbr": "OH"
                  }
                  , {
                      "name": "Oklahoma", "abbr": "OK"
                  }
                  , {
                      "name": "Oregon", "abbr": "OR"
                  }
                  , {
                      "name": "Pennsylvania", "abbr": "PA"
                  }
                  , {
                      "name": "Rhode Island", "abbr": "RI"
                  }
                  , {
                      "name": "South Carolina", "abbr": "SC"
                  }
                  , {
                      "name": "South Dakota", "abbr": "SD"
                  }
                  , {
                      "name": "Tennessee", "abbr": "TN"
                  }
                  , {
                      "name": "Texas", "abbr": "TX"
                  }
                  , {
                      "name": "Utah", "abbr": "UT"
                  }
                  , {
                      "name": "Vermont", "abbr": "VT"
                  }
                  , {
                      "name": "Virginia", "abbr": "VA"
                  }
                  , {
                      "name": "Washington", "abbr": "WA"
                  }
                  , {
                      "name": "West Virginia", "abbr": "WV"
                  }
                  , {
                      "name": "Wisconsin", "abbr": "WI"
                  }
                  , {
                      "name": "Wyoming", "abbr": "WY"
                  }
            ];
            stateArray.map(function(x) {
                for(var i=0;
                i<x.senators.length;
                i++) {
                    var iteration=x.senators[i];
                    if(iteration.last_name.toUpperCase().indexOf(ctl.searchText.toUpperCase())!=-1) {
                        ctl.searchArray.push(iteration);
                    }
                    else {
                        if(iteration.first_name.toUpperCase().indexOf(ctl.searchText.toUpperCase())!=-1) {
                            ctl.searchArray.push(iteration);
                        }
                    }
                }
            }
            );
            stateLookupArray.map(function(x) {
                if(x.name.toUpperCase().indexOf(ctl.searchText.toUpperCase())!=-1) {
                    stateArray.map(function(y) {
                        if(y.state==x.abbr) {
                            ctl.searchArray.push(y.senators);
                        }
                    }
                    );
                }
            }
            );
        }
        ;
        function onInit() {
            $http.get("/congressPull").then(function(succ, err) {
                if(err) {
                    console.log(err);
                }
                else {
                    var congressArray=succ.data;
                    for(var i=0;
                    i<congressArray.length;
                    i++) {
                        congressArray[i].district=parseInt(congressArray[i].district);
                        if(congressArray[i].imgUrl===null) {
                            congressArray[i].imgUrl="../img/dopIco.png";
                        }
                        var stateTest=congressArray[i].state;
                        if(stateArray.map(function(x) {
                            return x.state;
                        }
                        ).indexOf(stateTest)==-1) {
                            stateArray.push( {
                                state: stateTest, congressmen: [congressArray[i]]
                            }
                            );
                        }
                        else {
                            stateArray.map(function(x) {
                                if(x.state===stateTest) {
                                    x.congressmen.push(congressArray[i]);
                                }
                            }
                            );
                        }
                    }
                    var fillObject= {}
                    ;
                    var hoverObject= {}
                    ;
                    stateArray.map(function(x) {
                        var color="#FFF";
                        var hoverColor="#000";
                        var partyCtl=null;
                        var conNum=x.congressmen.length;
                        var R=0;
                        var D=0;
                        var congressmen=x.congressmen;
                        for(i=0;
                        i<congressmen.length;
                        i++) {
                            if(congressmen[i].party=="R") {
                                R++;
                            }
                            else if(congressmen[i].party=="D") {
                                D++;
                            }
                        }
                        var controlWeight=((R-D)/congressmen.length)*100;
                        if(controlWeight<0) {
                            controlWeight=controlWeight*(-1);
                        }
                        if(controlWeight<25) {
                            controlWeight="";
                        }
                        else if(controlWeight<50) {
                            controlWeight="+";
                        }
                        else if(controlWeight<90) {
                            controlWeight="++";
                        }
                        else {
                            controlWeight="+++";
                        }
                        if(R>D) {
                            partyCtl="R"+controlWeight;
                        }
                        else if(R<D) {
                            partyCtl="D"+controlWeight;
                        }
                        switch(partyCtl) {
                            case"R": color=red5;
                            hoverColor=darkRed;
                            break;
                            case"R+": color=red6;
                            hoverColor=darkRed;
                            break;
                            case"R++": color=red7;
                            hoverColor=darkRed;
                            break;
                            case"R+++": color=red8;
                            hoverColor=darkRed;
                            break;
                            case"D": color=blue5;
                            hoverColor=darkBlue;
                            break;
                            case"D+": color=blue6;
                            hoverColor=darkBlue;
                            break;
                            case"D++": color=blue7;
                            hoverColor=darkBlue;
                            break;
                            case"D+++": color=blue8;
                            hoverColor=darkBlue;
                            break;
                            default: color=purple;
                            hoverColor=darkPurple;
                        }
                        console.log(x.state);
                        fillObject[x.state]= {
                            fill: color
                        }
                        ;
                        hoverObject[x.state]= {
                            fill: hoverColor
                        }
                        ;
                    }
                    );
                    $(document).ready(function() {
                        $('#map').usmap( {
                            stateSpecificStyles:fillObject, stateSpecificHoverStyles:hoverObject, click:function(event, data) {
                                var stateIndex=stateArray.map(function(x) {
                                    return x.state;
                                }
                                ).indexOf(data.name);
                                ctl.activeState=stateArray[stateIndex];
                                showDialog();
                                $scope.$digest();
                            }
                        }
                        );
                    }
                    );
                }
            }
            );
        }
        function showDialog($event) {
            var parentEl=angular.element(document.body);
            var targetState=ctl.activeState;
            $mdDialog.show( {
                parent:parentEl, targetEvent:$event, clickOutsideToClose:true, fullscreen:true, templateUrl:"app/layout/maptool/congressPopup.html", locals: {
                    state: targetState
                }
                , controller:DialogController
            }
            );
        }
        function DialogController($scope, $mdDialog, state) {
            var blue="#1976D2";
            var darkBlue="#0D47A1";
            var red="#D32F2F";
            var darkRed="#B71C1C";
            var purple="#7B1FA2";
            var darkPurple="#6A1B9A";
            $scope.partyColor=function(party) {
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
            }
            ;
            $scope.state=state;
            $scope.close=function() {
                $mdDialog.hide();
            }
            ;
        }
        onInit();
    }
    ;
    return {
        restrict: "E", templateUrl: "../app/layout/maptool/cong.html", controller: controller, controllerAs: "map"
    }
    ;
}

);
