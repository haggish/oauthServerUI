'use strict';

angular.module('oauthServerUI.services', ['mongolabResourceHttp'])
    .constant('MONGOLAB_CONFIG',
    { API_KEY: '50e30f30e4b013ed303bbea5', DB_NAME: 'oauth' })
    .service('util', function (dbURL, apiKey, $resource) {
        // empty for now
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