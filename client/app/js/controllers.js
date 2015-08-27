var mamboboxControllers = angular.module('mamboboxControllers', []);

mamboboxControllers.controller('SensorsCtrl', ['$scope', 'Sensor',
  function($scope, Sensor) {
    $scope.sensors = Sensor.query();
  }]);