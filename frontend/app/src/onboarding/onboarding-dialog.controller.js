(function () {
  'use strict';

  function OnboardingDialogController($mdDialog, $scope, $analytics) {
    var vm = this;

    vm.currentTabIndex = 0;
    vm.isLastTab = isLastTab;
    vm.nextTab = nextTab;
    vm.accept = accept;

    var finished = false;

    $scope.$watch(function() {
      return vm.currentTabIndex
    }, function () {
      if (!finished && vm.currentTabIndex === 2) {
        finished = true;
        $analytics.eventTrack('onboarding-finished');
      }
    });

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

  OnboardingDialogController.$inject = ['$mdDialog', '$scope', '$analytics'];

  angular.module('alius')
      .controller('OnboardingDialogController', OnboardingDialogController);
})();
