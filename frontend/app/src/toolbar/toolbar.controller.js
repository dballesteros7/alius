(function () {
  'use strict';

  function ToolbarController($log) {
    var vm = this;

    vm.titleShown = true;

    vm.onSearchBarExpanded = onSearchBarExpanded;
    vm.onSearchBarCollapsed = onSearchBarCollapsed;

    // -------------------------------------------------------------------------

    function onSearchBarExpanded() {
      $log.debug('Expanded');
      vm.titleShown = false;
    }

    function onSearchBarCollapsed() {
      vm.titleShown = true;
    }
  }

  ToolbarController.$inject = ['$log'];


  angular.module('alius')
      .controller('ToolbarController', ToolbarController);
})();
