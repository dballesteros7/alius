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
    vm.getSentiment = getSentiment;
    vm.getSentimentIcon = getSentimentIcon;

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

    function getSentiment(result) {
      var max_key = null;
      var max_value = 0;
      for(var key in result.tone) {
        if (result.tone[key] > max_value) {
          max_key = key;
          max_value = result.tone[key];
        }
      }
      var modifier = '';
      if (max_value >= 0.7) {
        modifier = 'Very ';
      } else if (max_value < 0.7 && max_value >= 0.4) {
        modifier = '';
      } else if (max_value < 0.4 && max_value >= 0.2) {
        modifier = 'Slightly ';
      } else {
        return 'Neutral';
      }

      switch (max_key) {
        case 'anger':
          return modifier + 'Angry';
        case 'sadness':
          return modifier + 'Sad';
        case 'disgust':
          return modifier + 'Disgusted';
        case 'joy':
          return modifier + 'Joyful';
        case 'fear':
          return modifier + 'Fearful';
      }
    }

    function getSentimentIcon(result) {
      var sentiment = getSentiment(result);
      if (sentiment === 'Neutral') {
        return 'sentiment_neutral'
      } else if (sentiment.includes('Joyful')) {
        if (sentiment.includes('Very')) {
          return 'sentiment_very_satisfied';
        } else {
          return 'sentiment_satisfied';
        }
      } else {
        if (sentiment.includes('Very')) {
          return 'sentiment_very_dissatisfied';
        } else {
          return 'sentiment_dissatisfied';
        }
      }
    }
  }

  ContentController.$inject = ['searchService', 'searchResultsService', '$window', '$stateParams', '$state'];

  angular.module('alius')
      .controller('ContentController', ContentController);
})();
