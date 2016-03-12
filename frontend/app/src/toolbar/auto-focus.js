(function () {
  'use strict';

  angular.module('alius')
      .directive('aliusAutoFocus', ['$timeout', function ($timeout) {
        function link(scope, element) {
          scope.aliusFocus = function () {
            var el = element[0];
            $timeout(function () {
              el.focus();
            }, 0, false);
          };
          scope.aliusBlur = function () {
            var el = element[0];
            $timeout(function () {
              el.blur();
            }, 0, false);
          }
        }

        return {
          restrict: 'A',
          scope: {
            aliusFocus: '=',
            aliusBlur: '='
          },
          link: link
        };
      }]);
})();
