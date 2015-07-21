
'use strict';

var app = angular.module('app', [
    'angularLoad'
]).controller('appController', ['$scope', '$sce', 'angularLoad',
        function($scope, $sce, angularLoad) {
            angularLoad.loadScript('scripts/data.js').then(function() {
                $scope.profiles = data;
                $scope.selectProfile(data[0]);
            }).catch(function(e) {
                alert("error " + e);
            });
            $scope.selectProfile = function(profile) {
                $scope.selectedProfile = profile;
                $scope.selectedProfile.bio = $sce.trustAsHtml($scope.selectedProfile.bio.replace(/\n/g, '<p>'));
            }

            $(function(){
               // $scope.selectProfile
            });
        }
    ]);

