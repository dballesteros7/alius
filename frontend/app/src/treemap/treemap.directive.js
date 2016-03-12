(function () {
  'use strict';


  angular.module('alius')
      .directive('aliusTreemap', ['$log', '$timeout', function($log, $timeout) {

        function link(scope, element) {
          var el = element[0];
        }
        return {
          restrict: 'E',
          scope: {
            terms: '='
          },
          template: '<div flex></div>',
          link: link
        }
      }]);
})();
