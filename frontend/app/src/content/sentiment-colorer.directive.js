(function () {
  'use strict';

  var anger_colormap = [
      ['#FFCDD2', '#000'],
      ['#EF9A9A', '#000'],
      ['#E57373', '#000'],
      ['#EF5350', '#FFF'],
      ['#F44336', '#FFF'],
      ['#E53935', '#FFF'],
      ['#D32F2F', '#FFF'],
      ['#C62828', '#FFF'],
      ['#B71C1C', '#FFF']
  ];

  var joy_colormap = [
    ['#FFF9C4', '#000'],
    ['#FFF59D', '#000'],
    ['#FFF176', '#000'],
    ['#FFEE58', '#000'],
    ['#FFEB3B', '#000'],
    ['#FDD835', '#000'],
    ['#FBC02D', '#000'],
    ['#F9A825', '#000'],
    ['#F57F17', '#000']
  ];

  var sadness_colormap = [
      ['#BBDEFB', '#000'],
      ['#90CAF9', '#000'],
      ['#64B5F6', '#000'],
      ['#42A5F5', '#000'],
      ['#2196F3', '#FFF'],
      ['#1E88E5', '#FFF'],
      ['#1976D2', '#FFF'],
      ['#1565C0', '#FFF'],
      ['#0D47A1', '#FFF']
  ];

  var disgust_colormap = [
      ['#E1BEE7', '#000'],
      ['#CE93D8', '#000'],
      ['#BA68C8', '#FFF'],
      ['#AB47BC', '#FFF'],
      ['#9C27B0', '#FFF'],
      ['#8E24AA', '#FFF'],
      ['#7B1FA2', '#FFF'],
      ['#6A1B9A', '#FFF'],
      ['#4A148C', '#FFF']
  ];

  var fear_colormap = [
      ['#DCEDC8', '#000'],
      ['#C5E1A5', '#000'],
      ['#AED581', '#000'],
      ['#9CCC65', '#000'],
      ['#8BC34A', '#000'],
      ['#7CB342', '#000'],
      ['#689F38', '#FFF'],
      ['#558B2F', '#FFF'],
      ['#33691E', '#FFF']
  ];

  angular.module('alius')
      .directive('sentimentColorer', ['$log', function($log) {
        function link(scope, element) {
          var el = element[0];

          var sentiment = scope.sentiment;

          var max_key = null;
          var max_value = 0.0;
          for (var key in sentiment) {
            if (sentiment[key] > max_value) {
              max_value = sentiment[key];
              max_key = key;
            }
          }

          var backgroundColor = '#FFF';
          var color = '#000';

          var colorIndex = Math.round(max_value * 10);
          if (colorIndex > 8) {
            colorIndex = 8;
          }

          var colormap = null;
          switch (max_key) {
            case 'anger':
                colormap = anger_colormap;
                break;
            case 'joy':
                colormap = joy_colormap;
                break;
            case 'fear':
                colormap = fear_colormap;
              break;
            case 'disgust':
                colormap = disgust_colormap;
              break;
            case 'sadness':
                colormap = sadness_colormap;
              break;
            default:
              $log.warn('Unknown sentiment.');
          }
          if (colormap) {
            backgroundColor = colormap[colorIndex][0];
            color = colormap[colorIndex][1];
            el.style.background = backgroundColor;
            el.style.color = color;
          }
        }

        return {
          restrict: 'A',
          scope: {
            sentiment: '='
          },
          link: link
        };
      }])
})();
