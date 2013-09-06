'use strict';

angular.module('oauthServerUI.services', ['ngResource'])
    .constant('dbURL',
        'https://api.mongolab.com/api/1/databases/oauth/collections')
    .constant('apiKey', '50e30f30e4b013ed303bbea5')
    .service('util', function (dbURL, apiKey, $resource) {
        this.resourceFor = function (dbname) {
            return $resource(dbURL + '/' + dbname, {
                "apiKey": apiKey
            }, {});
        };
    })
    .factory('tokens', function (util) {
        return util.resourceFor('tokens')
    })
    .factory('resources', function (util) {
        return util.resourceFor('resources');
    })
    .factory('users', function (util) {
        return util.resourceFor('users');
    });