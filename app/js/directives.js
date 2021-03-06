'use strict';

/* Directives */

var binder = function (parser, formatter) {
    return function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                ngModel.$parsers.push(parser);
                ngModel.$formatters.push(formatter);
            }
        };
    };
};

angular.module('oauthServerUI.directives', [])
    .directive('commaListStringToArrayBinding', binder(
        function (text) {
            if (!text) {
                return [];
            }
            return text.split(',').map(function (e) {
                return e.trim();
            });
        },
        function (stringArray) {
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
        }
    ))
    .directive('propEqValLinesToObjBinding', binder(
        function (text) {
            if (!text) {
                return {};
            }
            var out = {};
            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var propAndValue = line.split('=');
                out[propAndValue[0]] = propAndValue[1];
            }
            return out;
        },
        function (object) {
            if (!object) {
                return '';
            }
            var out = '';
            for (var property in object) {
                out += (property + ' = ' + object[property] + '\n');
            }
            return out;
        }
    ));
