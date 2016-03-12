(function () {
  'use strict';


  function SearchService($http, $log, $q, searchResultsService) {
    var api = this;

    api.search = search;
    api.popular = popular;

    // -------------------------------------------------------------------------

    function search(query) {
      searchResultsService.startLoad();
      return $http({
        url: 'http://alius-server.eu-gb.mybluemix.net/search',
        params: {
          q: query
        }
      }).then(function (httpData) {
        $log.debug(httpData.data.articles);
        searchResultsService.endLoad();
        searchResultsService.updateResults(query, httpData.data.articles);
      })
    }

    function popular() {
      searchResultsService.startLoad();
      return $http({
        url: 'http://alius-server.eu-gb.mybluemix.net/popular',
      }).then(function (httpData) {
        $log.debug(httpData.data);
        searchResultsService.endLoad();
        var terms = [];
        for(var term in httpData.data) {
          if (term === 'true' || term === '') {
            continue;
          }
          terms.push(term);
        }
        terms.sort(function(item) {
          return httpData.data[item];
        });
        searchResultsService.updateResults('', terms);
      })
    }
  }

  SearchService.$inject = ['$http', '$log', '$q', 'searchResultsService'];

  angular.module('alius')
      .service('searchService', SearchService);
})();
