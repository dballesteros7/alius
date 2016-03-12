(function () {
  'use strict';

  function ContentController(searchService, searchResultsService, $window, $stateParams, $state) {
    var vm = this;

    var q = $stateParams.q;
    if (!q) {
      $state.go('home');
    }
    searchService.search(q);

    vm.results = searchResultsService.results;
    vm.openLink = openLink;
    vm.isLoading = isLoading;
    vm.isStart = true;
    vm.queryTerm = queryTerm;

    // -------------------------------------------------------------------------

    function queryTerm() {
      return searchResultsService.queryTerm;
    }
    function isLoading() {
      return searchResultsService.isLoading;
    }

    function openLink(result) {
      $window.open(result.url, '_blank');
    }
  }

  ContentController.$inject = ['searchService', 'searchResultsService', '$window', '$stateParams', '$state'];

  angular.module('alius')
      .controller('ContentController', ContentController);
})();
