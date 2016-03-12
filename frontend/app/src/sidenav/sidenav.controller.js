(function () {
  'use strict';

  function SidenavController($state, $mdSidenav, onboardingService, $window) {
    var vm = this;

    vm.goTo = goTo;
    vm.help = help;
    vm.openForm = openForm;

    function goTo(state) {
      $state.go(state);
      $mdSidenav('left').toggle();
    }

    function help() {
      onboardingService.triggerOnboarding();
    }

    function openForm() {
      $window.open('http://goo.gl/forms/VWYgbSTQCg', '_blank');
    }
  }

  SidenavController.$inject = ['$state', '$mdSidenav', 'onboardingService', '$window'];

  angular.module('alius')
      .controller('SidenavController', SidenavController);
})();
