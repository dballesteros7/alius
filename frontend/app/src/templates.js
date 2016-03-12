angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("src/content/content.html","<md-subheader class=\"headliner\">\n  All points of view on: {{ $ctrl.queryTerm() }}\n</md-subheader>\n<md-content id=\"main-content\" layout=\"column\" flex\n            ng-show=\"$ctrl.results.length && !$ctrl.isLoading()\">\n  <div class=\"news-reel\" ng-hide=\"$ctrl.isLoading()\" layout=\"column\" flex>\n    <div ng-repeat=\"result in $ctrl.results\" class=\"news-item\" layout=\"row\"\n         ng-click=\"$ctrl.openLink(result)\"\n         analytics-on=\"click\"\n         analytics-event=\"news-item-{{$index}}-click\"\n         md-ink-ripple=\"#000\" sentiment-colorer sentiment=\"result.tone\">\n        <div class=\"headline-image\" layout=\"row\" layout-align=\"center center\">\n          <img ng-src=\"{{ result.top_image }}\">\n        </div>\n        <div class=\"headline-text\">\n          <div class=\"md-subhead\">\n            {{ result.title }}\n          </div>\n          <div class=\"md-caption\">\n            By {{ result.source }}\n          </div>\n        </div>\n    </div>\n  </div>\n</md-content>\n<div flex ng-show=\"$ctrl.isLoading()\" layout=\"row\" layout-align=\"center center\">\n  <md-progress-circular></md-progress-circular>\n</div>\n<div flex ng-hide=\"$ctrl.results.length || $ctrl.isLoading()\" layout=\"column\"\n     layout-align=\"start center\" layout-padding>\n  <h3 class=\"md-display-1\">Discover all points of view</h3>\n  <p class=\"md-headline\">\n    Click/press the search button to start.\n  </p>\n</div>\n\n");
$templateCache.put("src/home/home.html","<md-subheader class=\"headliner\">\n  <md-icon md-font-set=\"material-icons\">whatshot</md-icon>\n  Trending searches\n</md-subheader>\n<md-content layout=\"column\" flex\n            ng-show=\"$ctrl.results.length && !$ctrl.isLoading()\">\n  <md-list>\n    <md-list-item ng-repeat=\"result in $ctrl.results\"\n                  analytics-on=\"click\"\n                  analytics-event=\"trending-word-click\"\n                  ng-class=\"{\'md-display-2\': $index < 2,\n                             \'md-display-1\': $index >= 2 && $index < 4,\n                             \'md-headline\': $index >= 4 && $index < 6,\n                             \'md-title\': $index >= 6 && $index < 8,\n                             \'md-subhead\': $index >= 8}\"\n                  ui-sref=\"search({q: result})\">\n      <div class=\"md-list-item-text\">\n        {{ $index + 1 }}. {{ result }}\n      </div>\n    </md-list-item>\n  </md-list>\n</md-content>\n<div flex ng-show=\"$ctrl.isLoading()\" layout=\"row\" layout-align=\"center center\">\n  <md-progress-circular></md-progress-circular>\n</div>\n");
$templateCache.put("src/onboarding/onboarding-dialog.html","<md-dialog>\n  <md-toolbar>\n    <div class=\"md-toolbar-tools\">\n      <h2>Welcome to Alius!</h2>\n      <span flex></span>\n      <md-button class=\"md-icon-button\" ng-click=\"$ctrl.dismiss()\">\n        <md-icon md-font-set=\"material-icons\">close</md-icon>\n      </md-button>\n    </div>\n  </md-toolbar>\n  <md-dialog-content style=\"width:90%; height:90%;\">\n    <md-tabs md-dynamic-height md-border-bottom md-selected=\"$ctrl.currentTabIndex\">\n      <md-tab label=\"What is this?\">\n        <md-content class=\"md-padding\">\n          <p>\n            <i>Alius</i> is latin for <b>another</b> or <b>diverse</b>. Nowadays, it\'s very\n            easy to get captured by a single side of any story.\n          </p>\n          <p>\n            <i>Alius</i> provides an alternative news search app where\n            every side of a story is represented to widen your horizons.\n          </p>\n        </md-content>\n      </md-tab>\n      <md-tab label=\"The colors\">\n        <md-content class=\"md-padding\">\n          <i>Alius</i> utilizes IBM Watson to evaluate the tone of news articles\n          and scores them in 5 emotions. The shade of the color relates\n          to the strength of the perceived tone.\n          <md-list>\n            <md-list-item class=\"joy\">\n              <div class=\"md-item-text\">\n                Joy\n              </div>\n            </md-list-item>\n            <md-list-item class=\"fear\">\n              <div class=\"md-item-text\">\n                Fear\n              </div>\n            </md-list-item>\n            <md-list-item class=\"anger\">\n              <div class=\"md-item-text\">\n                Anger\n              </div>\n            </md-list-item>\n            <md-list-item class=\"disgust\">\n              <div class=\"md-item-text\">\n                Disgust\n              </div>\n            </md-list-item>\n            <md-list-item class=\"sadness\">\n              <div class=\"md-item-text\">\n                Sadness\n              </div>\n            </md-list-item>\n          </md-list>\n        </md-content>\n      </md-tab>\n      <md-tab label=\"Enjoy!\">\n        <md-content class=\"md-padding\">\n          <p>\n            <i>Alius</i> lets you search for news,\n            see their predominant sentiments, save the articles you like,\n            and explore your preferred moods.\n          </p>\n          <p>\n            Send us feedback! We are happy to offer you a wider view of the world.\n          </p>\n        </md-content>\n      </md-tab>\n    </md-tabs>\n  </md-dialog-content>\n  <md-dialog-actions layout=\"row\">\n    <span flex></span>\n    <md-button ng-show=\"$ctrl.isLastTab()\" ng-click=\"$ctrl.accept()\">\n      Let\'s start\n    </md-button>\n    <md-button ng-hide=\"$ctrl.isLastTab()\" ng-click=\"$ctrl.nextTab()\">\n      Next\n    </md-button>\n\n  </md-dialog-actions>\n</md-dialog>\n");
$templateCache.put("src/sidenav/sidenav.html","<md-sidenav class=\"md-sidenav-left md-whiteframe-z2\"\n            md-component-id=\"left\" flex\n            md-is-locked-open=\"$mdMedia(\'gt-sm\')\" fe>\n  <md-toolbar class=\"md-whiteframe-z1 md-medium-tall\" layout-align=\"center stretch\">\n    <div class=\"md-toolbar-tools\" layout=\"column\" layout-align=\"start stretch\">\n      <img src=\"assets/logo.svg\" class=\"logo-cage\">\n    </div>\n\n  </md-toolbar>\n  <md-list flex>\n    <md-list-item ng-click=\"$ctrl.goTo(\'home\')\" analytics-on=\"click\"\n                  analytics-event=\"sidenav-home-click\">\n      <md-icon md-font-set=\"material-icons\">home</md-icon>\n      <p>Home</p>\n    </md-list-item>\n    <md-list-item>\n      <md-icon md-font-set=\"material-icons\">people</md-icon>\n      <p>Team</p>\n    </md-list-item>\n    <md-list-item ng-click=\"$ctrl.help()\" analytics-on=\"click\"\n                  analytics-event=\"sidenav-help-click\">\n      <md-icon md-font-set=\"material-icons\">help</md-icon>\n      <p>Help</p>\n    </md-list-item>\n    <md-list-item ng-click=\"$ctrl.openForm()\" analytics-on=\"click\"\n                  analytics-event=\"sidenav-feedback-click\">\n      <md-icon md-font-set=\"material-icons\">feedback</md-icon>\n      <p>Feedback</p>\n    </md-list-item>\n  </md-list>\n\n</md-sidenav>\n");
$templateCache.put("src/toolbar/search-bar.html","<md-input-container md-no-float\n                    ng-class=\"$ctrl.expanded ? \'expanded\' : \'collapsed\'\"\n                    alius-transition-end\n                    on-transition-end=\"$ctrl.onTransitionEnd()\">\n  <input type=\"text\" ng-model=\"$ctrl.searchText\"\n         placeholder=\"Search\"\n         ng-keypress=\"$ctrl.onKeyPress($event)\"\n         ng-blur=\"$ctrl.onBlur($event)\"\n         alius-auto-focus alius-focus=\"$ctrl.focus\" alius-blur=\"$ctrl.blur\">\n</md-input-container>\n<md-button class=\"md-icon-button\" analytics-on=\"click\"\n           analytics-event=\"search-bar-shown\"\n           ng-click=\"$ctrl.expand($event)\" ng-show=\"$ctrl.showButton\">\n  <md-icon md-font-set=\"material-icons\">search</md-icon>\n</md-button>\n");
$templateCache.put("src/toolbar/toolbar.html","<md-toolbar layout=\"row\" class=\"md-whiteframe-z1 md-medium-tall\"\n            layout-align=\"start center\">\n  <md-button class=\"md-icon-button\" ng-click=\"$ctrl.showSidenav()\" hide-gt-sm\n    analytics-on=\"click\" analytics-event=\"menu-opened\">\n    <md-icon md-font-set=\"material-icons\">menu</md-icon>\n  </md-button>\n  <h3 flex ng-show=\"$ctrl.titleShown\" layout=\"row\" layout-align=\"center stretch\">\n    Alius\n  </h3>\n  <alius-search-bar ng-class=\"{flexed: !$ctrl.titleShown}\"\n                    on-expanded=\"$ctrl.onSearchBarExpanded()\"\n                    on-collapsed=\"$ctrl.onSearchBarCollapsed()\">\n  </alius-search-bar>\n</md-toolbar>\n");}]);