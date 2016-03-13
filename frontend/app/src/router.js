(function () {
  'use strict';


  angular.module('alius')
      .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
          url: '/home',
          template: '<alius-home flex layout="column"></alius-home>'
        }).state('search', {
          url: '/search?q',
          template: '<alius-content flex layout="column"></alius-content>'
        }).state('preferences', {
          url: '/preferences',
          template: '<alius-preferences flex layout="column"></alius-preferences>'
        });
      }]);
})();
