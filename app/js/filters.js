'use strict';

/* Filters */

angular.module('oauthServerUI.filters', [])
    .filter('commaSeparated', function () {
        return function (stringArray) {
            if (!stringArray || stringArray.length == 0) {
                return '';
            }
            var list = '';
            for (var i = 0; i < stringArray.length; i++) {
                if (list !== '') {
                    list += ', ';
                }
                list += stringArray[i];
            }
            return list;
        };
    })
    .filter('propertyLined', function () {
        return function (object) {
            if (!object) {
                return '';
            }
            var out = '';
            for (var property in object) {
                out += (property + ' = ' + object[property] + '\n');
            }
            return out;
        }
    });
