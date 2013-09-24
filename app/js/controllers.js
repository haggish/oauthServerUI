'use strict';

/* Controllers */

angular.module('oauthServerUI.controllers', []).

    controller('Tokens', ['$scope', 'tokens', 'resources', 'util',
        function ($scope, tokens, resources, util) {

            $scope.resourcesOfUser = resources.all(function (all) {
                $scope.resourcesOfUser = all.map(
                    function (e) {
                        return e.id;
                    });
            }); // FIXME (when auth exists): only resources of cuser

            // FIXME: see what is selected in resources,
            // FIXME: then query their scopes, then union
            $scope.unionOfResourceScopes = [ 'read', 'write', 'delete' ];
            // FIXME: same for authzd grant types of resources

            $scope.unionOfAuthorizedGrantTypes =
                [ 'AUTHORIZATION_CODE', 'IMPLICIT' ];

            tokens.all(function (all) {
                $scope.tokens = all;
            });

            $scope.remove = util.remove('token', $scope);

            $scope.newToken = {};

            $scope.add = util.add('token', tokens, $scope);

            $scope.update = util.update('token', $scope);
        }])

    .controller('Resources', ['$scope', 'resources', 'users', 'util',
        function ($scope, resources, users, util) {

            $scope.resources = resources.all();

            $scope.users = users.all();

            $scope.newResource = {};

            $scope.newUser = {};

            $scope.saveResource = util.update('resource', $scope);

            $scope.removeResource = util.remove('resource', $scope);

            $scope.addResource = util.add('resource', resources, $scope);

            $scope.saveUser = util.update('user', $scope);

            $scope.removeUser = util.remove('user', $scope);

            $scope.addUser = util.add('user', users, $scope);

        }]);