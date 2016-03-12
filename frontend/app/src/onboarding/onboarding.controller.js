(function () {
  'use strict';

  function OnboardingController($window, $mdDialog, $document) {
    if ($window.localStorage) {
      var value = $window.localStorage.getItem('alius-first-visit');
      if (!value) {
        triggerOnboarding();
      }
    }


    function triggerOnboarding() {
      $mdDialog.show({
        controller: 'OnboardingDialogController',
        controllerAs: '$ctrl',
        templateUrl: 'src/onboarding/onboarding-dialog.html',
        parent: angular.element($document.body)
      }).finally(function() {
        $window.localStorage.setItem('alius-first-visit', true);
      });
    }
  }

  OnboardingController.$inject = ['$window', '$mdDialog', '$document'];

  angular.module('alius')
      .controller('OnboardingController', OnboardingController);
})();
