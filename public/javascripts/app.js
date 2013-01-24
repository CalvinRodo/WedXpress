/**
 * Created with IntelliJ IDEA.
 * User: calvin
 * Date: 1/23/13
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])
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
