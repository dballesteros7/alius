(function () {
  'use strict';

  function ToolbarController($log, $mdSidenav) {
    var vm = this;

    vm.titleShown = true;

    vm.onSearchBarExpanded = onSearchBarExpanded;
    vm.onSearchBarCollapsed = onSearchBarCollapsed;

    vm.showSidenav = showSidenav;

    // -------------------------------------------------------------------------

    function onSearchBarExpanded() {
      $log.debug('Expanded');
      vm.titleShown = false;
    }

    function onSearchBarCollapsed() {
      vm.titleShown = true;
    }

    function showSidenav() {
      $mdSidenav('left').toggle();
    }
  }

  ToolbarController.$inject = ['$log', '$mdSidenav'];


  angular.module('alius')
      .controller('ToolbarController', ToolbarController);
})();
