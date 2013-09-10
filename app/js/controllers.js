'use strict';

/* Controllers */

angular.module('oauthServerUI.controllers', []).

    controller('Tokens', ['$scope', 'tokens', 'resources',
        function ($scope, tokens, resources) {
            $scope.resourcesOfUser = resources.query(function () {
                $scope.resourcesOfUser = $scope.resourcesOfUser.map(function (e) {
                    return e.id;
                });
            }); // FIXME: only resources of cuser
            // FIXME: see what is selected in resources, then query their scopes, then union
            $scope.unionOfResourceScopes = [ 'read', 'write', 'delete' ];
            // FIXME: same for authzd grant types of resources
            $scope.unionOfAuthorizedGrantTypes = [ 'AUTHORIZATION_CODE', 'IMPLICIT' ];
            $scope.tokens = tokens.query();
        }])
    .controller('Resources', ['$scope', 'resources', 'users',
        function ($scope, resources, users) {
            $scope.resources = resources.query();
            $scope.users = users.query();
        }]);