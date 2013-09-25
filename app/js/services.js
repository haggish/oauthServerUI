'use strict';

angular.module('oauthServerUI.services', ['mongolabResourceHttp'])
    .constant('MONGOLAB_CONFIG',
    { API_KEY: '50e30f30e4b013ed303bbea5', DB_NAME: 'oauth' })
    .service('util', function () {

        this.crudFor = function (repo) {

            var crud = {};

            crud.newOne = {};
            repo.all(function (all) {
                crud.all = all;
            });

            function withID(id) {
                return function (e) {
                    return e._id === id;
                };
            }

            function not(f) {
                return function (e) {
                    return !f(e);
                }
            }

            crud.add = function () {
                var newEntity = new repo(crud.newOne);
                newEntity.$save(function (result) {
                    newEntity._id = result._id;
                    crud.all.push(newEntity);
                    crud.newOne = {};
                });
            };

            crud.update = function (id) {
                crud.all.filter(withID(id))
                    .forEach(function (e) {
                        e.$update(function () {
                            console.log('entity ' + id + ' updated');
                        });
                    });
            };

            crud.remove = function (id) {
                crud.all.filter(
                        withID(id)).forEach(function (e) {
                        e.$remove(function () {
                            crud.all = crud.all.filter(not(withID(id)));
                            crud.newOne = {};
                        });
                    });
            };

            return crud;
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