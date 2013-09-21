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

            tokens.all(function (all) {
                $scope.tokens = all;
            });

            var withID = function (id) {
                return function (e) {
                    return e._id === id;
                };
            };

            var not = function (f) {
                return function (e) {
                    return !f(e);
                }
            };

            $scope.remove = function (id) {
                $scope.tokens.filter(withID(id)).forEach(function (e) {
                    e.$remove(function () {
                        $scope.tokens = $scope.tokens.filter(not(withID(id)));
                        $scope.newToken = {};
                    });
                });
            };

            $scope.newToken = {};

            $scope.add = function () {
                var newToken = new tokens($scope.newToken);
                newToken.$save(function () {
                    $scope.tokens.push(newToken);
                    $scope.newToken = {};
                });
            };

            $scope.save = function (id) {
                $scope.tokens.filter(withID(id)).forEach(function (e) {
                    e.$update(function () {
                        console.log(id + ' updated');
                    });
                })
            }

        }])

    .controller('Resources', ['$scope', 'resources', 'users',
        function ($scope, resources, users) {

            $scope.resources = resources.query();

            $scope.users = users.query();

        }]);