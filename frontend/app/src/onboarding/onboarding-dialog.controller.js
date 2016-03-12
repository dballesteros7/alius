(function () {
  'use strict';

  function OnboardingDialogController($mdDialog) {
    var vm = this;

    vm.currentTabIndex = 0;
    vm.isLastTab = isLastTab;
    vm.nextTab = nextTab;
    vm.accept = accept;

    function isLastTab() {
      return vm.currentTabIndex === 2;
    }

    function nextTab() {
      vm.currentTabIndex++;
    }

    function accept() {
      $mdDialog.hide();
    }

  }

  OnboardingDialogController.$inject = ['$mdDialog'];

  angular.module('alius')
      .controller('OnboardingDialogController', OnboardingDialogController);
})();
