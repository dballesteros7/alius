(function () {
  'use strict';

  function HomeController(searchService, searchResultsService) {

    var vm = this;
    vm.results = searchResultsService.results;

    searchService.popular();
  }

  HomeController.$inject = ['searchService', 'searchResultsService'];

  angular.module('alius')
      .controller('HomeController', HomeController);
})();
