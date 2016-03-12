(function () {
  'use strict';


  angular.module('alius')
      .component('aliusSearchBar', {
        templateUrl: './src/toolbar/search-bar.html',
        controller: 'SearchBarController',
        bindings: {
          onExpanded: '&',
          onCollapsed: '&'
        }
      });
})();
