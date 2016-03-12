(function () {
  'use strict';

  function SearchBarController(searchService, $log, $timeout) {
    var vm = this;

    vm.searchText = '';
    vm.showButton = true;
    vm.expanded = false;

    vm.expand = expand;
    vm.collapse = collapse;
    vm.onBlur = onBlur;
    vm.onKeyPress = onKeyPress;
    vm.onTransitionEnd = onTransitionEnd;

    var transitioning = false;

    // -------------------------------------------------------------------------

    function expand() {
      vm.expanded = true;
      vm.showButton = false;
      vm.onExpanded();
      transitioning = true;
    }

    function collapse() {
      vm.expanded = false;
      transitioning = true;
    }

    function onBlur() {
      if (transitioning) {
        return;
      }
      collapse();
    }

    function onTransitionEnd() {
      if (!vm.expanded) {
        vm.onCollapsed();
        vm.showButton = true;
      } else {
        vm.focus();
      }
      transitioning = false;
    }

    function onKeyPress($event) {
      $log.debug($event.keyCode);
      if ($event.keyCode === 13) {
        searchService.search(vm.searchText);
      }
    }
  }

  SearchBarController.$inject = ['searchService', '$log', '$timeout'];

  angular.module('alius')
      .controller('SearchBarController', SearchBarController);
})();
