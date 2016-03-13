(function () {
  'use strict';

  function PreferenceStorageService($window) {
    var api = this;

    var stored = {};

    api.store = store;
    api.get = get;
    api.getForServer = getForServer;
    api.restartPreferences = restartPreferences;

    initialize();

    function initialize() {
      var data = $window.localStorage.getItem('alius-emotion-preferences');
      try {
        var parsed = JSON.parse(data);
        stored.sadness = parsed.sadness || 3;
        stored.joy = parsed.joy || 3;
        stored.anger = parsed.anger || 3;
        stored.disgust = parsed.disgust || 3;
        stored.fear = parsed.fear || 3;
      } catch (e) {
        restartPreferences();
      }
    }

    function restartPreferences() {
      stored.sadness = 3;
      stored.joy = 3;
      stored.anger = 3;
      stored.disgust = 3;
      stored.fear = 3;
      store(stored);
      return stored;
    }

    function store(values) {
      $window.localStorage.setItem('alius-emotion-preferences', JSON.stringify({
        sadness: values.sadness,
        joy: values.joy,
        anger: values.anger,
        disgust: values.disgust,
        fear: values.fear
      }));
    }

    function get() {
      return stored;
    }

    function getForServer() {
      var payload = {};
      for(var key in stored) {
        if (stored[key] === 1) {
          payload[key] = -3;
        } else if  (stored[key] === 2) {
          payload[key] = -1;
        } else if (stored[key] === 3) {
          payload[key]  = 0;
        } else if (stored[key] === 4) {
          payload[key] = 1;
        } else {
          payload[key] = 3;
        }
      }
      return payload;
    }
  }

  PreferenceStorageService.$inject = ['$window'];

  angular.module('alius')
      .service('preferenceStorageService', PreferenceStorageService);
})();
