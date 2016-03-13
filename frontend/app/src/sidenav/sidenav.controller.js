(function () {
  'use strict';

  function SidenavController($state, $mdSidenav, onboardingService, $window, $mdMedia) {
    var vm = this;

    vm.goTo = goTo;
    vm.help = help;
    vm.openForm = openForm;

    function goTo(state) {
      $state.go(state);
      if (!$mdMedia('gt-sm')) {
        $mdSidenav('left').toggle();
      }
    }

    function help() {
      onboardingService.triggerOnboarding();
      if (!$mdMedia('gt-sm')) {
        $mdSidenav('left').toggle();
      }
    }

    function openForm() {
      $window.open('http://goo.gl/forms/VWYgbSTQCg', '_blank');
      if (!$mdMedia('gt-sm')) {
        $mdSidenav('left').toggle();
      }

    }
  }

  SidenavController.$inject = ['$state', '$mdSidenav', 'onboardingService', '$window', '$mdMedia'];

  angular.module('alius')
      .controller('SidenavController', SidenavController);
})();
