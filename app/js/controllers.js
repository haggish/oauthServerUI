'use strict';

/* Controllers */

angular.module('oauthServerUI.controllers', []).

    controller('Tokens', ['$scope', 'tokens', 'resources',
        function ($scope, tokens, resources) {

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

            $scope.tokens = tokens.all();

            var withID = function (id) {
                return function (e) {
                    return e._id === id;
                };
            };

            var not = function (f) {
                return function () {
                    return !f();
                }
            };

            $scope.remove = function (id) {
                $scope.tokens.filter(withID(id)).forEach(function (e) {
                    e.$remove(function () {
                        $scope.tokens = $scope.tokens.filter(not(withID(id)));
                    });
                });
            };

            $scope.newToken = {};

            $scope.add = function () {
                new tokens($scope.newToken).$save();
            };

            $scope.save = function () {
                console.log('kak');
            }

        }])

    .controller('Resources', ['$scope', 'resources', 'users',
        function ($scope, resources, users) {

            $scope.resources = resources.query();

            $scope.users = users.query();

        }]);