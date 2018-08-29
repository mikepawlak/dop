angular.module("DonP")
.directive("tools", function() {
  var controller = function() {
    var ctl = this;

    this.toolList = [
      {
        title: "Bug Your Senator",
        summary: "Is there an issue that you are particularly passionate about? Is there something you agree or disagree with your Senator on? Let them know. Select your state to find your legislator's mail, phone, and social media contact information and speak your mind.",
        graphicSrc: "senateConnect.png",
        url: "/bug-your-senator"
      },
      {
        title: "Bug Your Congressperson",
        summary: "Is there an issue that you are particularly passionate about? Is there something you agree or disagree with your Congressperson on? Let them know. Select your state to find your legislator's mail, phone, and social media contact information and speak your mind.",
        graphicSrc: "congressConnect.png",
        url: "/bug-your-congressperson"
      }
    ];

  };
  return {
    restrict: "E",
    templateUrl: "app/layout/tools/tools.html",
    controller: controller,
    controllerAs: "tools"
  };
});
