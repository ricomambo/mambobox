var mamboboxServices = angular.module('mamboboxServices', ['ngResource']);

mamboboxServices.factory('Sensor', ['$resource',
  function($resource){
    return $resource('http://localhost:3003/sensors/:id', { id: '@id' }, {});
  }]);