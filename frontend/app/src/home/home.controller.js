(function () {
  'use strict';

  function HomeController(searchService, searchResultsService) {

    var vm = this;
    vm.results = searchResultsService.results;
    vm.isLoading = isLoading;

    searchService.popular();

    function isLoading() {
      return searchResultsService.isLoading;
    }
  }

  HomeController.$inject = ['searchService', 'searchResultsService'];

  angular.module('alius')
      .controller('HomeController', HomeController);
})();
