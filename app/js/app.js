'use strict';


// Declare app level module which depends on filters, and services
angular.module('oauthServerUI', ['oauthServerUI.filters', 'oauthServerUI.services', 'oauthServerUI.directives',
        'oauthServerUI.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/tokens', {templateUrl: 'partials/tokens.html',
            controller: 'Tokens'});
        $routeProvider.when('/resources', {templateUrl: 'partials/resources.html',
            controller: 'Resources'});
        $routeProvider.otherwise({redirectTo: '/tokens'});
    }]);
