angular.module("DonP", ["ngMaterial", "720kb.socialshare", 'ngPinchZoom', 'duScroll', 'ngSanitize', 'ksSwiper', 'ngclipboard', 'chart.js'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      "default" : "700"
    })
    .accentPalette('red');
})
.config(['ChartJsProvider', function (ChartJsProvider) {
   // Configure all charts
   ChartJsProvider.setOptions({
     chartColors: ['#C62828', '#1565C0', '#7B1FA2', '#FDD835'],
     responsive: true,
     rotation: 1 * Math.PI,
     circumference: 1 * Math.PI,
     maintainAspectRatio: false
   });
   // Configure all line charts
   ChartJsProvider.setOptions('line', {
     showLines: false
   });
 }])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}])

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});
