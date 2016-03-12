(function () {
  'use strict';

  angular.module('alius')
      .directive('aliusTransitionEnd', function() {

        function link(scope, element) {
          var el = element[0];
          el.addEventListener('transitionend', function() {
            scope.onTransitionEnd();
            scope.$applyAsync();
          });
        }
        return {
          restrict: 'A',
          scope: {
            'onTransitionEnd': '&'
          },
          link: link
        }
      })
})();
