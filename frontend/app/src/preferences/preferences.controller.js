(function () {
  'use strict';

  function PreferencesController(preferenceStorageService) {
    var vm = this;

    vm.restartControls = restartControls;
    vm.onChange = onChange;

    vm.prefs = preferenceStorageService.get();

    function onChange() {
      preferenceStorageService.store(vm.prefs);
    }

    function restartControls() {
      vm.prefs = preferenceStorageService.restartPreferences();
    }
  }

  PreferencesController.$inject = ['preferenceStorageService'];

  angular.module('alius')
      .controller('PreferencesController', PreferencesController);
})();
