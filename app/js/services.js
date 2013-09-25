'use strict';

angular.module('oauthServerUI.services', ['mongolabResourceHttp'])
    .constant('MONGOLAB_CONFIG',
    { API_KEY: '50e30f30e4b013ed303bbea5', DB_NAME: 'oauth' })
    .service('util', function () {

        var util = this;

        this.withID = function (id) {
            return function (e) {
                return e._id === id;
            };
        };

        this.not = function (f) {
            return function (e) {
                return !f(e);
            }
        };

        function collectionNameFor(entityName) {
            return entityName + 's';
        }

        function newEntityNameFor(entityName) {
            return 'new' + entityName.charAt(0).toUpperCase() +
                entityName.substring(1);
        }

        this.update = function (entityName, $scope) {
            return function (id) {
                $scope[collectionNameFor(entityName)].filter(util.withID(id))
                    .forEach(function (e) {
                        e.$update(function () {
                            console.log(entityName + ' ' + id + ' updated');
                        });
                    });
            };
        };

        this.add = function (entityName, ctor, $scope) {
            return function () {
                var newEntityName = newEntityNameFor(entityName);
                var collectionName = collectionNameFor(entityName);
                var newEntity = new ctor($scope[newEntityName]);
                newEntity.$save(function (result) {
                    newEntity._id = result._id;
                    $scope[collectionName].push(newEntity);
                    $scope[newEntityName] = {};
                });
            };
        };

        this.remove = function (entityName, $scope) {
            return function (id) {
                var newEntityName = newEntityNameFor(entityName);
                var collectionName = collectionNameFor(entityName);
                $scope[collectionName].filter(
                        util.withID(id)).forEach(function (e) {
                    e.$remove(function () {
                        $scope[collectionName] =
                            $scope[collectionName]
                                .filter(util.not(util.withID(id)));
                        $scope[newEntityName] = {};
                    });
                });
            };
        };
    })
    .factory('tokens', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('tokens');
    })
    .factory('resources', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('resources');
    })
    .factory('users', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('users');
    });