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

            $scope.tokens = util.crudFor(tokens);

        }])

    .controller('Resources', ['$scope', 'resources', 'users', 'util',
        function ($scope, resources, users, util) {

            $scope.resources = util.crudFor(resources);

            $scope.users = util.crudFor(users);

            resources.all(function (all) {
                $scope.resourceNames = all.map(
                    function (e) {
                        return e.id;
                    });
            });
        }]);