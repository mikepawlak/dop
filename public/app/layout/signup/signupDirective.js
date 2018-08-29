var signup_controller = function($http) {
  var ctl = this;
  this.name = null;
  this.email = null;

  this.submitted = false;

  this.expand = function () {
    var showing = document.getElementsByClassName("signup_top");
    var hiding = document.getElementsByClassName("signup_top_ask");

    function hideThis(item) {
      item.style.display = "none";
    }
    function showThis(item) {
      item.style.display = "inline-block";
    }

    for (var i = 0; i < showing.length; i++) {
      showThis(showing[i]);
    }
    for (var j = 0; j < hiding.length; j++) {
      hideThis(hiding[j]);
    }

    console.log(hiding[0]);
    console.log(showing[0]);

  };

  this.emailSubmit = function () {
    var data = {
      "name" : ctl.name,
      "email" : ctl.email
    };
    $http.post("/signup", data).then(function (succ, err) {
      if (err) {
        console.log(err);
      } else {
        console.log(succ);
        ctl.submitted = true;
      }
    });
  };
};

angular.module("DonP")
.directive("signup", function() {
  return {
    restrict: "E",
    templateUrl: "../app/layout/signup/signup.html",
    controller: signup_controller,
    controllerAs: "signup"
  };
})
.directive("signupTop", function() {
  return {
    restrict: "E",
    templateUrl: "../app/layout/signup/signupTop.html",
    controller: signup_controller,
    controllerAs: "signup"
  };
})
.directive("signupTool", function() {
  return {
    restrict: "E",
    templateUrl: "../app/layout/signup/signupTool.html",
    controller: signup_controller,
    controllerAs: "signup"
  };
});
