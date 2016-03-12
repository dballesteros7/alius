(function () {
  'use strict';

  function ContentController(searchResultsService, $window) {
    var vm = this;

    vm.results = searchResultsService.results;
    vm.openLink = openLink;
    vm.isLoading = isLoading;
    vm.isStart = true;

    // -------------------------------------------------------------------------

    function isLoading() {
      return searchResultsService.isLoading;
    }

    function openLink(result) {
      $window.open(result.url, '_blank');
    }
  }

  ContentController.$inject = ['searchResultsService', '$window'];

  angular.module('alius')
      .controller('ContentController', ContentController);
})();
