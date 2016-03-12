(function () {
  'use strict';

  function OnboardingService($mdDialog, $document, $analytics) {

    var api = this;

    api.triggerOnboarding = triggerOnboarding;

    function triggerOnboarding() {
      return $mdDialog.show({
        controller: 'OnboardingDialogController',
        controllerAs: '$ctrl',
        templateUrl: 'src/onboarding/onboarding-dialog.html',
        parent: angular.element($document.body)
      }).finally(function() {
        $analytics.eventTrack('onboarding-dismiss');
      });
    }
  }

  OnboardingService.$inject = ['$mdDialog', '$document', '$analytics'];

  angular.module('alius')
      .service('onboardingService', OnboardingService);

})();
