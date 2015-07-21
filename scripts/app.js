/**
 * @ngdoc overview
 * @name App
 * @description
 * Main module of the application.
 */
'use strict';

var app = angular.module('app', [
    'angularLoad',
    'ngSanitize'
]).controller('appController', ['$scope', '$sce', '$sanitize', 'angularLoad',
        function($scope, $sce, $sanitize, angularLoad) {
            angularLoad.loadScript('scripts/data.js').then(function() {
                $scope.profiles = data;
                angular.forEach($scope.profiles, function(prof) {
                    prof.bio = prof.bio.replace(/\n/g, '<p>');
                    prof.bio = $sanitize(prof.bio);
                    prof.bio = $sce.trustAsHtml(prof.bio);
                });
            })
            $scope.selectProfile = function(profile) {
                angular.forEach($scope.profiles, function(prof) {
                    if (prof.id != profile.id) {
                        prof.isSelected = false;
                    }
                });
                profile.isSelected = !profile.isSelected;
                $scope.selectedProfile = profile;
            }
        }
]).directive('profile', function() {
    return {
        restrict: 'EA',
        template: '<div class="imgWrap" ng-show="selectedProfile">' +
                    '<img ng-src="{{selectedProfile.picture}}" alt="image of {{selectedProfile.firstName}} {{selectedProfile.lastName}}"></a>' +
                  '</div>' +
                  '<h2 class="profileHeader">' +
                    '<span class="firstName" ng-bind="selectedProfile.firstName"></span>' +
                    '<span class="lastName" ng-bind="selectedProfile.lastName"></span>' +
                  '</h2>' +
                  '<div class="profileBody" ng-bind-html="selectedProfile.bio">' +
                  '</div>'
    }
});

