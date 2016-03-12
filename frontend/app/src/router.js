(function () {
  'use strict';


  angular.module('alius')
      .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
          url: '/home',
          template: '<alius-home flex layout="row"></alius-home>'
        }).state('search', {
          url: '/search?q',
          template: '<alius-content flex layout="row"></alius-content>'
        })
      }])
})();
