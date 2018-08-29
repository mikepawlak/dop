angular.module("DonP")
.directive("imageViewer", function() {
  var controller = function($document, $location, $http, $timeout, $mdDialog) {
    var ctl = this;
    this.swiper = {};
    this.imgIndex = 0;
    this.shareUrl = null;
    this.imagePool = [];
    this.showDialog = showDialog;
    this.err = false;


    function progLoad () {
      var route = "/progPull/" + ctl.imagePool[ctl.imagePool.length - 1]._id;
      $http.get(route).then(function (succ, err) {
        if (err) {
          ctl.imgIndex = 0;
          ct.imgPool.push({
            internalUrl: "../img/notFound.png",
            title: "Not found"
          });
        } else {
          if (succ.data[0]) {
            ctl.imagePool.push(succ.data[0]);
          }
        }
      });
    }

    function updateLocation() {
      if (ctl.imagePool[ctl.imgIndex]) {
        $location.path(ctl.imagePool[ctl.imgIndex]._id);
      }

    }

    function getLocation() {
      var lString = $location.absUrl().split('/');
      lString = lString[lString.length - 1];

      return lString;
    }

    function updateShareUrl() {
      $http.get('/shareUrl/image/' + ctl.id).then( function (succ, err) {
        ctl.shareUrl = succ.data;
      });
    }


    ctl.swiperReady = function() {
      $timeout(function() {
        ctl.swiper.on('slideChangeStart', function () {
          ctl.imgIndex = ctl.swiper.realIndex;
          console.log(ctl.err);
          if (!ctl.err) {
            updateLocation();
            ctl.id = getLocation();
            updateShareUrl();
            progLoad();
            scrollTop();
          }
       });
      }, 500);
    };


    function scrollTop() {
      var top = 80;
      var duration = 800;
      $document.scrollTop(top, duration);
    }


    this.id = getLocation();
    updateShareUrl();

    if (ctl.id == "images" || ctl.id == "images#") {  //if there is no gallery ID
      $http.get("/imageInit/default").then(function (succ, err) {
        if (err) {
          ctl.err = true;
          ctl.imgIndex = 0;
          ct.imgPool.push({
            internalUrl: "../img/notFound.png",
            title: "Not found"
          });
        } else {
          console.log(succ.data);
          if (succ.data) {
            ctl.imagePool = succ.data;
            updateLocation();
            $timeout(function () {
              ctl.swiper.update();
            }, 500);
          }
          else {
            console.log("err");
            ctl.err = true;
            ctl.imgIndex = 0;
            ct.imgPool.push({
              internalUrl: "../img/notFound.png",
              title: "Not found"
            });
          }
        }
      });
    } else { //if the request is asking for a specific image
      $http.get("/imageInit/" + ctl.id).then(function (succ, err) {
        if (err) {
          console.log(err);
          ctl.err = true;
          ctl.imgIndex = 0;
          ctl.imagePool.push({
            internalUrl: "../img/notFound.png",
            title: "Not found"
          });
        } else {
          if (succ.data) {
            console.log(succ);
            ctl.imagePool[0] = succ.data;
            updateLocation();
          }
          else {
            console.log("err");
            ctl.err = true;
            ctl.imgIndex = 0;
            ctl.imagePool.push({
              internalUrl: "../img/notFound.png",
              title: "Not found"
            });
          }
        }
      }).then(function () {
        //then fill in the rest of the imagePool after original image is loaded
        //this _should_ increase performance
        $http.get("/progLoad/" + ctl.id).then(function (succ, err) {
          if (err) {
            ctl.imgIndex = 0;
            ctl.err = true;
            ct.imagePool.push({
              internalUrl: "../img/notFound.png",
              title: "Not found"
            });
          } else {
            for (i = 0; i < succ.data.pre.length; i++) {
                ctl.imagePool.unshift(succ.data.pre[i]);
            }
            for (i = 0; i < succ.data.post.length; i++) {
                ctl.imagePool.push(succ.data.post[i]);
            }
            $timeout(function () {
                ctl.swiper.slideTo(succ.data.pre.length);
                ctl.imgIndex = succ.data.pre.length;
            }, 500);
          }
        });
      });
    }

    function showDialog($event) {
       var parentEl = angular.element(document.body);
       var targetUrl = ctl.imagePool[ctl.imgIndex].internalUrl;
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         clickOutsideToClose: true,
         fullscreen: true,
         templateUrl: "app/layout/imageViewer/zoom.html",
         locals: {
           items: targetUrl
         },
         controller: DialogController
      });

    }

    function DialogController($scope, $mdDialog, items) {
      $scope.items = items;
      $scope.close = function() {
        $mdDialog.hide();
      };
    }


  };
  return {
    restrict: "E",
    templateUrl: "app/layout/imageViewer/image.html",
    controller: controller,
    controllerAs: "img"
  };
});
