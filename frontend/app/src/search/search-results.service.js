(function () {
  'use strict';

  function SearchResultsService($log) {
    var api = this;

    api.startLoad = startLoad;
    api.endLoad = endLoad;
    api.updateResults = updateResults;

    api.isLoading = false;
    api.results = [];

    // -------------------------------------------------------------------------

    function startLoad() {
      api.isLoading = true;
    }

    function endLoad() {
      api.isLoading = false;
    }

    function updateResults(articles) {
      api.results.length = 0;
      Array.prototype.push.apply(api.results, articles);
      $log.debug(api.results);
    }
  }

  SearchResultsService.$inject = ['$log'];

  angular.module('alius')
      .service('searchResultsService', SearchResultsService);
})();
