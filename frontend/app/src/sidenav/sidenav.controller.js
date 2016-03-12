(function () {
  'use strict';

  function SidenavController($state, $mdSidenav) {
    var vm = this;

    vm.goTo = goTo;

    function goTo(state) {
      $state.go(state);
      $mdSidenav('left').toggle();
    }
  }

  SidenavController.$inject = ['$state', '$mdSidenav'];

  angular.module('alius')
      .controller('SidenavController', SidenavController);
})();
