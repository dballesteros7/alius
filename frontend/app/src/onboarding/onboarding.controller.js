(function () {
  'use strict';

  function OnboardingController($window, onboardingService) {
    if ($window.localStorage) {
      var value = $window.localStorage.getItem('alius-first-visit');
      if (!value) {
        onboardingService.triggerOnboarding().then(function() {
          $window.localStorage.setItem('alius-first-visit', true);
        });
      }
    }
  }

  OnboardingController.$inject = ['$window', 'onboardingService'];

  angular.module('alius')
      .controller('OnboardingController', OnboardingController);
})();
