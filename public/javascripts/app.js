'use-strict'
angular.module('weddingApp')
  .configure(['$routeProvider', '$locationProvider'], function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/homepage',
        controller: DefaultCtrl
      }).otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
